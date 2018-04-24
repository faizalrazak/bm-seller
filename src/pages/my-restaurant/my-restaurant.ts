import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  restaurants:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restaurants = 'menu'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRestaurantPage');
  }

}
