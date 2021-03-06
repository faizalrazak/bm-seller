import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SocialSharing } from '@ionic-native/social-sharing';
import moment from 'moment';
import { EditRestaurantPage } from '../edit-restaurant/edit-restaurant';
import { EditMenuPage } from '../edit-menu/edit-menu';
import { EditBeveragePage } from '../edit-beverage/edit-beverage';
import { AddMenuPage } from '../add-menu/add-menu';
import { AddBeveragesPage } from '../add-beverages/add-beverages';
import { RegisterRestaurantPage } from '../register-restaurant/register-restaurant';
import{ SocialSharingPage } from '../social-sharing/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

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

  quotes :any;
  hideMe:any;
  expiredDate:any;
  dateTo:any;
  dateFrom:any;
  notiDate:any;

  sharingData:any;
  state: boolean = false;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public httpprovider: HttpProvider, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private http:Http,
    private socialSharing: SocialSharing,
    private localNotifications: LocalNotifications,
    private screenshot: Screenshot
    ) {
    this.restaurants = 'menu' 
  }

  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();

     this.httpprovider.getRestaurantInfo().then(
     (response) => {
       console.log(response)
       this.restaurantInfo=response
        if(this.restaurantInfo != null){
        
        this.RestId=this.restaurantInfo.data.id
        this.restImage=this.imageLink+this.restaurantInfo.data.restaurant_image
        this.RestName=this.restaurantInfo.data.name
        this.restCategory=this.restaurantInfo.data.category
        this.RestOpenHour=this.restaurantInfo.data.opening_hour
        this.RestCloseHour=this.restaurantInfo.data.closing_hour
        this.open=this.restaurantInfo.data.open
        this.expiredDate=this.restaurantInfo.data.expiry_date
        console.log(this.expiredDate)

        this.dateTo = this.expiredDate
        console.log(this.dateTo)
        this.dateFrom = moment(this.dateTo).subtract(3,'d').format('YYYY-MM-DD');
        console.log(this.dateFrom)
        this.notiDate=moment(this.dateFrom)
        console.log(this.notiDate)
        
        

        if(moment().format('YYYY-MM-DD')==this.notiDate._i){

          this.localNotifications.schedule({
          
          id: 1,
          title: "Hey, your subscription have 3 days before expired!",
          text: "Please renew your subscription fee in 3 days",
        });

        }
         console.log(moment().format('YYYY-MM-DD'))
         console.log(this.notiDate._i)

           if(moment().format('YYYY-MM-DD')==this.dateTo){

          this.localNotifications.schedule({
          
          id: 2,
          title: "Hey, your subscription plan already expired!",
          text: "Please renew your subscription fee",
        });

        }
        console.log(moment().format('YYYY-MM-DD'))
        console.log(this.dateTo)


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
   }
   );  
   }
    loading.dismiss();

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

  reset() {
    var self = this;
    setTimeout(function(){ 
      self.state = false;
    }, 1000);
  }

  goToMediaSocial() {
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();

      this.screenshot.URI(80).then((result) => {
        console.log(result)
      this.sharingData=result.URI
        console.log(this.sharingData)
      this.state = true;
      this.reset();
      loading.dismiss();
  // Success!
  // (message, subject, file, url)
    this.socialSharing.share("Earn more with Bigmomma Seller Apps", " ",this.sharingData, "https://play.google.com/store/apps/details?id=com.mdr.sellerbm").
then(() => {
  loading.dismiss();
  // Success!


}).catch(() => {
// Error!
let toast = this.toastCtrl.create({
                    message: 'Sharing failed',
                     duration: 3000,
                    position: 'bottom'
                  });
          toast.present()
          loading.dismiss();
});


}).catch(() => {
// Error!
let toast = this.toastCtrl.create({
                    message: 'Sharing failed',
                     duration: 3000,
                    position: 'bottom'
                  });
          toast.present()
          loading.dismiss();

});
 }

 

  presentProfileModal() {
    this.navCtrl.push(EditRestaurantPage)
 }

 addMenuModal() {
   this.navCtrl.push(AddMenuPage)
 }

 

 addBeverageModal() {
   this.navCtrl.push(AddBeveragesPage)
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

   setupRest(){
    this.navCtrl.push(RegisterRestaurantPage)

   }
 
}
