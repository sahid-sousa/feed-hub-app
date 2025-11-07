import { Component, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true
})
export class NavbarComponent {

  @Output() sidebarToggle = new EventEmitter();
  toggleSidebar: boolean = false;

  constructor(
    private authService: AuthService,
    private _router: Router
  ) {
  }

  onButtonClick(): void {
    this.toggleSidebar = !this.toggleSidebar;
    this.sidebarToggle.emit(this.toggleSidebar);
  }

  checkLogin() {
    return true;
  }

  onLogin() {

  }

  onLogout() {
    this.authService.removeAuthUser();
    this._router.navigate(['/login']).then();
  }
}
