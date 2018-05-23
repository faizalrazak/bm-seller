import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';



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
	userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private fb: Facebook,
  	public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

facebookLogin(){
   this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
  	this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', [])
  	.then(profile =>{
  		this.userProfile={
  						  	email: profile['email'],
	                        password : profile['id'],
	                        first_name: profile['first_name'],
	                        picture: profile['picture']['data']['url'],
	                        name: profile['name']
  		}
  	} )
  }
  	
  	

  	)
  .catch(e => console.log('Error logging into Facebook', e));
// this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

}


}
