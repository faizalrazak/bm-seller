import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  mains:any;
  beverages:any;
  restaurants:any;
  checked:any;

   restaurant = {
    
    open: "",
    id:""
   
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public httpprovider: HttpProvider, public loadingCtrl: LoadingController) {
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

    this.httpprovider.getBeverages().subscribe(
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
   
    this.httpprovider.getMains().subscribe(
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
  }

  editRestaurant(){
    this.navCtrl.push(EditRestaurantPage)
  }

  editMenu(){
    this.navCtrl.push(EditMenuPage)
  }

  addMenu(){
    this.navCtrl.push(AddMenuPage)
  }

  addBeverages(){
    this.navCtrl.push(AddBeveragesPage)
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
