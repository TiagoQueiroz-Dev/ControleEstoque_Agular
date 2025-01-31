import { addProductRequest } from './../../models/Interfaces/products/request/addProductRequest';
import { GetAllProductsResponse } from './../../models/Interfaces/products/response/GetAllProductsResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { editProductRequest } from 'src/app/models/Interfaces/products/request/editProductRequest';
import { addProductResponse } from 'src/app/models/Interfaces/products/response/addProductResponse';
import { deleteProductResponse } from 'src/app/models/Interfaces/products/response/DeleteProductsResponse';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

   private API_URL = environment.API_URL;
   private JWT_TOKEN = this.cookieService.get('TOKEN_INFO');
   //estou pass
   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
   }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  GetAllProducts(): Observable<Array<GetAllProductsResponse>>{

    return this.http.get<Array<GetAllProductsResponse>>(`${this.API_URL}/products`,this.httpOptions).pipe(map((a) => a.filter((b) => b?.amount > 0)));
  }
  DeleteProduct(id: string): Observable<deleteProductResponse>{
    return this.http.delete<deleteProductResponse>(`${this.API_URL}/product/delete`,{...this.httpOptions,params: {product_id: id}})
  }

  PostProduct(requestDatas: addProductRequest): Observable<addProductResponse>{
      return this.http.post<addProductResponse>(`${this.API_URL}/product`,requestDatas,this.httpOptions);
  }

  PutProduct(requestDatas: editProductRequest): Observable<void>{
    return this.http.put<void>(`${this.API_URL}/product/edit`,requestDatas, this.httpOptions);
  }



}
