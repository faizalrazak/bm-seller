
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';
import { GooglePlus } from '@ionic-native/google-plus';

import { VerificationPage } from '../verification/verification';





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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fb: Facebook,
  	public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController, 
  	private toastCtrl: ToastController, 
    public googlePlus: GooglePlus) {

  }


  ionViewDidLoad() {
    console.log("ionViewDidLoad SignUpPage");
  }

   doGoogleLogin(){

     
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    
    this.googlePlus.login({
      'scopes': ['email'], // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '187108437462-rubhqgntbvp8mhrns3973vh1646k6aqj.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then((user) => {
      console.log(user)
      
    }, (error) => {
      loading.dismiss();
      console.log('error sign up with google')
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


              let data = {
                email: this.fbProfile.email,
                password: this.fbProfile.password,
                name: this.fbProfile.name,
                category: "2",
                phone_number: "0197397343"
              };

              this.httpprovider.registerUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Please fill in your phone number to complete the registration',
                     duration: 3000,
                    position: 'bottom'
                  });
                  loading.dismiss();
                  
                  toast.present()
                  this.navCtrl.push(VerificationPage,{});
                },
                err => {
                  console.log(err);
                }
              );
          });
      })
      .catch(
        e => {
          console.log("Error logging into Facebook", e)

          let toast = this.toastCtrl.create({
                    message: 'Error sign up with facebook',
                     duration: 3000,
                    position: 'bottom'
                  });
          toast.present()


        }

        

        
        );
  }

  
}
