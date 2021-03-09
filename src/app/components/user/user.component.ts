import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageForm: FormGroup;
  createUserForm: FormGroup;

  users = [];
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();

    // save users form
    this.pageForm = this.formBuilder.group({
      pageNumber: ['', [Validators.required, Validators.maxLength(1)]]
    })

    // student registration form
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  getUsers() {
    this.authService.getUsers().subscribe(
      (res: any) => {
        if (res.success) {
          console.log(`res: ${JSON.stringify(res.users)}`)
          this.users = res.users;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`get users error: ${error}`)
      }
    )
  }

  saveUsers() {
    this.authService.saveUsers(this.pageForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastrService.success(res.message, 'Saving Users');
        }
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message, 'Saving Users');
      }
    )
  }

  createUser() {
    this.authService.createUser(this.createUserForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastrService.success(res.message, 'User Creation');
          this.createUserForm.reset();
          this.getUsers();
        }
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message, 'User Creation');
      }
    )
  }
}
