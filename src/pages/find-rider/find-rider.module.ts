import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindRiderPage } from './find-rider';

@NgModule({
  declarations: [
    FindRiderPage,
  ],
  imports: [
    IonicPageModule.forChild(FindRiderPage),
  ],
})
export class FindRiderPageModule {}
