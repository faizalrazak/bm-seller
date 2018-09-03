import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAddOnPage } from './add-add-on';

@NgModule({
  declarations: [
    AddAddOnPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAddOnPage),
  ],
})
export class AddAddOnPageModule {}
