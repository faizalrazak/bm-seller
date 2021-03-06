import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, LoadingController,AlertController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

import{ MyRestaurantPage } from '../my-restaurant/my-restaurant'


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  base64Image:any;
  imageLink="http://api.bigmomma.com.my/uploads/"

  icPic:any;
  icHoldPic:any;
  restPic:any;
  ownerInfo:any;
  ownerId:any;
  ownerName:any;
  ownerEmail:any;
  ownerPhoneNo:any;

  restaurantInfo:any;
  RestId:any;
  RestName:any;
  RestAddress:any;
  RestSSMNo:any;
  restAbout:any;
  restCat:any;
  ssmImage:any;
  icImage:any;
  icHold:any;
  restImage:any;
  restUnit:any;
  restCloseHour:any;
  restOpenHour:any;
  location:any;
  restCategory:any;


  restCategories:any;
	

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private camera: Camera,
    public httpprovider: HttpProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,

  	) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');

    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();

     this.httpprovider.getOwnerInfo().then(
     (response) => {
       console.log(response)
       
        this.ownerInfo=response
        this.ownerId=this.ownerInfo.id
        this.ownerName=this.ownerInfo.name
        this.ownerEmail=this.ownerInfo.email
        this.ownerPhoneNo=this.ownerInfo.phone_number
        

        this.httpprovider.getRestaurantInfo().then(
     (response) => {
       console.log(response)
       
        this.restaurantInfo=response
        if(this.restaurantInfo != null){
        this.RestId=this.restaurantInfo.data.id
        this.RestName=this.restaurantInfo.data.name
        this.RestAddress=this.restaurantInfo.data.address
        this.restUnit=this.restaurantInfo.data.unit_no
        this.RestSSMNo=this.restaurantInfo.data.ssm_reg_no 
        this.restAbout=this.restaurantInfo.data.about
        this.restCat=this.restaurantInfo.categories
        console.log(this.restCat)
        this.ssmImage=this.imageLink+this.restaurantInfo.data.ssm_verification_image
        this.icImage=this.imageLink+this.restaurantInfo.data.ic_image
        this.icHold=this.imageLink+this.restaurantInfo.data.user_ic_image
        this.restImage=this.imageLink+this.restaurantInfo.data.restaurant_image
        this.restOpenHour=this.restaurantInfo.data.opening_hour
        this.restCloseHour=this.restaurantInfo.data.closing_hour
        this.location=this.restaurantInfo.data.location
        console.log(this.restUnit)
        console.log(this.restaurantInfo);


      }
        loading.dismiss();

     },
     err => {
        console.log(err);
       let toast = this.toastCtrl.create({
                    message: 'Please register a restaurant first',
                     duration: 3000,
                    position: 'bottom'
                  });
          toast.present()
          loading.dismiss();
     },
   );
        this.httpprovider.getCategoryRest().subscribe(
     response => {
       console.log(response)
       this.restCategories=response.data
     },
     err => {
       console.log(err);
          loading.dismiss();
     },
     ()=>{
     console.log('List of categories')
       // loading.dismiss();

   }
   );
 
     },
     err => {
       console.log(err);
          loading.dismiss();
            },
   );
  }

  updateForm(){
    if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(this.restImage)) 
    {      
      this.restImage=""
       }
       
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Please Wait...'
  });
  loading.present();

       this.httpprovider.editRest(
         this.RestName,
         this.RestAddress,
         this.RestSSMNo,
         this.restAbout,
         this.RestId,
         this.ssmImage,
         this.icPic,
         this.icHoldPic,
         this.restImage,
         this.restUnit,
         this.restCloseHour,
         this.restOpenHour,
         this.location,
         this.restCat).then((result) => {

         this.httpprovider.editProfile(this.ownerName, this.ownerEmail, this.ownerPhoneNo)
         .then((result) => {
           loading.dismiss();
           let toast = this.toastCtrl.create({
            message:'Detail successfully updated' ,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
      this.navCtrl.popToRoot()
     },
         (err) => {
         console.log(err);
     
   });
     },(err) => {
         console.log(err);
         loading.dismiss();
     });
 }

 editProfile(){
   let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Please Wait...'
  });
   loading.present()
   this.httpprovider.editProfile(this.ownerName, this.ownerEmail, this.ownerPhoneNo)
         .then((result) => {
           loading.dismiss();
       let toast = this.toastCtrl.create({
        message:'Detail successfully updated' ,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.popToRoot()
     },
         (err) => {
         console.log(err);
     
   });
 }

  openCameraSsm(){
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
                this.ssmImage = this.base64Image;
                console.log(this.ssmImage);
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
                this.ssmImage = this.base64Image;
                console.log(this.ssmImage);
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

openCameraIc(){
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
                this.icImage = this.base64Image;
                console.log(this.icImage);
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
                this.icImage = this.base64Image;
                console.log(this.icImage);
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

openCameraHoldIc(){
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
                this.icHold = this.base64Image;
                console.log(this.icHold);
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
                this.icHold = this.base64Image;
                console.log(this.icHold);
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

openCameraRestImage(){
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
                this.restImage = this.base64Image;
                console.log(this.restImage);
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
                this.restImage = this.base64Image;
                console.log(this.restImage);
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

back(){
    this.navCtrl.pop();
  }
}
