import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {PopupComponent} from "../../layout/popup/popup.component";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-activate-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './activate-user.component.html',
  styleUrl: './activate-user.component.css'
})
export class ActivateUserComponent implements OnInit {
  email: string | null = null;
  secret: string | null = null;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private userService: UserService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.email = params.get('email');
      this.secret = params.get('secret');
    });
  }

  onSubmit(): void {
    if(this.email!= null && this.secret!=null){
      console.log(`Email: ${this.email}, Secret: ${this.secret}`);
      this.userService.activateUser(this.email, this.secret).subscribe({
        next: (user) => {
          this.router.navigate(['/sign-in']);
          this.showPopup('Account activated', 'Sign in to access your account.');

        },
        error: (error: HttpErrorResponse) => {
          this.showPopup('Error', 'Could not retrieve user information.');
          console.error('Error activating account:', error.message);
        }
      });
    }else{
      this.showPopup('Something went wrong', 'The activation link isn\'t working.');
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
