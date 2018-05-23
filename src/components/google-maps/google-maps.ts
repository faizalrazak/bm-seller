import { Component } from '@angular/core';

/**
 * Generated class for the GoogleMapsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsComponent {

  text: string;

  constructor() {
    console.log('Hello GoogleMapsComponent Component');
    this.text = 'Hello World';
  }

}
