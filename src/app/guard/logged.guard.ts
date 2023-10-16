import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('current-user');
    if (currentUser) {
      this.router.navigate(['/']); 
      return false; 
    }
    return true; 
  }
}
