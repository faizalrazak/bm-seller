import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginSignUpPage } from './login-sign-up';

@NgModule({
  declarations: [
    LoginSignUpPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginSignUpPage),
  ],
})
export class LoginSignUpPageModule {}
