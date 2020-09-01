import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import config from '../config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getDepartments(): Observable<any> {
    return this.http.get<any[]>(`${config.apiUrl}/departments`);
  }
}
