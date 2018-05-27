import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpProvider } from '../../providers/http/http';



/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

 
	userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook,
  	public httpprovider: HttpProvider, public loadingCtrl: LoadingController, 
  	private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  facebookLogin(){
  	let loading = this.loadingCtrl.create({
	    spinner: 'ios',
	    content: 'Loading Please Wait...'
	  });

  loading.present()
   this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {

  	this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', [])
  	.then(profile =>{
  		this.userProfile={
  						  	        email: profile['email'],
	                        password : profile['id'],
	                        first_name: profile['first_name'],
	                        picture: profile['picture']['data']['url'],
	                        name: profile['name'],
	                        category: profile['2'],
	                        phone_number: profile['0145002596']
	                    }

	   
	   this.httpprovider.registerUser(this.userProfile).then((result) => {
       ;

       let response = result;
       loading.dismiss();

       console.log(response);
       if(response == 'Email already exists')
       { console.log('lalu')
         let toast = this.toastCtrl.create({
          message: 'Email already exists',
           duration: 3000,
          position: 'bottom'

  });
                   toast.present();

       }
       else{
         // this.navCtrl.push(VerificationPage,{email:this.todo.value.email});
       }
                  
     },
         (err) => {
         console.log('lalu');
         console.log(err);
     });

 } 
  	 )
  }
  	
  	

  	)
  .catch(e => console.log('Error logging into Facebook', e));
   loading.dismiss();
// this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

}

}
