import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../layout/popup/popup.component";
import {AuthService} from "../../service/auth.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginInfo} from "../../model/LoginInfo";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private dialog: MatDialog, private authService:AuthService, private router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email']?.value || "";
      const password = this.loginForm.controls['password']?.value || "";

      let loginInfo: LoginInfo = {email, password};

      this.authService.login(loginInfo).subscribe({
        next: (response) => {
          // Handle successful response
          console.log('Login successful', response);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.log('User not found');
          } else if (error.status === 403) {
            console.log('User is blocked or inactive');
          } else {
            console.error('An error occurred:', error.message);
          }
        }
      });
    } else {
      this.dialog.open(PopupComponent, {
        width: '300px',
        disableClose: true,
        data: {
          title: 'Invalid Form',
          message: 'Please fill out all required fields.'
        }
      });
    }
  }

  // private handleError(error: any): void {
  //   if (error.status === 404 ) {
  //     this.dialog.open(PopupComponent, {
  //       width: '300px',
  //       disableClose: true,
  //       data: {
  //         title: 'Login Failed',
  //         message: 'Your email with your password is wrong.'
  //       }
  //     });
  //
  //   } else if (error.status === 403) {
  //     this.dialog.open(PopupComponent, {
  //       width: '300px',
  //       disableClose: true,
  //       data: {
  //         title: 'Login Forbidden',
  //         message: 'Your account is banned!'
  //       }
  //     });
  //   } else {
  //     this.dialog.open(PopupComponent, {
  //       width: '300px',
  //       disableClose: true,
  //       data: {
  //         title: `${error.status}`,
  //         message: 'Please try again later.'
  //       }
  //     });
  //   }
  // }
}
