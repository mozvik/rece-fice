import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixToDate',
})
export class UnixToDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const num = parseInt(value);
    if (isNaN(num)) {
      return 'NaN';
    }

    if (num === 0) {
      return '';
    }
    const dt = new Date(num * 1e3).toISOString();
    return dt.substring(0, 10) + ' ' + dt.substring(11, 19) + ' GMT -ig';
  }
}
