import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpProvider } from '../providers/http/http';


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
import { RegisterRestaurantPage } from '../pages/register-restaurant/register-restaurant';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDspITZuKbzr2G_xwED5_cJWz7eZ61fO2c",
  authDomain: "bigmomma-chat.firebaseapp.com",
  databaseURL: "https://bigmomma-chat.firebaseio.com",
  projectId: "bigmomma-chat",
  storageBucket: "bigmomma-chat.appspot.com",
  messagingSenderId: "44575375340"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  token:any;
  name:any;


  pages: Array<{title: string, component: any}>;
 
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public httpprovider: HttpProvider,
    public event:Events,
    private alertCtrl: AlertController,
    

    ) {
    
    event.subscribe('token:changed', token => {
        this.token = token
        console.log(this.token)
      })

      this.name = "Guest"
      event.subscribe('username:changed', username => {
        this.name = username
      })

     if(window.localStorage.getItem('token'))
    {
      this.rootPage = HomePage;
      this.name = window.localStorage.getItem('profile')

    }else{
      this.rootPage = LoginSignUpPage;
    }

    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'My Restaurant', component: MyRestaurantPage },
      { title: 'Orders', component: OrderPage },
      { title: 'Subscription', component: SubscriptionPage },
      { title: 'Notification', component: NotificationsPage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Privacy Policy', component: PrivacyPolicyPage },
      { title: 'Term and Conditions', component: TermsConditionsPage },
      // { title: 'Register Restaurant', component: RegisterRestaurantPage }, 

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    firebase.initializeApp(config);

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

  logout() {
  let alert = this.alertCtrl.create({
    title: 'Confirm logout',
    message: 'Are you sure to leave?',
    buttons: [
      {
        text: 'No',
        role: 'No',
        handler: () => {
           this.nav.popToRoot();
          console.log('No clicked');
      

        }
      },
      {
        text: 'Yes',
        role: 'Yes',
        handler: () => {
          let loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: 'Please Wait...'
          });

          loading.present();
          localStorage.removeItem("token");
          localStorage.removeItem("profile");
          localStorage.removeItem("firebase:host:bigmomma-chat.firebaseio.com");
          localStorage.removeItem("email");
          loading.dismiss();
          window.location.reload()
          

    
          console.log('Yes clicked');
        }
      }
    ]
  });
  alert.present();
  }
}
