import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CurrentOrderDetailPage } from './current-order-detail';

@NgModule({
  declarations: [
    CurrentOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CurrentOrderDetailPage),
  ],
})
export class CurrentOrderDetailPageModule {}
