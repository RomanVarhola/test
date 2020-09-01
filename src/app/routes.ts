import {EmployersComponent} from './components/employers/employers.component';
import {EmployerComponent} from './components/employer/employer.component';
import {EmployerFormComponent} from './components/employer-form/employer-form.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {AuthGuard} from './guards/auth.guard';

export const routes = [
  {
    path: '',
    redirectTo: '/employers',
    pathMatch: 'full'
  },
  {
    path: 'employers',
    component: EmployersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employer/create',
    component: EmployerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employer/:id',
    component: EmployerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LogInComponent
  }
  ,
  {
    path: 'signup',
    component: SignUpComponent
  },
];
