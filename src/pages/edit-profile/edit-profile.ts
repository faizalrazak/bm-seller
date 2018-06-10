import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


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

  restCategories:any;
	

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private camera: Camera,
    public httpprovider: HttpProvider,
    public loadingCtrl: LoadingController

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
        this.RestId=this.restaurantInfo.data.id
        this.RestName=this.restaurantInfo.data.name
        this.RestAddress=this.restaurantInfo.data.address
        this.RestSSMNo=this.restaurantInfo.data.ssm_reg_no 
        loading.dismiss();   
     },
     err => {
       console.log(err);
     },
   );
        this.httpprovider.getCategoryRest().subscribe(
     response => {
       console.log(response)
       this.restCategories=response.data
       loading.dismiss();
     },
     err => {
       console.log(err);
     },
     ()=>{
     console.log('List of categories')
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

back(){
    this.navCtrl.pop();
  }
}
