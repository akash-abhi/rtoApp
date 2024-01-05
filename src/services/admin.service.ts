import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  isAdminLoggedIn: boolean = false;
  currentAdminUserData: any;

  constructor() {}
}
