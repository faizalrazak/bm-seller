import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageRoomPage } from './message-room';

@NgModule({
  declarations: [
    MessageRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageRoomPage),
  ],
})
export class MessageRoomPageModule {}
