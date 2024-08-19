import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormatWithoutSecond',
  standalone: true,
})
export class TimeFormatWithoutSecondPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Supprimer les deux derniers zéros et les deux points
    return value.slice(0, -3);
  }

}
