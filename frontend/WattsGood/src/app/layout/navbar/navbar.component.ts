import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router,) {
  }
  empty_storage(){
    localStorage.clear()
    this.router.navigate(["/sign-in"]);
  }
}
