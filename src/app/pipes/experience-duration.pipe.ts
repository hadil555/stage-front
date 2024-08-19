import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceDuration',
  standalone: true,
})
export class ExperienceDurationPipe implements PipeTransform {transform(startDate: string): string {
  const now = new Date();
  const startDateObj = new Date(startDate);

  const diffInMilliseconds = now.getTime() - startDateObj.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30.44); // Average number of days in a month
  const diffInYears = Math.floor(diffInMonths / 12);

  const remainingMonths = diffInMonths % 12;

  if (diffInYears > 0 && remainingMonths > 0) {
    return `${diffInYears} ${diffInYears > 1 ? 'Years' : 'Year'} et ${remainingMonths} ${remainingMonths > 1 ? 'Month' : 'Months'}`;
  } else if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears > 1 ? 'Years' : 'Year'}`;
  } else if (remainingMonths > 0) {
    return `${remainingMonths} ${remainingMonths >= 1 ? 'Month' : 'Months'}`;
  } else {
    return 'Less than a month';
  }
}}