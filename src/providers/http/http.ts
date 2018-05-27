import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

 createMenu(details) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      
      headers.append("Content-Type", "application/json");
     
      this.http
        .post(
          "https://bigmomma.herokuapp.com/api/main/create",
          JSON.stringify(details), { headers: headers }
          
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

  createBeverage(details) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      
      headers.append("Content-Type", "application/json");
     
      this.http
        .post(
          "https://bigmomma.herokuapp.com/api/beverage/create",
          JSON.stringify(details), { headers: headers }
          
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

getMains() {
return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/restaurant/mains?restaurant_id=1"
      )
      .map(res => res.json());
  }

  getBeverages() {
return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/restaurant/beverages?restaurant_id=1"
      )
      .map(res => res.json());
  }

   myRider() {
return this.http
      .get(
        "https://bigmomma.herokuapp.com/api/restaurant/riders?restaurant_id=1"
      )
      .map(res => res.json());
  }

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

  // getUser() {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers();
  //     headers.append(
  //       "Authorization",
  //       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9iaWdtb21tYS5oZXJva3VhcHAuY29tL2FwaS9zZWxsZXIvbG9naW4iLCJpYXQiOjE1MjY5OTU2MDUsImV4cCI6MTU1ODUzMTYwNSwibmJmIjoxNTI2OTk1NjA1LCJqdGkiOiJLQ3VKbmphZ3diejUwYjdJIn0.k-PrQc_7sCNUJ99cv_AUkHWbBsOCLx5gJ_M8ZsiH4EM"
  //     );

  //     this.http
  //       .get("https://bigmomma.herokuapp.com/api/restaurant/details", {
  //         headers: headers
  //       })
  //       .map(res => res.json())
  //       .subscribe(
  //         data => {
  //           resolve(data.data);
  //           console.log("data");
  //         },
  //         err => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }

  // restaurantSetting(name, location, unit_no, address, operation_hours ) {
  //   let data = {
  //     rest_name: name,
  //     rest_location: location,
  //     rest_unitNo: unit_no,
  //     rest_address: address,
  //     rest_operationHour: operation_hours
  //   };
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers();
  //     headers.append(
  //       "Authorization",
  //       "Bearer " + window.localStorage.getItem("")
  //     );

     
  //     this.http
  //       .post(
  //         "http://bigmomma.herokuapp.com/api/restaurant/edit?id=1",
  //         data,
  //         { headers: headers }
  //       )
  //       .subscribe(
  //         res => {
  //           let data = res.json();
  //           console.log("data");
  //           resolve(data);
  //         },
  //         err => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }

  OpenCloseRest(open) {
    let data = {
      restaurant_id : "1",
      restOpen: open
    };

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      
      this.http
        .post(
          "http://bigmomma.herokuapp.com/api/restaurant/edit?id=1",
          data,
          { headers: headers }
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

}
