import { Component, DoCheck, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from '../components/card/card.component';
import { IProduct } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { normalizeImages } from '../utils/imageUtil';
@Component({
  selector: 'app-home',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    CardComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, DoCheck {
  bannerTitle = 'Welcome to Online Shopping';
  bannerSubTitle = 'Buy, sell, and exchange anything';
  products: IProduct[] = [];
  searchTerm = '';
  filteredProducts: IProduct[] = [];
  prevSearch = '';
  ngDoCheck() {
    if (this.searchTerm !== this.prevSearch) {
      this.prevSearch = this.searchTerm;
      this.filteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  ngOnInit() {
    this.loadProducts();

    // Listen for updates and refresh products
    this.productService.onProductsUpdated().subscribe(() => {
      this.loadProducts();
    });
  }

  public loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.map((product) => ({
        ...product,
        images: normalizeImages(product.images),
      }));

      this.filteredProducts = this.products;
    });
  }

  constructor(private productService: ProductService) {}
}
