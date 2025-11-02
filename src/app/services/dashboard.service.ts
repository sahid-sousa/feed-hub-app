import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {StorageService} from './storage.service';
import {User} from './user.model';
import {Observable} from 'rxjs';
import {Mes} from './dashboard.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  getStatistics(): Observable<any> {
    const user: User = JSON.parse(<string>this.storage.getAuthUser());
    const month = (new Date().getMonth() + 1);

    let startMonth = (month - 1);
    if (startMonth == 0) {
      startMonth = 1
    } else {
      startMonth = month - 2
    }

    let endMonth = (month + 1);
    if (endMonth == 13) {
      endMonth = 3
    } else {
      endMonth = month + 1
    }

    let params = new HttpParams()
      .set('startMonth', startMonth)
      .set('endMonth', endMonth);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });
    return this.http.get<any>(`${this.apiUrl}/dashboard/statistics`, {params, headers});
  }

  getMonthByNumber(monthNumber: number): string {
    return Mes[monthNumber] ?? "Invalid Month";
  }


}
