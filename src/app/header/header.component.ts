import {
  Component,
  ContentChild,
  effect,
  ElementRef,
  OnInit,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartStoreService } from '../store/cart-store.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'JustXchange';
  searchTerm = '';
  searchEnable = false;
  cartItemsCount = signal(0);
  constructor(private cartState: CartStoreService) {
    effect(() => {
      this.cartItemsCount.set(this.cartState.getCartItemCount());
    });
  }

  @ContentChild('projected') projectedContent!: ElementRef;
  // Triggered once after ng-content or viewChild content is initialized
  ngAfterContentInit() {
    console.log(
      'ngAfterContentInit: The content has been initialized.',
      this.projectedContent?.nativeElement?.innerHTML
    );
  }

  // Triggered every time the content or its children change
  ngAfterContentChecked() {
    console.log(
      'ngAfterContentChecked: The content has been checked.',
      this.projectedContent?.nativeElement?.innerHTML
    );
  }

  onSearch = () => {
    this.searchEnable = true;
  };
}
