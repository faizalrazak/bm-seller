
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';
import { GooglePlus } from '@ionic-native/google-plus';

import { VerificationCodePage } from '../verification-code/verification-code';
import{ LoginPage } from '../login/login'
import { TermsConditionsPage } from '../terms-conditions/terms-conditions'
import{ PrivacyPolicyPage } from '../privacy-policy/privacy-policy'




/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  fbProfile: any;
  googleProfile:any;
  data:any;
  acct:any;
  user:any;

  personName:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: Facebook,
  	public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController, 
  	private toastCtrl: ToastController,
    public googlePlus: GooglePlus
    ) {

  }


  ionViewDidLoad() {
    console.log("ionViewDidLoad SignUpPage");
  }

   doGoogleSignUp(){

     
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    
    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '918701416859-3kjkp562k3qcjuhssreuk00b4vj3dnip.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then((user) => {
      console.log("user = "+user)
      console.log("password = "+user.userId)

      let data={
        email:user.email,
        name:user.displayName,
        password:user.userId,


      }
      console.log("Name="+user.displayName)
      console.log("Email="+user.email)
      console.log("Password="+user.userId)

      this.httpprovider.registerUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Please check your email to get verfication code',
                     duration: 3000,
                    position: 'bottom'
                  });
                  loading.dismiss();
                  
                  toast.present()
                  this.navCtrl.setRoot(VerificationCodePage,{});
                },
                err => {
                  console.log(err);
                  let toast1 = this.toastCtrl.create({
                    message: err._body,
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  loading.dismiss();
                  toast1.present()
                });

    }, (error) => {
      console.log(error)
      loading.dismiss();

    });
  }

  
      


  facebookSignUp() {
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.fb
      .login(["public_profile", "user_friends", "email"])
      .then((res: FacebookLoginResponse) => {
        this.fb
          .api("me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)",[]).then(
            profile => {
              this.fbProfile = {
                email: profile["email"],
                password: profile["id"],
                name: profile["name"]               
              }


               this.data = {
                email: this.fbProfile.email,
                password: this.fbProfile.password,
                name: this.fbProfile.name,
              };

              this.httpprovider.registerUser(this.data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Please check your email to get verfication code',
                     duration: 3000,
                    position: 'bottom'
                  });
                  loading.dismiss();
                  
                  toast.present()
                  this.navCtrl.setRoot(VerificationCodePage,{});
                },
                err => {
                  let toast1 = this.toastCtrl.create({
                    message: err._body,
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  loading.dismiss();
                  toast1.present()
                }
              );
          });
      })
      .catch(
        e => 

        {
          console.log(e)
          loading.dismiss();

        });
      // let data = {
      //           email: "amirizzuddin27@gmail.com",
      //           password: "123456",
      //           name: "amir",
      //         };

      //         this.httpprovider.registerUser(data).then(
      //           result => {
      //             console.log(result)
      //             let toast = this.toastCtrl.create({
      //               message: 'Please check your email to get verfication code',
      //                duration: 3000,
      //               position: 'bottom'
      //             });
      //             loading.dismiss();
                  
      //             toast.present()
      //             this.navCtrl.setRoot(VerificationCodePage,{});
      //           },
      //           err => {
      //             console.log(err);
      //             let toast1 = this.toastCtrl.create({
      //               message: err._body,
      //                duration: 3000,
      //               position: 'bottom'
      //             });
                  
      //             loading.dismiss();
      //             toast1.present()

      //           }
      //           );

  }

  login(){
    this.navCtrl.push(LoginPage)

  }

  termAndCondition(){
    this.navCtrl.push(TermsConditionsPage)

  }

  privacyPolicy(){
    this.navCtrl.push(PrivacyPolicyPage)

  }

  
}
