import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { FindRiderPage } from '../find-rider/find-rider';
import { MessageRoomPage } from '../message-room/message-room';

/**
 * Generated class for the OrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Rider',
      buttons: [
        {
          text: 'My Rider',
          handler: () => {
            let modal = this.modalCtrl.create(FindRiderPage);
            modal.present();
          }
        }, {
          text: 'Find Rider',
          handler: () => {
            let modal = this.modalCtrl.create(FindRiderPage);
            modal.present();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  messageRoomButton(){
    this.navCtrl.push(MessageRoomPage)
  }

}
