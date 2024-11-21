import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotFoundGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Lógica simple para redirigir siempre a la página 404
    this.router.navigate(['/error']);
    return false; // Bloquea la navegación original
  }
}
