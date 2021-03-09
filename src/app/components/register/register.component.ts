import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      countryCode: ['', [Validators.required, Validators.pattern('^[0-9]{0,3}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{5,10}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      recaptchaReactive: [null, [Validators.required]]
    })
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  onRegisterSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(`res: ${JSON.stringify(res)}`)
        if (res.success) {
          this.toastrService.success(res.message, 'Admin Registration');
          this.router.navigate(['login'])
        }
      },
      (error: HttpErrorResponse) => {
        this.toastrService.error(error.error.message, 'Admin Registration')
      }
    )
  }



}
