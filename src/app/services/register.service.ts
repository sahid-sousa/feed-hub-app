import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl: string = "http://localhost:8085";

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
