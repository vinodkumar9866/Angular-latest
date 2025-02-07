import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
class MockProductService {
  getProducts = jasmine
    .createSpy('getProducts')
    .and.returnValue(of(mockProducts));
  private productsUpdated = new BehaviorSubject<boolean>(false);

  onProductsUpdated(): Observable<boolean> {
    return this.productsUpdated.asObservable();
  }
  triggerProductsUpdated() {
    this.productsUpdated.next(true);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: MockProductService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) }, // Mocked ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(
      ProductService
    ) as unknown as MockProductService;
  });

  it('should create Home component', () => {
    expect(component).toBeTruthy();
  });

  it('should get loadProducts from api on init', () => {
    spyOn(component, 'loadProducts');
    component.ngOnInit();
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should call loadProducts when onProductsUpdated emits', () => {
    spyOn(component, 'loadProducts'); // Spy on loadProducts
    productService.triggerProductsUpdated();
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should filter products when searchTerm changes', () => {
    component.products = mockProducts;

    component.searchTerm = 'book';
    component.ngDoCheck(); // Trigger change detection

    expect(component.filteredProducts).toEqual([
      jasmine.objectContaining(mockProducts[0]),
    ]);
  });

  it('should display products when filteredProducts is not empty', () => {
    component.products = mockProducts;

    fixture.detectChanges(); // Detect changes

    const cardElements = fixture.nativeElement.querySelectorAll('app-card');
    expect(cardElements.length).toBeGreaterThan(0); // Ensure products are displayed
  });
});
