import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OrderPage } from '../pages/order/order';
import { MyRestaurantPage } from '../pages/my-restaurant/my-restaurant';
import { ProfilePage } from '../pages/profile/profile';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { LoginSignUpPage } from '../pages/login-sign-up/login-sign-up';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';
import { NotificationsPage } from '../pages/notifications/notifications';






@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Restaurant', component: MyRestaurantPage },
      { title: 'Orders', component: OrderPage },
      { title: 'Subscription', component: SubscriptionPage },
      // { title: 'Profile', component: ProfilePage }, 
      { title: 'Notification', component: NotificationsPage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Privacy Policy', component: PrivacyPolicyPage },
      { title: 'Term and Conditions', component: TermsConditionsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openProfile() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(ProfilePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  loginSignUp(){
    this.nav.setRoot(LoginSignUpPage);

  }
}
