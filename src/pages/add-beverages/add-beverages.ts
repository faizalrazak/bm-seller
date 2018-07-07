import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';


import { MyRestaurantPage } from '../my-restaurant/my-restaurant';



/**
 * Generated class for the AddBeveragesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-beverages',
  templateUrl: 'add-beverages.html',
})
export class AddBeveragesPage {
  restaurantInfo:any;
  RestId:any;
  beverageCategories:any;
  base64Image:any;
  mainAddOn:any;
  
	input= {
   rest_id:'',
  name:'',
  category:'',
  price:'',
  drink_image:''
  
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
  	public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController,
    private camera: Camera,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBeveragesPage');
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



        this.httpprovider.getCategoryBev().subscribe(
     response => {
       console.log(response)
       this.beverageCategories=response.data
     },
     err => {
       console.log(err);
     },
     ()=>{
     console.log('List of categories')
  loading.dismiss();

   }
   );   
     },
     err => {
       console.log(err);
     },
   );


  }

  addBeverageForm(){

   let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
   
   let beverage = {
       restaurant_id:this.RestId,
       name: this.input.name,
       categories:this.input.category,
      price : this.input.price,
      drink_image:"test"
       

      }



  console.log(beverage);
  
  

     this.httpprovider.createBeverage(beverage, this.RestId).then((result) => {
     	 loading.dismiss();
      this.navCtrl.setRoot(MyRestaurantPage);    
     },
         (err) => {
         console.log(err);
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
