
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';
import { GooglePlus } from '@ionic-native/google-plus';




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


 
	userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook,
  	public httpprovider: HttpProvider, public loadingCtrl: LoadingController, 
  	private toastCtrl: ToastController, public googlePlus: GooglePlus) {

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
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': 'AIzaSyBJbbiT7oGzwRMRmziofdTCj4o9S3Xj7HY', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then((user) => {
      console.log(user)
      
    }, (error) => {
      loading.dismiss();
    });
  }
      


  facebookLogin() {
    this.fb
      .login(["public_profile", "user_friends", "email"])
      .then((res: FacebookLoginResponse) => {
        this.fb
          .api("me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)",[]).then(
            profile => {
              this.fbProfile = {
                email: profile["email"],
                password: profile["id"],
                first_name: profile["first_name"],
                picture: profile["picture"]["data"]["url"],
                name: profile["name"]
                
              }

              let data = {
                email: this.fbProfile.email,
                password: this.fbProfile.password,
                name: this.fbProfile.name,
                category: "2",
                phone_number: "0197397343"
              };

              this.httpprovider.registerFbUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Successfully Register with Facebook',
                     duration: 3000,
                    position: 'bottom'
                  });
    
                  toast.present()
                },
                err => {
                  console.log(err);
                }
              );
          });
      })
      .catch(e => console.log("Error logging into Facebook", e));
  }

  
}
