import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

	@ViewChild('map') mapElement;
	map:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.initMap();
    console.log('ionViewDidLoad MapsPage');
  }

  initMap(){
  	let latlong = new google.maps.LatLng(-34.9290,138.6010);

  	let mapOptions = {
  		center:latlong,
  		zoom: 15,
  		mapTypeId: google.maps.MapTypeId.ROADMAP

  	};

  	this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
  }

}
