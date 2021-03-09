import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userForm: FormGroup;
  userId: any;
  userData: User;
  initalUserData: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.userId = params['userId'];
        console.log(`user Id: ${this.userId}`);
      }
    )
    this.authService.getUserInfo(this.userId).subscribe(
      (res: any) => {
        if (res.success) {
          this.userData = res.user;
          this.initalUserData = res.user;
          this.userInfoInstance();
        }
      }
    )
  }

  userInfoInstance() {
    console.log("entered into the name instance...");
    console.log(`data: ${JSON.stringify(this.userData)}`)
    console.log(`firstname: ${this.userData['firstName']}, lastname: ${this.userData['lastName']}`);
    this.userForm = this.formBuilder.group({
      firstName: [this.userData['firstName'], Validators.required],
      lastName: [this.userData['lastName'], Validators.required],
    });
  }

  updateUserInfo() {
    console.log(`entered into update user info`);
    this.authService.updateUserInfo(this.userForm.value, this.userId).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastrService.success(res.message, 'User name updation');
        }
        else {
          this.toastrService.error(res.message, 'User name updation');
        }
      }
    )
  }

  onUserInfoReset() {
    console.log("entered into the name reset....")
    this.userForm.get("firstName").setValue(this.initalUserData['firstName']);
    this.userForm.get("lastName").setValue(this.initalUserData['lastName']);
  }

  // goes to previous page
  goBack() {
    this.location.back();
  }
}
