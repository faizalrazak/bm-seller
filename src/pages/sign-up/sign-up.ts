import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { HttpProvider } from "../../providers/http/http";
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  fbProfile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: Facebook,
    public http: HttpProvider,
    public toastCtrl:ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignUpPage");
  }

  facebookLogin() {
    this.fb
      .login(["public_profile", "user_friends", "email"])
      .then((res: FacebookLoginResponse) => {
        this.fb
          .api("me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)",[]).then(
            profile => {
              this.fbProfile = {
                email: profile["email"],
                password: profile["id"],
                first_name: profile["first_name"],
                picture: profile["picture"]["data"]["url"],
                name: profile["name"]
                
              }

              let data = {
                email: this.fbProfile.email,
                password: this.fbProfile.password,
                name: this.fbProfile.name,
                category: "2",
                phone_number: "0197397343"
              };

              this.http.registerFbUser(data).then(
                result => {
                  console.log(result)
                  let toast = this.toastCtrl.create({
                    message: 'Email already exists',
                     duration: 3000,
                    position: 'bottom'
                  });
    
                  toast.present()
                },
                err => {
                  console.log(err);
                }
              );
          });
      })
      .catch(e => console.log("Error logging into Facebook", e));
  }

  fbRegisterUser(){
    
  }
}
