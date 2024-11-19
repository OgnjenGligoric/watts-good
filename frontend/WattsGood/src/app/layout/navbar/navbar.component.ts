import {ChangeDetectorRef, Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive } from "@angular/router";
import {CommonModule} from '@angular/common';
import {AuthService} from "../../service/auth.service";
import {Role} from "../../model/User";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router, private authService:AuthService, private cdr: ChangeDetectorRef) {
  }
  empty_storage(){
    localStorage.clear()
    this.router.navigate(["/sign-in"]);
  }

  is_Admin(){
    return this.authService.getRole()===Role.Admin || this.is_SuperAdmin();
  }

  is_User(){
    return this.authService.getRole()===Role.User;
  }

  is_SuperAdmin(){
    return this.authService.getRole()===Role.SuperAdmin;
  }

  is_Official(){
    return this.authService.getRole()===Role.Official;
  }

  is_Authenticated(){
    return this.authService.isAuthenticated();
  }
}
