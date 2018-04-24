import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRestaurantPage } from './my-restaurant';

@NgModule({
  declarations: [
    MyRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRestaurantPage),
  ],
})
export class MyRestaurantPageModule {}
