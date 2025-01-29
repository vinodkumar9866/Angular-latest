import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOnly',
})
export class DateOnlyPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    // Format the date to YYYY-MM-DD (or customize as needed)
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDate;
  }
}
