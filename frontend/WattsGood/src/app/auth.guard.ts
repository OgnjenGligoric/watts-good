import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Role} from "./model/User";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles: Role[] = route.data['roles'] || [];
    const activeNotRequired: boolean = route.data['activeNotRequired'] || false;

    if (this.authService.isAuthenticated() && (this.authService.isActive() || activeNotRequired)) {
      return requiredRoles.length === 0 || this.checkRole(this.authService.getRole() || Role.User, requiredRoles);
    } else {
      this.authService.logout();
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

  private checkRole(userRole: Role, roles: Role[]): boolean {
    return roles.includes(userRole);
  }
}
