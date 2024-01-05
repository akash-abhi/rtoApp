import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate() {
    if (this.auth.isLoggedIn) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }
}
