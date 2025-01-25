import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  Input,
  OnChanges,
  OnDestroy,
  signal,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../interfaces/product';
import { CartStoreService } from '../../store/cart-store.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [MatButtonModule, MatCardModule, CommonModule],
})
export class CardComponent implements OnChanges, OnDestroy {
  @Input() product: IProduct = {} as IProduct;
  cartItems = computed(() => this.cartState.getCartItems());

  constructor(private cartState: CartStoreService) {}

  addToCart = (product: IProduct) => {
    this.cartState.addToCart(product);
  };
  removeFromCart(product: IProduct) {
    this.cartState.removeFromCart(product);
  }

  isProductInCart(product: IProduct): boolean {
    return this.cartItems().some((item) => item.id === product.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      console.log('ngOnChanges triggered: product items changed');
    }
  }

  ngOnDestroy() {
    console.log('ngOnDestroy triggered');
  }
}
