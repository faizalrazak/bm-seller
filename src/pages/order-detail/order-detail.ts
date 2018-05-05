import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FindRiderPage } from '../find-rider/find-rider';
import { RiderPage } from '../rider/rider';
import { MessageRoomPage } from '../message-room/message-room';
import { MapsPage } from '../maps/maps'

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
  base64Image:any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, 
    public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private camera: Camera) {
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
  openCamera(){
     const options: CameraOptions = {
  quality: 70,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});
}


  messageRoomButton(){
    this.navCtrl.push(MessageRoomPage)
  }

  goMaps(){
    this.navCtrl.push(MapsPage)
  }

}
