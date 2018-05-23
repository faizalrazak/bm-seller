import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBeveragesPage } from './add-beverages';

@NgModule({
  declarations: [
    AddBeveragesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBeveragesPage),
  ],
})
export class AddBeveragesPageModule {}
