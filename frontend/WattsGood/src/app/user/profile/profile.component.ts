import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Role, User} from "../../model/User";
import {HttpErrorResponse} from "@angular/common/http";
import {PopupComponent} from "../../layout/popup/popup.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private dialog: MatDialog,
              private authService:AuthService,
              private router: Router,
              private userService: UserService) {
  }

  loading: boolean = false;
  user: User = {
    id: 0,
    email: '',
    password: '',
    name: '',
    surname: '',
    active: true,
    blocked: false,
    country: '',
    city: '',
    street: '',
    phone: '',
    role: Role.User,
  };

  registerForm = new FormGroup({
    email: new FormControl('', []),
    name: new FormControl('', []),
    surname: new FormControl('', []),
    country: new FormControl('', []),
    city: new FormControl('', []),
    street: new FormControl('', []),
    phone: new FormControl('', []),
    role: new FormControl('', []),
  });
  ngOnInit(): void {
    this.loading = true;
    this.userService.getAuthenticatedUser().subscribe({
      next: (user) => {
        this.user = user;
        this.registerForm.patchValue({
          email: user.email,
          name: user.name,
          surname: user.surname,
          country: user.country,
          city: user.city,
          street: user.street,
          phone: user.phone,
          role: user.role
        });
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.showPopup('Error', 'Could not retrieve user information.');
        this.authService.logout();
      }
    });
  }

  private showPopup(tittle:string, message:string){
    this.dialog.open(PopupComponent, {
      width: '300px',
      disableClose: true,
      data: {
        title: tittle,
        message: message
      }
    });
  }
}
