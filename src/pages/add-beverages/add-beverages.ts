import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, ToastController } from 'ionic-angular';
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
  bevImg:any;
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
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,

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
  if (!this.bevImg) {
      this.bevImg =
        "data:image/png;base64,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";
    }
   
   let beverage = {
       restaurant_id:this.RestId,
       name: this.input.name,
       categories:this.input.category,
      price : this.input.price,
      drink_image:this.bevImg
       

      }



  console.log(beverage);
  
  

     this.httpprovider.createBeverage(beverage, this.RestId).then((result) => {
     	 let toast = this.toastCtrl.create({
        message:'New beverage successfully added' ,
        duration: 3000,
        position: 'bottom'
      });
       loading.dismiss();
      toast.present();
      
     this.navCtrl.popToRoot();   
     },
         (err) => {
         console.log(err);
         let toast1 = this.toastCtrl.create({
                    message: "Please fill up details",
                     duration: 3000,
                    position: 'bottom'
                  });
                  
                  loading.dismiss();
                  toast1.present()
     });
 }

 openCamera() {
    let alert = this.alertCtrl.create({
      title: "Choose your photo from:",
      buttons: [
        {
          text: "Camera",
          role: "Camera",
          handler: () => {
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
            };
            this.camera.getPicture(options).then(
              imageData => {
                this.base64Image = "data:image/jpeg;base64," + imageData;
                this.bevImg = this.base64Image;
                console.log(this.bevImg);
              },
              err => {
              }
            );
          }
        },
        {
          text: "Gallery",
          role: "Gallery",
          handler: () => {
            const options: CameraOptions = {
              quality: 70,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              correctOrientation: true,
              mediaType: this.camera.MediaType.PICTURE
            };
            this.camera.getPicture(options).then(
              imageData => {
                this.base64Image = "data:image/jpeg;base64," + imageData;
                this.bevImg = this.base64Image;
                console.log(this.bevImg);
              },
              err => {
              }
            );
          }
        }
      ]
    });
    alert.present();
  }

//  openCamera(){
//   const options: CameraOptions = {
//     quality: 70,
//     targetWidth: 900,
//     targetHeight: 600,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     saveToPhotoAlbum: false,
//     allowEdit: true,
//     sourceType: 1
//   }

// this.camera.getPicture(options).then((imageData) => {
//  // imageData is either a base64 encoded string or a file URI
//  // If it's base64:
//  this.base64Image = 'data:image/jpeg;base64,' + imageData;
//  this.bevImg=this.base64Image
// }, (err) => {
//  // Handle error
// });
// }

}
