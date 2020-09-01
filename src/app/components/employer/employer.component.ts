import {Component, OnInit} from '@angular/core';
import {EmployerService} from '../../services/employer.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Employer} from '../../interfaces/employer.interface';
import {Department} from '../../interfaces/department.interface';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {
  public employerForm: FormGroup;
  public employer: Employer;
  public departments: Department[];
  private routeId: string;
  public errors: Object = {};

  constructor(private employerService: EmployerService,
              private departmentService: DepartmentService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.routeId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployer();
    this.getDepartments();
    this.createForm();
  }

  getEmployer(): void {
    this.employerService.getEmployer(this.routeId)
      .subscribe(res => {
        this.employer = res.data.employer;
        this.employerForm.patchValue(res.data.employer);
      }, err => {
        this.router.navigate(['/employers']);
      });
  }

  getDepartments() {
    this.departmentService.getDepartments()
      .subscribe(res => {
        this.departments = res.data.departments;
      });
  }

  deleteEmployer(): void {
    this.employerService.deleteEmployer(this.routeId)
      .subscribe(() => {
        this.router.navigate(['/employers']);
      });
  }

  submitForm() {
    this.employerService.updateEmployer(this.routeId, this.employerForm.value)
      .subscribe((res) => {
          this.employer = res.data.employer;
          this.employerForm.patchValue(res.data.employer);
        },
        err => {
          this.errors = err;
        }
      );
  }

  createForm() {
    this.employerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', [Validators.required])
    });
  }
}
