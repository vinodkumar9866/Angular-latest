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
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Shopping';
  searchTerm = '';
  searchEnable = false;
  cartItemsCount = signal(0);
  isAuthenticated = false;
  constructor(
    private cartState: CartStoreService,
    private authService: AuthService
  ) {
    effect(() => {
      this.cartItemsCount.set(this.cartState.getCartItemCount());
    });
    this.authService
      .isAuthenticated()
      .subscribe((val) => (this.isAuthenticated = val));
  }

  logout() {
    console.log('logging out');
    this.authService.logout();
  }

  // onSearch = () => {
  //   this.searchEnable = true;
  // };
}
