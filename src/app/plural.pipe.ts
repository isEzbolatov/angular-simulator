import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | string, plural: string, twoFour: string, one: string): string {
    const num = Number(value);
    if (isNaN(num)) {
      return plural;
    }

    const lastDigit = num % 10;
    const lastTwoDigit = num % 100;

    if (lastTwoDigit >= 11 && lastTwoDigit <= 14) {
      return plural;
    } else if (lastDigit === 1) {
      return one;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return twoFour;
    } else {
      return plural;
    }
  }
}
