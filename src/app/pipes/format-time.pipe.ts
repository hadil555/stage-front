import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true,
})
export class FormatTimePipe implements PipeTransform {

  transform(minutes: number): string {
    if (minutes == null) {
      return '00:00';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = this.padNumber(hours);
    const formattedMinutes = this.padNumber(remainingMinutes);

    return `${formattedHours}:${formattedMinutes}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

}
