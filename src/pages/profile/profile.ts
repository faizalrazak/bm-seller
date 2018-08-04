import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


import { RiderPage } from '../rider/rider'
import { EditProfilePage } from '../edit-profile/edit-profile'
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imageLink="http://api.bigmomma.com.my/uploads/"

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


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpprovider: HttpProvider, 
    public modalCtrl: ModalController


    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

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
        this.restAbout=this.restaurantInfo.data.about
        this.restCat=this.restaurantInfo.categories
        console.log(this.restCat)
        this.RestSSMNo=this.restaurantInfo.data.ssm_reg_no 
        this.ssmImage=this.imageLink+this.restaurantInfo.data.ssm_verification_image
        this.icImage=this.imageLink+this.restaurantInfo.data.ic_image
        this.icHold=this.imageLink+this.restaurantInfo.data.user_ic_image
        this.restImage=this.imageLink+this.restaurantInfo.data.restaurant_image
        console.log(this.restImage)
        loading.dismiss();   
     },
     err => {
       console.log(err);
     },
   );
 
     },
     err => {
       console.log(err);
            },
   );
  }

  rider(){
    this.navCtrl.push(RiderPage)
  }

  editProfile(){
    let profileModal = this.modalCtrl.create(EditProfilePage);
   profileModal.onDidDismiss(() => {

      this.ionViewDidLoad();

    });
   profileModal.present();

  }

}
