import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  pure: false,
})
export class FormatPricePipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: number, currencySymbol: string = '₹'): string {
    if (!value) return '';
    return `${currencySymbol} ${value}`;
  }
}
