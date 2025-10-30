import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authService.isAuthenticated();
    const isTokenExpired = this.authService.isTokenExpired();
    if (isAuthenticated) {
      if (isTokenExpired) {
        return this.router.navigate(['/']);
      } else {
        return true;
      }
    }
    const returnUrl = state.url && state.url !== '/' ? state.url : '/pages';
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: returnUrl }
    });
  }

}
