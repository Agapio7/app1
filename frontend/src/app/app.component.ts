import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from './component/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,FooterComponent],
  template: `
    <app-header/>
    <router-outlet />
    <app-footer/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'CrowdFunding';
}
