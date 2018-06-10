import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';


import { EditRestaurantPage } from '../edit-restaurant/edit-restaurant';
import { EditMenuPage } from '../edit-menu/edit-menu';
import { AddMenuPage } from '../add-menu/add-menu';
import { AddBeveragesPage } from '../add-beverages/add-beverages';


/**
 * Generated class for the MyRestaurantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-restaurant',
  templateUrl: 'my-restaurant.html',
})
export class MyRestaurantPage {
  
  restaurantInfo:any;
  RestId:any;
  RestName:any;
  RestOpenHour:any;
  RestCloseHour:any;
  mains:any;
  beverages:any;
  restaurants:any;
  checked:any;

   restaurant = {
    
    open: "",
    id:""
   
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController, 
    ) {
    this.restaurants = 'menu'
    this.checked = 'true'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRestaurantPage');

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
        this.RestName=this.restaurantInfo.data.name
        this.RestOpenHour=this.restaurantInfo.data.opening_hour
        this.RestCloseHour=this.restaurantInfo.data.closing_hour 

        this.httpprovider.getBeverages(this.RestId).subscribe(
      response => {
        console.log(response)
        this.beverages=response.data
       
         },
           err => {
           console.log(err);
       
            },
              ()=>{
              console.log('List of beverages')
     
   }
   );
        this.httpprovider.getMains(this.RestId).subscribe(
      response => {
        console.log(response)
        this.mains=response.data
       
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
       let toast = this.toastCtrl.create({
                    message: 'You do not set any restaurant yet',
                     duration: 3000,
                    position: 'bottom'
                  });
          toast.present()
          loading.dismiss();
     },
   );
  }

  presentProfileModal() {
   let profileModal = this.modalCtrl.create(EditRestaurantPage);
   profileModal.onDidDismiss(() => {

      this.ionViewDidLoad();

    });
   profileModal.present();

 }

 addMenuModal() {
   let profileModal = this.modalCtrl.create(AddMenuPage);
   profileModal.onDidDismiss(() => {

      this.ionViewDidLoad();

    });
   profileModal.present();

 }

 addBeverageModal() {
   let profileModal = this.modalCtrl.create(AddBeveragesPage);
   profileModal.onDidDismiss(() => {

      this.ionViewDidLoad();

    });
   profileModal.present();

 }

  editMenu(){
    this.navCtrl.push(EditMenuPage)
  }



  OpenRest(){
     
    let rest={
     restaurant_id : "1",
     open : this.restaurant.open
    } 

    this.httpprovider.OpenCloseRest(rest).then(
      result => {
           
      },
      err => {
        
      }
    );
  }
}
