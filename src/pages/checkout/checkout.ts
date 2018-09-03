import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { InAppBrowser } from '@ionic-native/in-app-browser'

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  paymentLink:any
  subuscriptionValue:any
  price:any
  totalDays:any

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpprovider: HttpProvider,
  	public toastCtrl:ToastController,
    private iab: InAppBrowser

  	) {
    this.subuscriptionValue = this.navParams.data;

    if(this.subuscriptionValue == 1){
      this.price = 25.00
      this.totalDays = 10
    }else if(this.subuscriptionValue == 2){
      this.price = 50.00
      this.totalDays = 20
    }else{
      this.price = 75.00
      this.totalDays = 30
    }
    console.log(this.price)
    console.log(this.totalDays)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  pay(){
  let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });
  let data = {
    'subscription_code' : this.subuscriptionValue,
  }

  console.log(data)

  this.httpprovider.subscribePlan(data)
     .then((result) => {
       loading.dismiss();
       console.log(result)

      this.paymentLink = result
       const browser = this.iab.create(this.paymentLink, "_self ",{location:"yes"}); 
        browser.on('loadstop').subscribe(event => {        
          if (event.url.match("payment-success")) {
            browser.close();
            let toast = this.toastCtrl.create({
              message: 'Payment Success',
              duration:3000,
              position: 'bottom'
            });
            toast.present();
          }
          else if (event.url.match("payment-fail")){
            browser.close();            
            let toast = this.toastCtrl.create({
              message: 'Payment Fail, Please Try Again',
              duration:3000,
              position: 'bottom'
            });
            toast.present();
          }
        });

     
     },
         (err) => {
         console.log(err);
     });
}

}
