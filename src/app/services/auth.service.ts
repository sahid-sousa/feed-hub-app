import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserCredentials} from './user.credentials.model';
import {StorageService} from './storage.service';
import {User} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8085';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  login(username: string, password: string) : Observable<any> {
    const credentials = new UserCredentials(username, password);
    return this.http.post<any>(`${this.apiUrl}/auth`, credentials)
  }

  saveAuthUser(authUser: string): void {
    this.storage.saveAuthUser(authUser);
  }

  getAuthUser(): User {
    return JSON.parse(<string>this.storage.getAuthUser());
  }

  removeAuthUser(): void {
    this.storage.removeAuthUser();
  }

  isAuthenticated(): boolean {
    return !!this.getAuthUser()
  }

  isTokenExpired(): boolean {
    const user: User | null = this.getAuthUser();
    if (!user || !user.expiration) return true;
    const expirationTime = new Date(user.expiration).getTime();
    const currentTime = new Date().getTime();
    return expirationTime <= currentTime;
  }


}
