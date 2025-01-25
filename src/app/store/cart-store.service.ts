import { computed, effect, Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartStoreService {
  // Private signals for data that should only be modified within the service
  private cart = signal<IProduct[]>([]);

  // constructor() {
  //   effect(() => {
  //     console.log('Cart updated:', this.cart());
  //     // Side effects here
  //   });
  // }

  // Public signals for data that should be accessible from outside the service
  readonly getCartItems = computed(() => this.cart());
  readonly getCartItemCount = computed(() => this.cart().length);

  // IMPORTANT*** for signals use cart() paranthesis to get value its like a function

  // Actions to update state
  addToCart(product: IProduct) {
    const currentCart = this.cart();
    this.cart.set([...currentCart, product]);
  }

  removeFromCart(product: IProduct) {
    const currentCart = this.cart();
    const updatedCart = currentCart.filter((p) => p.id !== product.id);
    this.cart.set(updatedCart);
  }
}
