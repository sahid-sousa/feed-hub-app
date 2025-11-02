import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  register(
    name: string,  username: string,
    password: string, email: string
  ): Observable<any> {
    const newUser = {name,  username, password,  email }
    return this.http.post<any>(`${this.apiUrl}/user/create`, newUser)
  }

}
