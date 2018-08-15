import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	restJobInfo:any;
	todayTotalJob:any;
  	todayEarning:any;
  constructor(
  	public navCtrl: NavController, 
  	public httpprovider:HttpProvider,
  	public loadingCtrl: LoadingController,
  	) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    let loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Please Wait...'
  });

  loading.present();

     this.httpprovider.restJob().then(
     (response) => {
       console.log(response)
        this.restJobInfo=response

       if(this.restJobInfo != null){
        this.todayTotalJob=this.restJobInfo.today_total_job
        console.log(this.todayTotalJob)
        this.todayEarning=this.restJobInfo.today_earning
        }

       
         loading.dismiss();

        
     },
     err => {
       console.log(err);
     },
   );
  
  }
}
