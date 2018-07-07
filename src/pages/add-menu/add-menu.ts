import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } 
from 'ionic-angular';
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
  restaurantInfo:any;
  RestId:any;
	base64Image:any;

  mainCategories:any;

  mainAddOn:any;

  input= {
   rest_id:'',
  name:'',
  category:'',
  price:'',
  addOnMain:'',
  food_image:''
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private camera: Camera,
    public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController) {

    
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad AddMenuPage');
  let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
  this.httpprovider.getRestaurantInfo().then(
     (response) => {
       console.log(response)
       
        this.restaurantInfo=response
        this.RestId=this.restaurantInfo.data.id 
        console.log(this.RestId)

        this.httpprovider.getCategoryMain().subscribe(
     response => {
       console.log(response)
       this.mainCategories=response.data
     },
     err => {
       console.log(err);
     },
     ()=>{
     console.log('List of mains categories')
   }
   );

        this.httpprovider.getAddOn().subscribe(
     response => {
       console.log(response)
       this.mainAddOn=response.data
       loading.dismiss();
     },
     err => {
       console.log(err);
     },
     ()=>{
     console.log('List of mains add-on')
   }
   );

        
     },
     err => {
       console.log(err);
     },
   );
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
       restaurant_id:this.RestId,
       name: this.input.name,
       categories:this.input.category,
       add_ons:this.input.addOnMain,
       price : this.input.price,
       food_image:"test"
      }



  console.log(food);
  
  

     this.httpprovider.createMenu(food, this.RestId)
     .then((result) => {
      let toast = this.toastCtrl.create({
        message:'New main successfully added' ,
        duration: 3000,
        position: 'bottom'
      });
       loading.dismiss();
      toast.present();
      
     this.navCtrl.pop();

     
     },
         (err) => {
         console.log(err);
     });
 }

 back(){
   
    this.viewCtrl.dismiss();
  }
}

