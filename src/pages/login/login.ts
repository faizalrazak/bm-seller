import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';

import { HomePage } from '../home/home';






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
    public loadingCtrl: LoadingController 

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
              };

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
                  this.navCtrl.setRoot(HomePage,{});
                },
                err => {
                  console.log(err);
                }
              );
          });
      })
      .catch(
        e => 

        console.log("Error logging into Facebook", e)

        
        );

      let data = {
                email: "amirizzuddin27@gmail.com",
                password: "Butuhang27!",
              };

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
                  this.navCtrl.setRoot(HomePage,{});
                },
                err => {
                  console.log(err);
                }


  );
    }


}
