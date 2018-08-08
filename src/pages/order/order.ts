import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';
import { CurrentOrderDetailPage } from '../current-order-detail/current-order-detail';
import { HttpProvider } from '../../providers/http/http'

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  orders:any;
  currentOrders;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpProvider, public loading:LoadingController) {
    this.orders = 'current'
  }

  ionViewDidLoad() {
    this.http.getCurrentOrders().subscribe(
      response => {
        this.currentOrders=response.data
        console.log(this.currentOrders)
      },err => {
        console.log(err);
      });
  }

  orderDetail(order){
    this.navCtrl.push(OrderDetailPage, order)
  }

  pastDetail(){
    this.navCtrl.push(CurrentOrderDetailPage)
  }

  

}
