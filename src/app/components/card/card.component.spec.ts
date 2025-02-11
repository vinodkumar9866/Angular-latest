import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { IProduct } from '../../interfaces/product';
import { CartStoreService } from '../../store/cart-store.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideRouter } from '@angular/router';
import { HilighterDirective } from '../../directives/hilighter.directive';
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { of } from 'rxjs';
import { signal } from '@angular/core';

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

class MockCartStoreService {
  getCartItems = jasmine
    .createSpy('getCartItems')
    .and.returnValue(of(mockProducts));
  addToCart = jasmine.createSpy('addToCart');
  removeFromCart = jasmine.createSpy('removeFromCart');
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let cartStoreService: MockCartStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatTooltipModule,
        FormatPricePipe,
        HilighterDirective,
        CardComponent,
      ],
      providers: [
        { provide: CartStoreService, useClass: MockCartStoreService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    cartStoreService = TestBed.inject(
      CartStoreService
    ) as unknown as MockCartStoreService;
    component.product = mockProducts[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive product input', () => {
    expect(component.product).toEqual(mockProducts[0]);
  });

  it('should call addToCart when clicking add to cart button', () => {
    component.addToCart(mockProducts[0]);
    expect(cartStoreService.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should call removeFromCart when clicking remove button', () => {
    component.removeFromCart(mockProducts[0]);
    expect(cartStoreService.removeFromCart).toHaveBeenCalledWith(
      mockProducts[0]
    );
  });

  it('should return true if product is in cart', () => {
    component.cartItems = signal(mockProducts); // Assigning directly to signal
    fixture.detectChanges();
    expect(component.isProductInCart(mockProducts[0])).toBeTrue();
  });
});
