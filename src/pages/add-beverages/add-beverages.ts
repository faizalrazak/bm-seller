import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

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
	input= {
   rest_id:'',
  name:'',
  price:'',
  drink_image:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	public httpprovider: HttpProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBeveragesPage');
  }

  addBeverageForm(){

   let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();
   
   let beverage = {
       restaurant_id:"1",
       name: this.input.name,
      price : this.input.price,
      drink_image:"test"
      }



  console.log(beverage);
  
  

     this.httpprovider.createBeverage(beverage).then((result) => {
     	 loading.dismiss();
      this.navCtrl.setRoot(MyRestaurantPage);    
     },
         (err) => {
         console.log(err);
     });
 }

}
