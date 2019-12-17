import { Injectable } from '@angular/core';
import { Headers, Response} from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Http} from "@angular/http";
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http,
    private router: Router,) { }
  headers = new Headers({'Content-Type':'application/json'});

  login(username: string, password: string){
    return this.http.post('/userLogin',  { email: username, password: password }, {headers:this.headers})
      .map((user: Response) => {
        user.json();
        return user;
    })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  logout(){
    return this.http.get('/userLogout', {headers:this.headers})
      .map((response: Response) => {
        response.json();
    })
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
