import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../layout/popup/popup.component";
import {AuthService} from "../../service/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginInfo} from "../../model/LoginInfo";
import {UserService} from "../../service/user.service";
import {Role} from "../../model/User";

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
  constructor(private dialog: MatDialog,
              private authService:AuthService,
              private router: Router,
              private userService: UserService) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  loading: boolean = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailErrorMessage(): string {
    if (this.email?.hasError('required')) {
      return 'Email is required.';
    } else if (this.email?.hasError('email')) {
      return 'Enter a valid email address.';
    }
    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password?.hasError('required')) {
      return 'Password is required.';
    } else if (this.password?.hasError('minlength')) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email']?.value || "";
      const password = this.loginForm.controls['password']?.value || "";

      let loginInfo: LoginInfo = {email, password};

      this.loading = true;
      this.authService.login(loginInfo).subscribe({
        next: (response) => {
          if (response && response.token) {
            this.authService.storeToken(response.token);
          }

          this.userService.getAuthenticatedUser().subscribe({
            next: (user) => {
              this.loading = false;

              if(user.active){
                this.router.navigate(['/']);
              }
              else if(user.role == Role.SuperAdmin){
                this.router.navigate(['/activate-super-admin']);
              }else{
                this.showPopup('Activate account', 'Check your email and activate it.')
              }
            },
            error: (error: HttpErrorResponse) => {
              this.loading = false;
              this.showPopup('Error', 'Could not retrieve user information.');
              this.authService.logout();
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;

          if (error.status === 404) {
            this.showPopup('User not found', 'Try again.')
          } else if (error.status === 403) {
            this.showPopup('Invalid login credentials', ' Please check your email and password and try again.')
          } else if (error.status === 401) {
            this.showPopup('User is blocked', '')
          } else {
            this.showPopup('An error occurred', 'Please try again later.')
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
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
