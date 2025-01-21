import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  // title = 'Welcome to JustXchange';
  // title = signal('Welcome to JustXchange');
  // subTitle = input.required();
  @Input({ required: true }) title!: string;
  @Input() subTitle!: string;
  @Output() btnClick = new EventEmitter<string>();

  onBannerClick = () => {
    this.btnClick.emit('Banner clicked');
  };
}
