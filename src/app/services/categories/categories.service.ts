import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { Observable } from 'rxjs';
import { categoriesResponse } from 'src/app/models/Interfaces/categories/response/categoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('TOKEN_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.JWT_TOKEN}`
        })
  }

  getAllCategories(): Observable<Array<categoriesResponse>>{
    return this.http.get<Array<categoriesResponse>>(`${this.API_URL}/categories`,this.httpOptions);
  }

  deleteCategories(requestData: {category_id: string}): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/category/delete`,{...this.httpOptions, params: {category_id: requestData?.category_id}})
  }

  postNewCategory(requestData: {name: string}): Observable<Array<categoriesResponse>>{
    return this.http.post<Array<categoriesResponse>>(`${this.API_URL}/category`, requestData, this.httpOptions);
  }

  putCategory(requestData: {name: string, category_id: string}): Observable<void>{
    return this.http.put<void>(`${this.API_URL}/category/edit`, {name: requestData?.name},{...this.httpOptions, params:{category_id: requestData?.category_id}})
  }

}
