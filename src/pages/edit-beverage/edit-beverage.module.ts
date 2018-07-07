import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditBeveragePage } from './edit-beverage';

@NgModule({
  declarations: [
    EditBeveragePage,
  ],
  imports: [
    IonicPageModule.forChild(EditBeveragePage),
  ],
})
export class EditBeveragePageModule {}
