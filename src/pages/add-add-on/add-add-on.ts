import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the AddAddOnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-add-on',
  templateUrl: 'add-add-on.html',
})
export class AddAddOnPage {
	input= {
	  
	  name:'',
	  price:'',
  };
  restID:any

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public httpprovider: HttpProvider, 
  	) {
  	this.restID = this.navParams.get('restID');
    console.log(this.restID)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAddOnPage');
  }

  addAddOn(){
  	let data = {
  		restaurant_id:this.restID,
       	name: this.input.name,
       	price:this.input.price,
  	}
console.log(data)
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.httpprovider.addMenuAddOn(data).then(
      result => {
        console.log(result)
        let toast = this.toastCtrl.create({
          message: 'New menu add on added',
            duration: 3000,
          position: 'bottom'
        });
        loading.dismiss();
        toast.present()
        this.navCtrl.pop()
      },
      err => {
        console.log(err);
      });
   }
  }


