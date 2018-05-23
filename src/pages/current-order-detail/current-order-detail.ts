import { Component } from '@angular/core';
import { IonicPage, ActionSheetController, NavController, ModalController, NavParams } from 'ionic-angular';


import { RiderPage } from '../rider/rider';
import { MessageRoomPage } from '../message-room/message-room';
import { FindRiderPage } from '../find-rider/find-rider';
import { OrderPage } from '../order/order'



/**
 * Generated class for the CurrentOrderDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-current-order-detail',
  templateUrl: 'current-order-detail.html',
})
export class CurrentOrderDetailPage {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, 
  	public navParams: NavParams,
  	public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentOrderDetailPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Rider',
      buttons: [
        {
          text: 'My Rider',
          handler: () => {
            let modal = this.modalCtrl.create(RiderPage);
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

  cancel(){
    this.navCtrl.setRoot(OrderPage)
  }

}
