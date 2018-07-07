import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


import { VerificationCodePage } from '../verification-code/verification-code';


/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  user:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public nativeStorage: NativeStorage 
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');

    this.nativeStorage.getItem('user')
  .then(
    data => this.user=data,
    error => console.error(error)



  );
  }

  verificationCode(){
	this.navCtrl.setRoot(VerificationCodePage);

	}

}
