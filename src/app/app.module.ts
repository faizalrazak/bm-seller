import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderPage } from '../pages/order/order'
import { MyRestaurantPage } from '../pages/my-restaurant/my-restaurant';
import { ProfilePage } from '../pages/profile/profile';
import { HttpProvider } from '../providers/http/http';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OrderPage,
    MyRestaurantPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OrderPage,
    MyRestaurantPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {}
