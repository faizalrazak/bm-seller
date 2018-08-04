import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRiderPage } from './new-rider';

@NgModule({
  declarations: [
    NewRiderPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRiderPage),
  ],
})
export class NewRiderPageModule {}
