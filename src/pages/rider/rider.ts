import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


import { DetailWithRiderPage } from '../detail-with-rider/detail-with-rider';
import { NewRiderPage } from '../new-rider/new-rider';


/**
 * Generated class for the RiderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rider',
  templateUrl: 'rider.html',
})
export class RiderPage {
  riders:any;
  restaurantInfo:any;
  restId:any;

  constructor(
    public viewCtrl: ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiderPage');

    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
  this.httpprovider.getRestaurantInfo().then(
     (response) => {
       console.log(response)
       
        this.restaurantInfo=response
        this.restId=this.restaurantInfo.data.id
        console.log(this.restId)

        this.httpprovider.myRider(this.restId).subscribe(
     response => {
       console.log(response)
       this.riders=response.data
       
     },
     err => {
       console.log(err);
     },
     ()=>{
     console.log('List of riders')
     loading.dismiss();
   }
   );
  
     },
     err => {
       console.log(err);
          loading.dismiss();
     },
   );
    
  }

  selectRider(){
    this.navCtrl.push(DetailWithRiderPage);
  }

  newRider(){
    this.navCtrl.push(NewRiderPage);
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
