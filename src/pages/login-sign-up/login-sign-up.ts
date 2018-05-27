import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';


/**
 * Generated class for the LoginSignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-sign-up',
  templateUrl: 'login-sign-up.html',
})
export class LoginSignUpPage {

  fbProfile:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginSignUpPage');
  }

  loginPage(){
  	this.navCtrl.push(LoginPage);
  }

  signUpPage(){
    this.navCtrl.push(SignUpPage);

  }

  
}
