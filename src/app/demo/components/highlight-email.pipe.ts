import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightEmail',
  standalone: true
})
export class HighlightEmailPipe implements PipeTransform {

  transform(text: string): string {
    // Remplacez l'adresse e-mail par la version mise en forme
    return text.replace(/(hosni@gmail\.com)/g, '<strong><u>$1</u></strong>');
  }

}
