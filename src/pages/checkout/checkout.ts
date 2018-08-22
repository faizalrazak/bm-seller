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


  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpprovider: HttpProvider,
  	public toastCtrl:ToastController,
    private iab: InAppBrowser

  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  pay(){
  let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  // let newData = this.ref.push();
  //   newData.set({
  //     roomname:this.item.restaurant.name+'-'+this.item.id
  // });
  //  this.chatroom_id = newData
  // console.log(this.chatroom_id.path.pieces_[1])

  let data = {
    'restaurant_id' : '1',
    'date' : '2018-02-09',
    'delivery_location' : 'test',
    'status' : 0,
    'rider_id' : 0,
    'cart_id' : '2',
    'total_price' : '30',
    // 'chatroom_id' : this.chatroom_id.path.pieces_[1]
  }

  console.log(data)

  this.httpprovider.postSubscription(data)
     .then((result) => {
       loading.dismiss();
       console.log(result)

      this.paymentLink = result
       const browser = this.iab.create(this.paymentLink, '_self',{location:'no'}); 
        browser.on('loadstop').subscribe(event => {        
          if (event.url.match("return-payment")) {
            browser.close();

            // let newData = this.ref.push();
            // newData.set({
            //   roomname:this.data.roomname
            // });
            // console.log(newData)
            
            let toast = this.toastCtrl.create({
              message: 'Payment Success',
              duration:3000,
              position: 'bottom'
            });
            toast.present();
            // this.navCtrl.setRoot(TabsPage);

          }
          else if (event.url.match("payment-failed")){
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
