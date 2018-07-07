import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewController, ToastController } from 'ionic-angular'

import { MyRestaurantPage } from '../my-restaurant/my-restaurant';






/**
 * Generated class for the RegisterRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-restaurant',
  templateUrl: 'register-restaurant.html',
})
export class RegisterRestaurantPage {
  restCategories:any;
  base64Image:any;

  rest = {
       
      name:'',
      location:'',
      unit_no:'',
      address:'',
      open:'',
      about:'',
      opening_hour:'',
      closing_hour:'',
      ssm_reg_no:'',
      ssm_verification_image:'',
      ic_image:'',
      user_ic_image:'',
      categories:''
     }
  


  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public httpprovider: HttpProvider,
    private camera: Camera,
    public viewCtrl:ViewController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,

  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterRestaurantPage');
    this.httpprovider.getCategoryRest().subscribe(
     response => {
       console.log(response)
       this.restCategories=response.data
      
     },
     err => {
       console.log(err);
            },
   );
  }

  registerRestaurant(){
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
  	let rest = {
       
      name: this.rest.name,
      // name: "resttest",
      location : this.rest.location,
      // location : "bangi",

      unit_no : this.rest.unit_no,
      // unit_no : "13",

      address:this.rest.address,
      // address:"test",

      // open:this.rest.open,
      open:0,

      about:this.rest.about,
      // about:"test",

      opening_hour:this.rest.opening_hour,
      // opening_hour:"08:00:21",

      closing_hour:this.rest.closing_hour,
      // closing_hour:"10:00:24",

      ssm_reg_no:this.rest.ssm_reg_no,
      // ssm_reg_no:"test",

      // ssm_verification_image:this.rest.ssm_verification_image,
      ssm_verification_image:"test",

      // ic_image:this.rest.ic_image,
      ic_image:"test",

      // user_ic_image:this.rest.user_ic_image,
      user_ic_image:"test",

      categories:this.rest.categories
      // categories:["4"]

      



     }

     this.httpprovider.registerRestaurant(rest).then((result) => {
       let toast = this.toastCtrl.create({
    message: 'Restaurant registration successfully',
    duration: 3000,
    position: 'bottom'
  });      
           loading.dismiss();
           toast.present();
          this.navCtrl.setRoot(MyRestaurantPage);      
     },
         (err) => {
         console.log(err);
           loading.dismiss();

     });
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

back(){
    this.navCtrl.pop();
  }

}

