import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiService {

  constructor(private http: HttpClient) { }

  // invoke the Azure Function to get the embed token
  getReportEmbedToken(groupId: string, reportId: string): Observable<any> {
    return this.http.get('http://localhost:4200/api/token?groupId=' + groupId + '&reportId=' + reportId);
  }

}
