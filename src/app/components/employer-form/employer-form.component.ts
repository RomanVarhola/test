import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployerService} from '../../services/employer.service';
import {Department} from '../../interfaces/department.interface';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.css']
})
export class EmployerFormComponent implements OnInit {
  public newEmployer: FormGroup;
  public departments: Department[];

  constructor(private employerService: EmployerService,
              private departmentService: DepartmentService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getDepartments();
    this.createForm();
  }

  getDepartments() {
    this.departmentService.getDepartments()
      .subscribe(res => {
        this.departments = res.data.departments;
      });
  }

  createForm() {
    this.newEmployer = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      active: new FormControl(false, [Validators.required]),
      departmentId: new FormControl('', [Validators.required])
    });
  }

  createEmployer(): void {
    this.employerService.createEmployer(this.newEmployer.value)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }
}
