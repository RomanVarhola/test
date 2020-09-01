import {Component, OnInit} from '@angular/core';
import {EmployerService} from '../../services/employer.service';
import {Employer} from '../../interfaces/employer.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})

export class EmployersComponent implements OnInit {
  public searchForm: FormGroup;
  public employers: Employer[] = [];
  public total: number;
  public limit: number;
  public page: number;

  constructor(private employerService: EmployerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.getEmployers();
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      search: new FormControl('', [Validators.required])
    });
  }

  getEmployers(): void {
    this.employerService.getEmployers()
      .subscribe((res: any) => {
        this.getData(res.data);
      });
  }

  searchEmployers(): void {
    this.employerService.searchEmployers(this.searchForm.value.search)
      .subscribe((res: any) => {
        this.getData(res.data);
      });
  }

  getEmployersByPage(page): void {
    this.employerService.getEmployersByPage(page)
      .subscribe((res: any) => {
        this.getData(res.data);
      });
  }

  getData(res): void {
    this.employers = res.employers;
    this.total = res.total;
    this.limit = res.limit;
    this.page = res.page;
  }
}
