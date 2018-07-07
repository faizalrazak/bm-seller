import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterRestaurantPage } from './register-restaurant';

@NgModule({
  declarations: [
    RegisterRestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterRestaurantPage),
  ],
})
export class RegisterRestaurantPageModule {}
