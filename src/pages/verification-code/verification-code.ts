import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { LoginSignUpPage } from '../login-sign-up/login-sign-up';
import { HttpProvider } from '../../providers/http/http';



/**
 * Generated class for the VerificationCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification-code',
  templateUrl: 'verification-code.html',
})
export class VerificationCodePage {

	code:any;
  userEmail:any;


  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadingCtrl: LoadingController,
  	public httpprovider:HttpProvider,
  	public toastCtrl:ToastController) {
    this.userEmail=window.localStorage.getItem("email")
    console.log(this.userEmail)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
  }

  verificationDone(){
	
let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Please Wait...'
  });

  loading.present();
  console.log(this.code)

    this.httpprovider.sendCode(this.code).then(
     (response) => {
     	let toast1 = this.toastCtrl.create({
                    message: 'User verified',
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  loading.dismiss();
                  toast1.present()
       this.navCtrl.setRoot(LoginSignUpPage);
     },
     err => {
       let toast1 = this.toastCtrl.create({
                    message: err._body,
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  loading.dismiss();
                  toast1.present()
     },
   );
  

}

}


