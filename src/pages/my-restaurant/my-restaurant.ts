import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EditRestaurantPage } from '../edit-restaurant/edit-restaurant';
import { EditMenuPage } from '../edit-menu/edit-menu'
import { AddMenuPage } from '../add-menu/add-menu'

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
  checked:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.restaurants = 'menu'
    this.checked = 'true'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRestaurantPage');
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

}
