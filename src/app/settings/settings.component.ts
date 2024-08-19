import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [PanelModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
