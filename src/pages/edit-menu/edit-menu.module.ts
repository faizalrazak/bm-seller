import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMenuPage } from './edit-menu';

@NgModule({
  declarations: [
    EditMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMenuPage),
  ],
})
export class EditMenuPageModule {}
