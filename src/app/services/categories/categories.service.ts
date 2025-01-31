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

}
