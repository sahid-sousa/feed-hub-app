import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  getComments(feedbackId: string | undefined, page = 0, size = 10, filters?: any) : Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if(filters) {
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
    return this.http.get(`${this.apiUrl}/comment/list/${feedbackId}`, {params, headers})
  }

  create(feedbackId: String, content: string) : Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    const newComment = {
      feedbackId,
      content
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });
    return this.http.post(`${this.apiUrl}/comment/create`, newComment, { headers })
  }
}
