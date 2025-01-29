import {
  Component,
  ContentChild,
  effect,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartStoreService } from '../store/cart-store.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Shopping';
  searchTerm = '';
  searchEnable = false;
  cartItemsCount = signal(0);
  constructor(private cartState: CartStoreService) {
    effect(() => {
      this.cartItemsCount.set(this.cartState.getCartItemCount());
    });
  }

  onSearch = () => {
    this.searchEnable = true;
  };
}
