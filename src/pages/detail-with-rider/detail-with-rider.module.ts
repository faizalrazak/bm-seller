import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailWithRiderPage } from './detail-with-rider';

@NgModule({
  declarations: [
    DetailWithRiderPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailWithRiderPage),
  ],
})
export class DetailWithRiderPageModule {}
