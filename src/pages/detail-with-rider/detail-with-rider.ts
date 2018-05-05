import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MessageRoomPage } from '../message-room/message-room';


/**
 * Generated class for the DetailWithRiderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-with-rider',
  templateUrl: 'detail-with-rider.html',
})
export class DetailWithRiderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailWithRiderPage');
  }

  messageRoomButton(){
    this.navCtrl.push(MessageRoomPage)
  }

}
