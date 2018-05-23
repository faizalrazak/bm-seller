import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';
import { CurrentOrderDetailPage } from '../current-order-detail/current-order-detail';


@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  orders:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.orders = 'current'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  pastDetail(){
    this.navCtrl.push(OrderDetailPage)
  }

  currentDetail(){
    this.navCtrl.push(CurrentOrderDetailPage)
  }

  

}
