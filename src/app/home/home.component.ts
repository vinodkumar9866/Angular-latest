import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  bannerTitle = 'Welcome to JustXchange';
  bannerSubTitle = 'Buy, sell, and exchange anything on your campus';
  subText = 'Buy, sell, and exchange anything on your campus';
  bannerText = '';
  enableEdit = true;
  handleBannerClick(event: string) {
    console.log(event);
    this.bannerText = event;
  }

  updateBannerSubTitle(event: Event): void {
    const bannerValue = event.target as HTMLInputElement;
    console.log(bannerValue.value);
    this.subText = bannerValue.value;
  }

  handleSubmit() {
    this.bannerSubTitle = this.subText;
    this.enableEdit = false;
  }
}
