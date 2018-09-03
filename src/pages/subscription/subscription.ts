import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  subscribeValue;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpprovider: HttpProvider,
    private toastCtrl: ToastController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }

  proceedSubscription(){
    this.navCtrl.push(CheckoutPage, this.subscribeValue)  
  }
}
