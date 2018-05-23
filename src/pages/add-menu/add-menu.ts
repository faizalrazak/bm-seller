import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpProvider } from '../../providers/http/http';


import { MyRestaurantPage } from '../my-restaurant/my-restaurant';



/**
 * Generated class for the AddMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-menu',
  templateUrl: 'add-menu.html',
})
export class AddMenuPage {
	base64Image:any;

  input= {
   rest_id:'',
  name:'',
  price:'',
  food_image:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    public httpprovider: HttpProvider, public loadingCtrl: LoadingController) {
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad AddMenuPage');
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

addMenuForm(){

   let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
   
   let food = {
       restaurant_id:"1",
       name: this.input.name,
      price : this.input.price,
      food_image:"test"
      }



  console.log(food);
  
  

     this.httpprovider.createMenu(food).then((result) => {
       loading.dismiss();
      this.navCtrl.setRoot(MyRestaurantPage);    
     },
         (err) => {
         console.log(err);
     });
 }
}

