import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Events } from "ionic-angular";
import "rxjs/add/operator/map";

@Injectable()
export class HttpProvider {
  token: any;
  profile:any;
  email:any;
  constructor(
    public http: Http,
    public event:Events
    ) {
    console.log("Hello HttpProvider Provider");
  }

  createMenu(food, restaurantId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");

      this.http
        .post(
          "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/mains",
          JSON.stringify(food),
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res;
            console.log(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  createBeverage(details, restaurantId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");

      this.http
        .post(
          "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/beverages" ,
          JSON.stringify(details),
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res;
            console.log(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getOwnerInfo(){
   return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("token")
      );

      this.http
        .get("http://api.bigmomma.com.my/api/restaurant-owner", {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.data);
            console.log("data");
          },
          err => {
            reject(err);
          }
        );
    });
}

getRestaurantInfo(){
   return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("token")
      );
      console.log(headers)
      this.http
        .get("http://api.bigmomma.com.my/api/restaurant", {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.data);
            console.log("data");
          },
          err => {
            console.log(err)
            reject(err);
          }
        );
    });
}

getCategoryRest() {
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/categories"
      )
      .map(res => res.json());
  }

getCategoryMain() {
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/main-types"
      )
      .map(res => res.json());
  }

  getCategoryBev() {
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/beverage-types"
      )
      .map(res => res.json());
  }

   getAddOn() {
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/add-ons"
      )
      .map(res => res.json());
  }

  editRest(name,address,ssmNo,about,restaurantId,ssmImg,icImg,holdImg,restImg,unitNo,close,
    open,location){
    let data = {
      name:name,
      address: address,
      ssm_reg_no: ssmNo,
      about:about,
      ssm_verifcation_image:ssmImg,
      ic_image:icImg,
      user_ic_image:holdImg,
      restaurant_image:restImg,
      unit_no:unitNo,
      opening_hour:open,
      closing_hour:close,
      location:location
      
    };
    return new Promise((resolve, reject) => {
      
      this.http
        .put(
          "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"",
          data,
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log("data");
            resolve(data);
          },
          err => {
            console.log(err)
            reject(err);
          }
        );
    });

  }

  editProfile(userName,userEmail,userPhone){
     let data = {
      name:userName,
      email: userEmail,
      phone_number: userPhone,
    };
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("token")
      );
      
      this.http
        .put(
          "http://api.bigmomma.com.my/api/user",
          data, { headers: headers }
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log("data");
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });

  }

updateRestInfo(name, location, opening_hour, closing_hour, unit_no, address, 
  category, restaurantId, restAbout,restImg) {
    console.log(restaurantId)
    let data = {
      name:name,
      location: location,
      unit_no: unit_no,
      address: address,
      category_id:category,
      opening_hour: opening_hour,
      closing_hour: closing_hour,
      about: restAbout,
      restaurant_image: restImg
    };
    console.log(data)
    return new Promise((resolve, reject) => {
      
      this.http
        .put(
          "http://api.bigmomma.com.my/api/restaurant/"+restaurantId,
          data,
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getMains(restaurantId) {
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/mains"
      )
      .map(res => res.json());
  }

  showMains(restaurantId, mainsId){
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/mains/"+mainsId
      )
      .map(res => res.json());
  }

  updateMainsInfo(name, price, mainsId,  restaurantId, mainImg, mainSold, cat) {
    console.log(restaurantId)
    let data = {
      name:name,
      price:price,
      food_image:mainImg,
      sold:mainSold,
      categories:cat
      };
      console.log(data)
    return new Promise((resolve, reject) => {
      
      this.http
        .put(
          "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/mains/"+mainsId,
          data,
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log("data");
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getBeverages(restaurantId) {
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/beverages"
      )
      .map(res => res.json());
  }

  showBeverages(restaurantId, beveragesId){
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/beverages/"+beveragesId
      )
      .map(res => res.json());
  }

  updateBeveragesInfo(name, price, beveragesId,  restaurantId, bevImg, bevSold, cat) {
    console.log(restaurantId)
    let data = {
      name:name,
      price:price,
      drink_image:bevImg,
      sold:bevSold,
      categories:cat

      };
      console.log(data)
    return new Promise((resolve, reject) => {
      
      this.http
        .put(
          "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/beverages/"+beveragesId,data,
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log("data");
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  myRider(restaurantId) {
    console.log(restaurantId)
    return this.http
      .get(
        "http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/riders"
      )
      .map(res => res.json());
  }

  addRider(details,restId){
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");

      this.http
        .post(
          "http://api.bigmomma.com.my/api/restaurant/"+restId+"/rider",
          JSON.stringify(details),
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res;
            console.log(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });

  }

  registerUser(details) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
console.log("email"+details.email)
console.log("password"+details.password)
console.log("name"+details.name)
      let data = {
        email: details.email,
        password: details.password,
        name: details.name,
        category: "2",
        phone_number: "Your phone number"
      }
      console.log(data);
      console.log(data.email);
      this.email=data.email
            window.localStorage.setItem("email", this.email)
            console.log(this.email)
      this.http
        .post(
          "http://api.bigmomma.com.my/api/user/register",
          JSON.stringify(data),
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  registerRestaurant(details) {
    return new Promise((resolve, reject) => {
       let headers = new Headers();
      headers.append(
        "Authorization",
        "Bearer " + window.localStorage.getItem("token")
      );
      console.log(window.localStorage.getItem("token"));
      console.log(details)
      this.http
        .post(
          "http://api.bigmomma.com.my/api/restaurant",
          details,
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res.json();
            console.log(data);
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  loginUser(details) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      console.log(details);
      this.http
        .post(
          "http://api.bigmomma.com.my/api/seller/login",
          JSON.stringify(details),
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res.json();
            this.token = data.token;
            console.log(this.token);
            this.profile=data.profile.name
            console.log(this.profile)
            window.localStorage.setItem("token", this.token);
            window.localStorage.setItem("profile", this.profile)
            console.log(window.localStorage);

            this.event.publish('username:changed', this.profile)
            this.event.publish('token:changed', this.token)
            resolve(data);

            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  openRest(restaurantId, open) {
    console.log(restaurantId)
    console.log(open)
    let data = {
      open:open
    };
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      this.http
        .put("http://api.bigmomma.com.my/api/restaurant/"+restaurantId+"/open", data, {
          headers: headers
        })
        .subscribe(
          res => {
            let data = res.json();
            console.log("data");
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  sendCode(code) {
    return new Promise((resolve, reject) => {
      let data = {
        code : code
      }

      console.log(data);
      this.http
        .put(
          "http://api.bigmomma.com.my/api/user/verify",data
        )
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data.response);
            console.log(data.status);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getCurrentOrders(){
    
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + window.localStorage.getItem("token"));
    return this.http.get("http://api.bigmomma.com.my/api/restaurant/current-order", { headers: headers }).map(res => res.json());
  }

  getCartItems(id){
    return this.http.get("http://api.bigmomma.com.my/api/cart/"+id+"/items").map(res => res.json());
  }
}
