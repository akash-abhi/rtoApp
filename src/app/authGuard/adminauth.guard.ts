import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminauthGuard implements CanActivate {

  constructor(private adminService: AdminService, private router: Router) {}

  canActivate() {
    if (this.adminService.isAdminLoggedIn) {
      return true;
    }
    this.router.navigateByUrl('login');
    return false;
  }
}
