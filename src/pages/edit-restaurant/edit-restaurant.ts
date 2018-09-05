import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  categoryArray = []


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public httpprovider: HttpProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private alertCtrl: AlertController,
    ){
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
        this.restCategory=this.restaurantInfo.categories
        this.restUnitNo=this.restaurantInfo.data.unit_no
        this.restAbout=this.restaurantInfo.data.about
        this.restImg=this.imageLink+this.restaurantInfo.data.restaurant_image

        console.log(this.restCategory)
        

        this.httpprovider.getCategoryRest().subscribe(
        response => {
          this.restCategories=response.data
        },err => {
          console.log(err);
          let toast = this.toastCtrl.create({
            message: 'Please register a restaurant first',
              duration: 3000,
            position: 'bottom'
          });
          toast.present()
          loading.dismiss();
     },
     ()=>{
     console.log('List of categories')
     loading.dismiss();
   }
   );
 
     },
     err => {
       console.log(err);
       let toast = this.toastCtrl.create({
                    message: 'Please register a restaurant first 2',
                     duration: 3000,
                    position: 'bottom'
                  });
          toast.present()
          loading.dismiss();
     },
   );

  }

  updateForm(){

    if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(this.restImg)) 
    {      
      this.restImg=""
    }

    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Loading Please Wait...'
  });

  loading.present();
  console.log(this.restCategory);


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
       this.restImg).then((result) => {

        let toast = this.toastCtrl.create({
          message:'Restaurant info successfully updated' ,
          duration: 3000,
          position: 'bottom'
        });

        loading.dismiss();
        toast.present();
        this.navCtrl.popToRoot()
      },(err) => {
         console.log(err);
     });
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
                this.restImg = this.base64Image;
                console.log(this.restImg);
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
                this.restImg = this.base64Image;
                console.log(this.restImg);
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
