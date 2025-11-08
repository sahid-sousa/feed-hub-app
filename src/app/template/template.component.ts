import {Component} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-template',
  imports: [
    NavbarComponent,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './template.component.html',
  standalone: true,
  styleUrl: './template.component.scss'
})
export class TemplateComponent {
  isSidebarOpen: boolean = true;

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
