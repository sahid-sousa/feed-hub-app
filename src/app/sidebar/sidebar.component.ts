import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../services/user.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  protected authUser: User | undefined;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getAuthUser();
  }
  getAuthUser(): void {
    this.authUser = this.authService.getAuthUser()
  }


}
