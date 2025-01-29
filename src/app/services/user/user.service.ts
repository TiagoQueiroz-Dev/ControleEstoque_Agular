import { AuthResponse } from './../../models/Interfaces/users/Auth/AuthResponse';
//import { SignupUserResponse } from './../../models/Interfaces/users/SignupUserResponse';
import { environment } from './../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/Interfaces/users/Auth/AuthRequest';
import { SignupUserResponse } from 'src/app/models/Interfaces/users/SignupUserResponse';
import { SignupUserRequest } from 'src/app/models/Interfaces/users/SignUserRequest';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookieService: CookieService){}

  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse>{
    return this.http.post<SignupUserResponse>(`${this.API_URL}/user`,requestDatas);
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`,requestDatas);
  }

  verifyUserLogin(): boolean{
    if (!this.cookieService.get('TOKEN_INFO')) {
      return false;
    } else{
      return true;
    }
  }

}
