import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from '../model/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}


  //---------------------------------Creaing product from database--------------------------------
  createProduct(products: { pName: string; desc: string; price: number }) {
    console.log(products);
     const Headers = new HttpHeaders({"myheaders" : "Veeresh"});
     this.http.post<{name : string}>("https://procadamy-default-rtdb.firebaseio.com/product.json", 
     products, {headers: Headers}).
     subscribe((data)=> {
      console.log(data) 
     });
  }

  //---------------------------------fetching product from database--------------------------------
  fetchProduct() {
    return this.http.get<{[key: string]: Product}>("https://procadamy-default-rtdb.firebaseio.com/product.json")
    .pipe(map((res)=> {
      const products = [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id : key})
        }
      }
      return products; 
    }))
  }
 
  //----------------------------------Deleting product from database-------------------------------
  deleteProduct(id: string) {
     this.http.delete("https://procadamy-default-rtdb.firebaseio.com/product/"+id+".json").subscribe()

  }

  //---------------------------------Deleting All product from database-----------------------------
  deleteAllProduct(){
     this.http.delete("https://procadamy-default-rtdb.firebaseio.com/product.json").subscribe()
  }

  //---------------------------------Edit product from database-----------------------------
  
  updateProduct(id:string, value:Product){
    this.http.put("https://procadamy-default-rtdb.firebaseio.com/product/"+id+".json", value).subscribe();
  }

}
