import { Injectable } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private userService: UserService) { }

  isLoggedIn(){

    if(this.userService.isLoggedIn){
      return true;
    }
    return false;
  }
}
 