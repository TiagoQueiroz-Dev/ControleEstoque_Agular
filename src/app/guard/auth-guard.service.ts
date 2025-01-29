import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private userService: UserService, private router: Router) { }

  canActivate():boolean{
    if (!this.userService.verifyUserLogin()) {
      this.router.navigate(['/home']);
      return false;
    }
      this.userService.verifyUserLogin();
      return true;

  }
}
