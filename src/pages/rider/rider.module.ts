import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiderPage } from './rider';

@NgModule({
  declarations: [
    RiderPage,
  ],
  imports: [
    IonicPageModule.forChild(RiderPage),
  ],
})
export class RiderPageModule {}
