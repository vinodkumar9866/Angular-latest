import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IProduct } from '../interfaces/product';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatMenuTrigger } from '@angular/material/menu';

// Mock Data
const mockProducts: IProduct[] = [
  {
    id: 1,
    title: 'book',
    description: 'Desc 1',
    price: 100,
    images: [],
    creationAt: '2023-01-01',
    updatedAt: '2023-01-01',
    category: {
      id: 1,
      name: 'Category 1',
      image: '',
      creationAt: '',
      updatedAt: '',
    },
  },
  {
    id: 2,
    title: 'pen',
    description: 'Desc 1',
    price: 100,
    images: [],
    creationAt: '2023-01-01',
    updatedAt: '2023-01-01',
    category: {
      id: 1,
      name: 'Category 1',
      image: '',
      creationAt: '',
      updatedAt: '',
    },
  },
];

// Mock Services
class MockProductService {
  getProducts = jasmine
    .createSpy('getProducts')
    .and.returnValue(of(mockProducts));
  onProductsUpdated = jasmine
    .createSpy('onProductsUpdated')
    .and.returnValue(of(true));
  deleteProduct = jasmine.createSpy('deleteProduct').and.returnValue(of(true));
}

class MockMatDialog {
  open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true),
  });
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let productService: MockProductService;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule,
        AdminComponent,
        AddProductComponent,
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: MatDialog, useClass: MockMatDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductService
    ) as unknown as MockProductService;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create the AdminComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on init', () => {
    spyOn(component, 'loadProducts');
    component.ngOnInit();
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should load products and update dataSource', () => {
    component.loadProducts();
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should open AddProductComponent dialog', () => {
    component.openAddProductDialog();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open dialog when editing product', () => {
    const mockProduct = mockProducts[0];
    component.editProduct(mockProduct);
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, {
      width: '500px',
      disableClose: true,
      autoFocus: true,
      data: {
        product: mockProduct,
      },
    });
  });

  it('should delete a product', () => {
    const mockMenuTrigger = jasmine.createSpyObj('MatMenuTrigger', [
      'closeMenu',
    ]);
    const mockEvent = new Event('click');
    component.deleteProduct(1, mockMenuTrigger, mockEvent);
    expect(productService.deleteProduct).toHaveBeenCalledWith(1);
  });
});
