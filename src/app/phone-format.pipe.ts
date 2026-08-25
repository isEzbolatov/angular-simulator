import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(rawNumber: string, mode: 'compact' | 'international' | 'national' | 'masked' = 'international'): string {
    let cleaned = rawNumber.replace(/[^0-9+]/g, '');

    if (cleaned.includes('+') && !cleaned.startsWith('+')) {
      cleaned = cleaned.replace(/\+/g, '');
    }

    const hasPlus = cleaned.startsWith('+');
    let digits = cleaned.replace(/\+/g, '');

    if (mode === 'compact') {
      return hasPlus ? '+' + digits : digits;
    }

    if (digits.length < 12) {
      return cleaned;
    }

    const countryCode = digits.slice(0, 2);
    const rest = digits.slice(2);

    const groups = [
      rest.slice(0, 3),
      rest.slice(3, 6),
      rest.slice(6, 8),
      rest.slice(8, 10)
    ];

    switch (mode) {
      case 'international':
        return `+${countryCode} ${groups[0]} ${groups[1]} ${groups[2]} ${groups[3]}`;

      case 'national':
        return `${groups[0]} ${groups[1]} ${groups[2]} ${groups[3]}`;

      case 'masked':
        const maskedGroups = [
          groups[0],
          '***',
          '**',
          groups[3]
        ];
        return `+${countryCode} ${maskedGroups.join(' ')}`

      default:
        return cleaned;
    }
  }
}
