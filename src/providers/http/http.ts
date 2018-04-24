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

  getExpenseActivity(months){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjYsImlzcyI6Imh0dHA6Ly9wb2QtYXBpLW1kci5oZXJva3VhcHAuY29tL2FwaS9sb2dpbiIsImlhdCI6MTUyNDQ1Njg2NywiZXhwIjoxNTYwNDU2ODY3LCJuYmYiOjE1MjQ0NTY4NjcsImp0aSI6IjRTdFBWemdCR3BNbmhPeFkifQ.lKMeP19olNQW3LTfkQKQp_mHe_xaagzAQM2W5Ch6tSk');
      console.log('token')
      
  
      this.http.get('https://pod-api-mdr.herokuapp.com/api/expense/user/m'+months, {headers: headers})
        .map(
          res => res.json())
        .subscribe(
          data => {
            resolve(data.data);
            console.log('data')
        }, (err) => {
          reject(err);
        });
    });
  }

}
