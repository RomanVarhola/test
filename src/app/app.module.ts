import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MzNavbarModule,
  MzCardModule,
  MzInputModule,
  MzButtonModule,
  MzTextareaModule,
  MzPaginationModule, MaterializeModule
} from 'ngx-materialize';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import {routes} from './routes';
import {AppComponent} from './app.component';
import {EmployersComponent} from './components/employers/employers.component';
import {EmployerComponent} from './components/employer/employer.component';
import {EmployerFormComponent} from './components/employer-form/employer-form.component';
import {HeaderComponent} from './components/header/header.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {AuthGuard} from './guards/auth.guard';
import {MatCheckboxModule, MatInputModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EmployersComponent,
    EmployerComponent,
    EmployerFormComponent,
    HeaderComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MzNavbarModule,
    MzCardModule,
    MzInputModule,
    MzTextareaModule,
    MzButtonModule,
    MzPaginationModule,
    MaterializeModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    AuthGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
