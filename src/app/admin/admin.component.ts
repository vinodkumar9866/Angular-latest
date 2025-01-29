import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/product';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { DateOnlyPipe } from '../pipes/date-format.pipe';
import { FormatPricePipe } from '../pipes/format-price.pipe';
import { normalizeImages } from '../utils/imageUtil';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    DateOnlyPipe,
    FormatPricePipe,
    MatTooltipModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  displayedColumns = ['title', 'description', 'price', 'creationAt', 'Actions'];

  dataSource = new MatTableDataSource<IProduct>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productsService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // Listen for updates and refresh products
    this.productsService.onProductsUpdated().subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe((products) => {
      const productsFormatted = products.map((product) => ({
        ...product,
        images: normalizeImages(product.images),
      }));
      this.dataSource = new MatTableDataSource(productsFormatted.reverse());
      console.log(this.dataSource, this.sort);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  openAddProductDialog(product?: IProduct) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data: {
        product,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Product was added successfully!');
        // Refresh product list or perform other actions
      }
    });
  }

  editProduct(product: IProduct): void {
    // Add edit logic here
    console.log('Editing product:', product);
    this.openAddProductDialog(product);
  }

  deleteProduct(productId: number): void {
    // Add delete logic here
    console.log('Deleting product with ID:', productId);
    this.productsService
      .deleteProduct(productId)
      .subscribe((res) => console.log(res));
  }
}
