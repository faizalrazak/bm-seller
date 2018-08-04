import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the NewRiderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-rider',
  templateUrl: 'new-rider.html',
})
export class NewRiderPage {
	restaurantInfo:any;
	restId:any;

input= {
   	firstName:'',
  	lastName:'',
  	address:'',
  	riderDob:'',
  	plate:'',
  	riderImage:'',
  	phone:''
  };

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public httpprovider: HttpProvider, 
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRiderPage');
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
        console.log(this.restId)
          loading.dismiss();

        
  
     },
     err => {
       console.log(err);
          loading.dismiss();
     },
   );
  }

  addRider(){

   let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
   
   let rider = {
       first_name:this.input.firstName,
       last_name: this.input.lastName,
       address:this.input.address,
       birth_date:this.input.riderDob,
       plate_no : this.input.plate,
       rider_image:"test",
       phone_number:this.input.phone,
       active:1
      }



  console.log(rider);
  
  

     this.httpprovider.addRider(rider, this.restId)
     .then((result) => {
      let toast = this.toastCtrl.create({
        message:'New rider successfully added' ,
        duration: 3000,
        position: 'bottom'
      });
       loading.dismiss();
      toast.present();
      
     this.navCtrl.setRoot(ProfilePage);

     
     },
         (err) => {
         console.log(err);
     });
 }

}
