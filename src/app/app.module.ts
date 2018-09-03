import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';
import moment from 'moment';
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
import { EditBeveragePage } from '../pages/edit-beverage/edit-beverage';
import { MapsPage } from '../pages/maps/maps'
import { CurrentOrderDetailPage } from '../pages/current-order-detail/current-order-detail';
import { AddMenuPage } from '../pages/add-menu/add-menu';
import { LoginSignUpPage } from '../pages/login-sign-up/login-sign-up';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';
import { DetailWithRiderPage } from '../pages/detail-with-rider/detail-with-rider';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { NotificationsPage } from '../pages/notifications/notifications';
import { LoginPage } from '../pages/login/login';
import { AddBeveragesPage } from '../pages/add-beverages/add-beverages';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { VerificationPage } from '../pages/verification/verification';
import { VerificationCodePage } from '../pages/verification-code/verification-code';
import { RegisterRestaurantPage } from '../pages/register-restaurant/register-restaurant';
import { NewRiderPage } from '../pages/new-rider/new-rider';
import{ ForgotPage } from '../pages/forgot/forgot'
import{ AddAddOnPage } from '../pages/add-add-on/add-add-on'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OrderPage } from '../pages/order/order'
import { MyRestaurantPage } from '../pages/my-restaurant/my-restaurant';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { ProfilePage } from '../pages/profile/profile';
import { HttpProvider } from '../providers/http/http';
import { HttpModule } from '@angular/http';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ComponentsModule } from '../components/components.module';
import { Camera } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';

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
    EditMenuPage,
    EditBeveragePage,
    CurrentOrderDetailPage,
    AddMenuPage,
    LoginSignUpPage,
    AboutUsPage,
    PrivacyPolicyPage,
    TermsConditionsPage,
    DetailWithRiderPage,
    EditProfilePage,
    NotificationsPage,
    LoginPage,
    AddBeveragesPage,
    SignUpPage,
    VerificationPage,
    VerificationCodePage,
    RegisterRestaurantPage,
    NewRiderPage,
    ForgotPage,
    AddAddOnPage,
    MapsPage
    
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ionic2RatingModule,
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
    EditMenuPage,
    EditBeveragePage,
    CurrentOrderDetailPage,
    AddMenuPage,
    LoginSignUpPage,
    AboutUsPage,
    PrivacyPolicyPage,
    TermsConditionsPage,
    DetailWithRiderPage,
    EditProfilePage,
    NotificationsPage,
    LoginPage,
    AddBeveragesPage,
    SignUpPage,
    VerificationPage,
    VerificationCodePage,
    RegisterRestaurantPage,
    NewRiderPage,
    ForgotPage,
    AddAddOnPage,
    MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    Camera,
    Facebook,
    NativeStorage,
    GooglePlus,
    SocialSharing,
    InAppBrowser,
    LocalNotifications,
    
  ]
})
export class AppModule {}
