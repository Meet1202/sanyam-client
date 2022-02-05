import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router){}
  
  canActivate(): boolean {
    if (!localStorage.getItem('key')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  
}
