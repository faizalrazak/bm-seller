import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpProvider } from '../../providers/http/http';


import { MyRestaurantPage } from '../my-restaurant/my-restaurant';



/**
 * Generated class for the EditMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-menu',
  templateUrl: 'edit-menu.html',
})
export class EditMenuPage {

  soldValue: boolean;
	base64Image:any;
  restaurantInfo:any;
  restId:any;
  mainsInfo:any;
  mainsId:any;
  mainsName:any;
  mainsPrice:any;
  mainsImg:any;
  mainsCategory:any;
  sold:any;
  categories = "";
  imageLink="http://api.bigmomma.com.my/uploads/"
  mainCategories:any;
  category:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private camera: Camera,
    public httpprovider: HttpProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController

    ) {
    this.mainsId=this.navParams.data
    console.log(this.mainsId)
  }

  ionViewDidLoad() {
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

    console.log('ionViewDidLoad EditMenuPage');
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
        
        

     this.httpprovider.showMains(this.restId,this.mainsId).subscribe(
      response => {
        console.log(response)
        this.mainsInfo=response
        this.mainsName=this.mainsInfo.data.data.name
        this.mainsPrice=this.mainsInfo.data.data.price
        this.mainsCategory=this.mainsInfo.data.categories
        this.mainsImg=this.imageLink+this.mainsInfo.data.data.food_image
        console.log(this.mainsImg)
        this.sold="1"
        // if(this.sold == 1) {
        //   this.soldValue = true
        // } else {
        //   this.soldValue = false
        // }
        for(let category of this.mainsCategory  ) {
          this.categories = this.categories +" - "+category.type
        }

        console.log(this.categories)
        console.log(this.mainsInfo)
       
         },
           err => {
           console.log(err);
           loading.dismiss();

     },
     ()=>{
     console.log('List of menus')
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

     if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(this.mainsImg)) 
    {      
      this.mainsImg=""
       }
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Please Wait...'
  });

  loading.present();
  
       this.httpprovider.updateMainsInfo(
       this.mainsName,
       this.mainsPrice,
       this.mainsId,
       this.restId,
       this.mainsImg,
       this.sold,
       this.category)

       .then((result) => {
       let toast = this.toastCtrl.create({
        message:'Main info successfully updated' ,
        duration: 3000,
        position: 'bottom'
      });
       loading.dismiss();
      toast.present();
      
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
 this.mainsImg=this.base64Image
}, (err) => {
 // Handle error
});
}

save(){
  	 this.navCtrl.setRoot(MyRestaurantPage);
  }

}
