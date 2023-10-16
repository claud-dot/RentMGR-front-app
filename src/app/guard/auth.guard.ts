import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Vérifiez l'authentification de l'utilisateur (par exemple, vérifiez si l'utilisateur est stocké dans le localStorage ou utilisez un service d'authentification)
    const currentUser = localStorage.getItem('current-user'); // Vous pouvez personnaliser cette vérification

    if (currentUser) {
      return true; // Autorisez l'accès si l'utilisateur est connecté
    } else {
      this.router.navigate(['/auth']); 
      return false;
    }
  }
}
