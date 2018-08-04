import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { EditRestaurantPage } from '../edit-restaurant/edit-restaurant';
import { EditMenuPage } from '../edit-menu/edit-menu';
import { EditBeveragePage } from '../edit-beverage/edit-beverage';
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

  toggleValue: boolean;
  imageLink="http://api.bigmomma.com.my/uploads/"
  restaurantInfo:any;
  RestId:any;
  RestName:any;
  restImage:any;
  restCategory:any;
  RestOpenHour:any;
  RestCloseHour:any;
  mains:any;
  beverages:any;
  bevImg:any;
  restaurants:any;
  open:any;

  message:string;
  image:string;
  url:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing 
    ) {
    this.restaurants = 'menu'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRestaurantPage');

    // this.open =  window.localStorage.getItem('open')  ? window.localStorage.getItem('open') : false  


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
        this.restImage=this.imageLink+this.restaurantInfo.data.restaurant_image
        this.RestName=this.restaurantInfo.data.name
        this.restCategory=this.restaurantInfo.data.category
        this.RestOpenHour=this.restaurantInfo.data.opening_hour
        this.RestCloseHour=this.restaurantInfo.data.closing_hour
        this.open=this.restaurantInfo.data.open

        if(this.open == 1) {
          this.toggleValue = true
        } else {
          this.toggleValue = false
        }

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

 // addMenuModal() {
 //    this.navCtrl.push(AddMenuPage, {});
 //  }

 

 addBeverageModal() {
   let profileModal = this.modalCtrl.create(AddBeveragesPage);
   profileModal.onDidDismiss(() => {

      this.ionViewDidLoad();

    });
   profileModal.present();

 }

  editMenu(menuId){
    this.navCtrl.push(EditMenuPage, menuId)
  }

  editBeverage(beverageId){
    
    this.navCtrl.push(EditBeveragePage, beverageId )
  }

  openCloseRestaurant(openState) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: 'Please Wait...'
    });

    loading.present();

    this.httpprovider.openRest(this.RestId, openState).then(
      result => {
        loading.dismiss(); 
      },
      err => {
        console.log(err);
      }
      );
  }



  OpenRest(){
    console.log(this.toggleValue)

    if(this.toggleValue == false) {
      this.open = 0

      let prompt = this.alertCtrl.create({
        message: "Are you sure to close restaurant?",
        buttons: [
          {
            text: 'Cancel',
            role:'cancel',
            handler: data => {
              this.navCtrl.setRoot(MyRestaurantPage)
              console.log(this.toggleValue)
              console.log('Cancel clicked');
     
            }
          },
          {
            text: 'Confirm',
            handler: data => {

              this.openCloseRestaurant(this.open)
              this.navCtrl.pop
               let toast = this.toastCtrl.create({
          message:'Restaurant close' ,
          duration: 3000,
          position: 'bottom'
        });
        
        toast.present();
            }
          }
        ]
      });
      prompt.present();
    } else {
      this.open = 1
      let prompt = this.alertCtrl.create({
        message: "Are you sure to open restaurant?",
        buttons: [
          {
            text: 'Cancel',
            role:'cancel',
            handler: data => {
              this.navCtrl.setRoot(MyRestaurantPage)
              console.log(this.toggleValue)
              console.log('Cancel clicked');
    
            }
          },
          {
            text: 'Confirm',
            handler: data => {
              this.openCloseRestaurant(this.open)
              this.navCtrl.pop
              let toast = this.toastCtrl.create({
          message:'Restaurant open' ,
          duration: 3000,
          position: 'bottom'
        });
        
        toast.present();

            }
          }
        ]
      });
      prompt.present();
    }

   }

   share(){
     this.socialSharing.shareViaFacebook(this.message, this.image, this.url).then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
   }
 
}
