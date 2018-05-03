import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RiderPage } from '../pages/rider/rider';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { FindRiderPage } from '../pages/find-rider/find-rider';
import { MessageRoomPage } from '../pages/message-room/message-room';
import { EditRestaurantPage } from '../pages/edit-restaurant/edit-restaurant';
import { EditMenuPage } from '../pages/edit-menu/edit-menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderPage } from '../pages/order/order'
import { MyRestaurantPage } from '../pages/my-restaurant/my-restaurant';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { ProfilePage } from '../pages/profile/profile';
import { HttpProvider } from '../providers/http/http';
import { HttpModule } from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OrderPage,
    MyRestaurantPage,
    ProfilePage,
    SubscriptionPage,
    RiderPage,
    CheckoutPage,
    OrderDetailPage,
    FindRiderPage,
    MessageRoomPage,
    EditRestaurantPage,
    EditMenuPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OrderPage,
    MyRestaurantPage,
    ProfilePage,
    SubscriptionPage,
    RiderPage,
    CheckoutPage,
    OrderDetailPage,
    FindRiderPage,
    MessageRoomPage,
    EditRestaurantPage,
    EditMenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {}
