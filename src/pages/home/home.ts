import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  months:any;
  expenses:any;
  index:any;
  
  constructor(public navCtrl: NavController, public httpprovider:HttpProvider) {
    this.months = 'april';
    
  }

  ionViewDidEnter(){

    let months = new Date().getMonth()+1;

    this.slides.slideTo(months - 1, 1000);

    this.httpprovider.getExpenseActivity(months).then(
      (response) => {
        console.log(response)
        this.expenses = response
      },
      err => {
        console.log(err);
      },
    );
  }

  onTap(){
    console.log(this.slides.clickedIndex - 1 )

    this.index = this.slides.clickedIndex - 1

    this.httpprovider.getExpenseActivity(this.slides.clickedIndex - 1 ).then(
      (response) => {
        console.log(response)
        this.expenses = response
        this.slides.slideTo(this.slides.clickedIndex - 2, 1000);
      },
      err => {
        console.log(err);
      },
    );

  }
}
