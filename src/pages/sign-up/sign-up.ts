
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

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
    public nativeStorage: NativeStorage, 
    public googlePlus: GooglePlus) {

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
                });


  //     this.nativeStorage.setItem('user', {
  //       name: user.displayName,
  //       email: user.email,
  //       picture: user.imageUrl,
  //       password:user.user_id,
  //       category: "2",
  //       phone_number: "0197397343"
  //     })

  //     this.nativeStorage.getItem('user')
  // .then(
  //   data => {this.httpprovider.registerUser(data).then(
  //               result => {
  //                 console.log(result)
  //                 let toast = this.toastCtrl.create({
  //                   message: 'Please fill in your phone number to complete the registration',
  //                    duration: 3000,
  //                   position: 'bottom'
  //                 });
  //                 loading.dismiss();
                  
  //                 toast.present()
  //                 this.navCtrl.push(VerificationPage,{});
  //               },
  //               err => {
  //                 console.log(err);
  //               }
  //             );},
  //   error => console.error(error)



  // );

  





      // .then((res) => {
      //   this.navCtrl.push(VerificationPage,{});
      // }, (error) => {
      //   console.log(error);
      // })
    }, (error) => {
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
                // email: "amir@gmail.com",
                // password: "123456",
                // name: "amir",
                category: "2",
                phone_number: "0197397343"
              };

              this.httpprovider.registerUser(this.data).then(
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
      let data = {
                email: "amir@gmail.com",
                password: "123456",
                name: "amir",
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
  }

  
}
