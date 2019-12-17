import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProfileService{
  constructor(private http: Http){ }
  headers = new Headers({'Content-Type':'application/json'});
  profile(){
    return this.http.get('/userProfile', {headers:this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
