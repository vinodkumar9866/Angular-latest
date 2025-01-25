import {
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
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
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
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
export class HomeComponent implements OnInit, DoCheck, OnDestroy {
  bannerTitle = 'Welcome to JustXchange';
  bannerSubTitle = 'Buy, sell, and exchange anything on your campus';
  products: IProduct[] = [];
  searchTerm = '';
  filteredProducts: IProduct[] = [];

  @ViewChild('searchField') searchField!: HTMLElement;
  // Executed once after the view (and child views) of the component has been fully initialized
  ngAfterViewInit() {
    console.log(
      'ngAfterViewInit: The view has been initialized.',
      this.searchField
    );
  }

  // Executed after every change detection cycle when the view (and child views) has been checked
  ngAfterViewChecked() {
    console.log(
      'ngAfterViewChecked: The view has been checked.',
      this.searchField
    );
  }

  elapsedTime = 0;
  private timerSubscription: Subscription | null = null;

  ngDoCheck() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.products = [...this.products];
    }
    console.log(
      `ngDoCheck triggered: Current search term is "${this.searchTerm}"`
    );
  }

  ngOnInit() {
    console.log('ngOnInit triggered : For Calling API');
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
    // this.timerSubscription = interval(1000).subscribe(() => {
    //   this.elapsedTime++;
    //   console.log(`Elapsed time: ${this.elapsedTime}`);
    // });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy triggered');
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  constructor(private productService: ProductService) {}
}
