import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


import { DetailWithRiderPage } from '../detail-with-rider/detail-with-rider';


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

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, 
    public navParams: NavParams, public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiderPage');

  //   let loading = this.loadingCtrl.create({
  //   spinner: 'ios',
  //   content: 'Please Wait...'
  // });

  // loading.present();
  //   this.httpprovider.myRider().subscribe(
  //    response => {
  //      console.log(response)
  //      this.riders=response.data
       
  //    },
  //    err => {
  //      console.log(err);
  //    },
  //    ()=>{
  //    console.log('List of riders')
  //    loading.dismiss();
  //  }
  //  );
  }

  selectRider(){
    this.navCtrl.push(DetailWithRiderPage);
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
