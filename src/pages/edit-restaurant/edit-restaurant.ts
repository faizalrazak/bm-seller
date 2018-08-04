import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';



import { MyRestaurantPage } from '../my-restaurant/my-restaurant';


/**
 * Generated class for the EditRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-restaurant',
  templateUrl: 'edit-restaurant.html',
})
export class EditRestaurantPage {
  base64Image:any;
  imageLink="http://api.bigmomma.com.my/uploads/"

  restaurantInfo:any;
  restId:any;
  restName:any;
  restOpenHour:any;
  restCloseHour:any;
  restLocation:any;
  restAddress:any;
  restCategory:any;
  restUnitNo:any;
  restImg:any;
  restAbout:any;
  restPic:any;

  restCategories:any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public httpprovider: HttpProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRestaurantPage');

    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();

     this.httpprovider.getRestaurantInfo().then(
     (response) => {
       console.log(response)
       
        this.restaurantInfo=response
        this.restId=this.restaurantInfo.data.id
        this.restName=this.restaurantInfo.data.name
        this.restLocation=this.restaurantInfo.data.location
        this.restOpenHour=this.restaurantInfo.data.opening_hour
        this.restCloseHour=this.restaurantInfo.data.closing_hour
        this.restAddress=this.restaurantInfo.data.address
        this.restCategory=this.restaurantInfo.data.category_id
        this.restUnitNo=this.restaurantInfo.data.unit_no
        this.restAbout=this.restaurantInfo.data.about
        this.restImg=this.imageLink+this.restaurantInfo.data.restaurant_image
        console.log(this.restImg)
        

        this.httpprovider.getCategoryRest().subscribe(
     response => {
       console.log(response)
       this.restCategories=response.data
       
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

  updateForm(){
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Please Wait...'
  });

  loading.present();
  

  console.log(this.restaurantInfo);


       this.httpprovider.updateRestInfo(
       this.restName,
       this.restLocation,
       this.restOpenHour,
       this.restCloseHour,
       this.restUnitNo,
       this.restAddress,
       this.restCategory,
       this.restId,
       this.restAbout,
       this.restImg)

       .then((result) => {
       let toast = this.toastCtrl.create({
        message:'Restaurant info successfully updated' ,
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

 openCameraRestImage(){
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
 this.restImg=this.base64Image
}, (err) => {
 // Handle error
});
}

  back(){
    this.navCtrl.pop();
  }
}
