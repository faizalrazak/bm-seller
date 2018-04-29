import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FindRiderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-rider',
  templateUrl: 'find-rider.html',
})
export class FindRiderPage {

  rider:any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.rider == 'no rider'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindRiderPage');
  }

  dismissModal(){
    this.viewCtrl.dismiss();
  }

}
