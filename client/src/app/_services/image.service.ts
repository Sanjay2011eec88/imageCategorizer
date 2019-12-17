import {EventEmitter, Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx'
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageService{

  categorySelected = new EventEmitter<string>();

  constructor(private http: Http){ }
  headers = new Headers({'Content-Type':'application/json'});
  createCategory(category){
    return this.http.post('/add-category', JSON.stringify(category), {headers:this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getListOfImagesBasedOnTags(tagList){
    return this.http.post('/imageList', tagList, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getTags(){
    return this.http.get('/imageTags',{headers:this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()))
  }

  getCategories(){
    return this.http.get('/add-category', {headers:this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getProducts(categoryId){
    return this.http.get('/category/'+categoryId, {headers:this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getProduct(productId){
    return this.http.get('/product/'+productId, {headers:this.headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
