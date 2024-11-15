import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {LoginInfo} from "../../model/LoginInfo";
import {Role} from "../../model/User";
import {HttpErrorResponse} from "@angular/common/http";
import {PopupComponent} from "../../layout/popup/popup.component";

@Component({
  selector: 'app-activate-super-admin',
  standalone: true,
    imports: [
      ReactiveFormsModule,
      MatSelectModule,
      CommonModule,
      RouterLink
    ],
  templateUrl: './activate-super-admin.component.html',
  styleUrl: './activate-super-admin.component.css'
})
export class ActivateSuperAdminComponent {
  constructor(private dialog: MatDialog,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {
  }

  activateForm = new FormGroup({
    rePassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.activateForm.valid) {
      const rePassword = this.activateForm.controls['rePassword']?.value || "";
      const password = this.activateForm.controls['password']?.value || "";

      if(password !== rePassword){
        this.showPopup('Invalid Form', 'Passwords need to match.');
        return;
      }

      this.userService.activateSuperAdmin(password).subscribe({
        next: (user) => {
          this.authService.logout();
          this.router.navigate(['/sign-in']);
          this.showPopup('Account activated', 'Sign in to access your account.');

        },
        error: (error: HttpErrorResponse) => {
          this.showPopup('Error', 'Could not retrieve user information.');
          console.error('Error activating account:', error.message);
        }
      });
    } else {
      this.showPopup('Invalid Form', 'Please fill out all required fields.');
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
