import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import config from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  constructor(private http: HttpClient) {
  }

  getEmployers(): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/employers`);
  }

  searchEmployers(search): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/employers?search=${search}`);
  }

  getEmployersByPage(page): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/employers?page=${page}`);
  }

  getEmployer(id: string): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/employers/${id}`);
  }

  createEmployer(employer: {}): Observable<any> {
    return this.http.post(`${config.apiUrl}/employers/`, employer);
  }

  updateEmployer(id: any, employer: any): Observable<any> {
    return this.http.put(`${config.apiUrl}/employers/${id}`, employer);
  }

  deleteEmployer(id: string): Observable<any> {
    return this.http.delete(`${config.apiUrl}/employers/${id}`);
  }
}
