import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private cookieService: CookieService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    this.authService.signUp(this.signUpForm.value)
      .subscribe(res => {
        this.cookieService.set('currentUser', JSON.stringify({token: res.data.token, user: res.data.user}));
        this.router.navigate(['/']);
      }, err => {
        this.error = err.error.errors;
      });
  }

}
