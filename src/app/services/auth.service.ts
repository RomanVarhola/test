import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import config from '../config/index';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() getCurrentUser: EventEmitter<any> = new EventEmitter();
  private canAccess = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
  }

  login(data: {}): Observable<any> {
    return this.http.post(`${config.apiUrl}/login`, data).pipe(
      tap(res => {
        this.canAccess.next(res.data.user);
        return res;
      }));
  }

  signUp(data: {}): Observable<any> {
    return this.http.post(`${config.apiUrl}/register`, data).pipe(
      tap(res => {
        this.canAccess.next(res.data.user);
        return res;
      }));
  }

  get access() {
    return this.canAccess.asObservable();
  }

  checkAccess(): Observable<any> {
    return this.http.get(`${config.apiUrl}/check_access`).pipe(
      tap(res => res));
  }

  logout(): void {
    this.canAccess.next(false);
    this.cookieService.delete('currentUser');
    this.router.navigate(['/login']);
  }
}
