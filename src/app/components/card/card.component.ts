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
import { FormatPricePipe } from '../../pipes/format-price.pipe';
import { HilighterDirective } from '../../directives/hilighter.directive';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormatPricePipe,
    HilighterDirective,
    RouterModule,
    MatTooltipModule,
  ],
})
export class CardComponent {
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
}
