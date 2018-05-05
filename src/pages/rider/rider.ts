import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiderPage');
  }

  selectRider(){
    this.navCtrl.push(DetailWithRiderPage);
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
