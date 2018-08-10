import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpProvider } from '../../providers/http/http'
import { FindRiderPage } from '../find-rider/find-rider';
import { RiderPage } from '../rider/rider';
import { MessageRoomPage } from '../message-room/message-room';
import { MapsPage } from '../maps/maps';
import { OrderPage } from '../order/order'

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
  order;
  cartItems;
  subtotal:number;
  delivery_fee:number = 0.00
  processing_fee:number = 0.50
  total:number

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController, 
    private camera: Camera,
    private http:HttpProvider
  ){

      this.order = this.navParams.data
      console.log(this.order)
  }

  ionViewDidLoad() {
    
    this.http.getCartItems(this.order.cart.id).subscribe(
      response => {
        this.cartItems=response.data
        console.log(this.cartItems)
        this.subtotal = 0;

        for(let cart of this.cartItems){
          this.subtotal = this.subtotal + parseFloat(cart.data.price)
        }
        this.total = this.subtotal + this.delivery_fee + this.processing_fee
        console.log(this.cartItems)
      },err => {
        console.log(err);
      });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Rider',
      buttons: [
        {
          text: 'My Rider',
          handler: () => {
            this.navCtrl.push(RiderPage)
          }
        }, {
          text: 'Find Rider',
          handler: () => {
            this.navCtrl.push(FindRiderPage)
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
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      sourceType: 1
    }

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64:
 this.base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
 // Handle error
});
}


  messageRoomButton(id){
    console.log(id)
    let modal = this.modalCtrl.create(MessageRoomPage, {key:id});
    modal.present();
  }

  goMaps(){
    this.navCtrl.push(MapsPage)
  }

  cancel(){
    this.navCtrl.setRoot(OrderPage)
  }

}
