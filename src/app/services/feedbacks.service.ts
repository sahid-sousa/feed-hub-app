import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
  private apiUrl = 'http://localhost:8085';

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ){ }

  getFeedbacks(page = 0, size: number, filters?: any) : Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });
    return this.http.get<any>(`${this.apiUrl}/feedback/list`, {params, headers})
  }

  create(title: string, description: string, category: string) : Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    const currentDate = new Date();
    const newFeedback = {
      title,
      description,
      category,
      dateCreated: currentDate,
      lastUpdated: currentDate
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });
    return this.http.post<any>(`${this.apiUrl}/feedback/create`, newFeedback, { headers })
  }

  show(id: string) : Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });
    return this.http.get(`${this.apiUrl}/feedback/find/${id}`, { headers })
  }

  edit(title: string, description: string, category: string) : Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    const currentDate = new Date();
    const updateFeedback = {
      title,
      description,
      category,
      dateCreated: currentDate,
      lastUpdated: currentDate
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });
    return this.http.put<any>(`${this.apiUrl}/feedback/update`, updateFeedback, { headers })
  }

}
