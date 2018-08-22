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
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
 
   let subscribe = {
       subscription_code:this.subscribeValue,
      }



  console.log(subscribe);
  
      

     this.httpprovider.subscribe(subscribe)
     .then((result) => {
      let toast = this.toastCtrl.create({
        message:'Subscription plan selected' ,
        duration: 3000,
        position: 'bottom'
      });
       loading.dismiss();
      toast.present();
      
     this.navCtrl.push(CheckoutPage)

     
     },
         (err) => {
         console.log(err);
         let toast1 = this.toastCtrl.create({
                    message: "Please choose which plan you want",
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  loading.dismiss();
                  toast1.present()
     });
 
    
  }

}
