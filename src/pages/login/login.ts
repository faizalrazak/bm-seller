import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';
import { GooglePlus } from '@ionic-native/google-plus';


import { MyRestaurantPage } from '../my-restaurant/my-restaurant';
import { SignUpPage } from '../sign-up/sign-up';
import{ ForgotPage } from '../forgot/forgot'





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  fbProfile: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
  	private fb: Facebook,
  	public toastCtrl:ToastController,
    public httpprovider: HttpProvider,
    public loadingCtrl: LoadingController,
    public googlePlus: GooglePlus

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doGoogleLogin(){

     
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
        password:user.userId,
      }

      console.log("Name="+user.displayName)
      console.log("Email="+user.email)
      console.log("Password="+user.userId)

      this.httpprovider.loginUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Successfully login',
                     duration: 3000,
                    position: 'bottom'
                  });
                  loading.dismiss();
                  
                  toast.present()
                  this.navCtrl.setRoot(MyRestaurantPage,{});
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

facebookLogin() {
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
                password: profile["id"]   
              }

              let data = {
                email: this.fbProfile.email,
                password: this.fbProfile.password,
              }

              this.httpprovider.loginUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Successfully login',
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  
                  toast.present()
                  this.navCtrl.setRoot(MyRestaurantPage,{});
                  loading.dismiss();
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
                }
              );
          });
      })
      .catch(
        e => 

        {
          console.log(e)
          // loading.dismiss();

        });

      let data = {
                email: "fizo@gmail.com",
                password: "123456",
              };


      this.httpprovider.loginUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Successfully login',
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  
                  toast.present()
                  loading.dismiss();
                  this.navCtrl.setRoot(MyRestaurantPage,{});
                },
                err => {
                  console.log(err);
                }


  );
    }

    signUpNow(){
      this.navCtrl.push(SignUpPage)
    }

    forgotPass(){
      this.navCtrl.push(ForgotPage)
    }

}
