import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule, RecaptchaSettings, RECAPTCHA_SETTINGS, } from 'ng-recaptcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    UserComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RecaptchaModule,
    RecaptchaFormsModule,

    ToastrModule.forRoot()

  ],
  providers: [
    // 6Le3AagUAAAAAHFKF0klE8nnDQeUIX5ESuOfje_A >> dev 
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Le3AagUAAAAAHFKF0klE8nnDQeUIX5ESuOfje_A' } as RecaptchaSettings
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
