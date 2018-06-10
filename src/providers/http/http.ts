import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class HttpProvider {
  token: any;
  constructor(public http: Http) {
    console.log("Hello HttpProvider Provider");
  }

  createMenu(details, restaurantId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");

      this.http
        .post(
          "https://bigmomma.herokuapp.com/api/restaurant/"+restaurantId+"/mains",
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

  createBeverage(details, restaurantId) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");

      this.http
        .post(
          "https://bigmomma.herokuapp.com/api/restaurant/"+restaurantId+"/beverages" ,
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
        .get("https://bigmomma.herokuapp.com/api/restaurant-owner", {
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
        .get("https://bigmomma.herokuapp.com/api/restaurant", {
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
        "https://bigmomma.herokuapp.com/api/categories"
      )
      .map(res => res.json());
  }

getCategoryMain() {
    return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/main-types"
      )
      .map(res => res.json());
  }

  getCategoryBev() {
    return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/beverage-types"
      )
      .map(res => res.json());
  }

   getAddOn() {
    return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/add-ons"
      )
      .map(res => res.json());
  }

updateRestInfo(name, location, opening_hour, closing_hour, unit_no, address,  restaurantId) {
    console.log(restaurantId)
    let data = {
      name:name,
      location: location,
      unit_no: unit_no,
      address: address,
      opening_hour: opening_hour,
      closing_hour: closing_hour
    };
    return new Promise((resolve, reject) => {
      
      this.http
        .put(
          "https://bigmomma.herokuapp.com/api/restaurant/"+restaurantId+"",
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

  getMains(restaurantId) {
    return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/restaurant/"+restaurantId+"/mains"
      )
      .map(res => res.json());
  }

  getBeverages(restaurantId) {
    return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/restaurant/"+restaurantId+"/beverages"
      )
      .map(res => res.json());
  }

  // myRider(restaurantId) {
  //   return this.http
  //     .get(
  //       "https://bigmomma.herokuapp.com/api/restaurant/"+restaurantId+"/riders"
  //     )
  //     .map(res => res.json());
  // }

  registerUser(details) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      console.log(details);
      this.http
        .post(
          "https://bigmomma.herokuapp.com/api/user/register",
          JSON.stringify(details),
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
          "https://bigmomma.herokuapp.com/api/seller/login",
          JSON.stringify(details),
          { headers: headers }
        )
        .subscribe(
          res => {
            let data = res.json();
            this.token = data.token;
            console.log(this.token);
            window.localStorage.setItem("token", this.token);
            console.log(window.localStorage);
            resolve(data);

            resolve(res.json());
          },
          err => {
            reject(err);
          }
        );
    });
  }

  OpenCloseRest(open) {
    let data = {
      restaurant_id: "1",
      restOpen: open
    };

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      this.http
        .post("http://bigmomma.herokuapp.com/api/restaurant/edit?id=1", data, {
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
}
