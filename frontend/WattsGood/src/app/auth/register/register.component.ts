import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MapComponent} from "../../map/map.component";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../service/auth.service";
import {PopupComponent} from "../../layout/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {Role, User} from "../../model/User";
import {catchError, tap} from "rxjs/operators";
import {HttpEventType} from "@angular/common/http";
import {of} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MapComponent,
    MatSelectModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private dialog: MatDialog,
              private authService:AuthService,
              private router: Router,) {
  }
  uploadedPicture:File|null = null;
  imageError: boolean = false;
  loading: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]),
    image: new FormControl(''),
  });

  get passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.rePassword;
  }


  chosenImageChanged($event: Event) {
    const files: FileList | null = ($event.target as HTMLInputElement).files;
    if (files) {
      this.uploadedPicture = files[0];
    }
  }


  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch && this.uploadedPicture != null) {
      const user:User = {
        id: 0,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        name: this.registerForm.value.name!,
        surname: this.registerForm.value.surname!,
        country: this.registerForm.value.country!,
        city: this.registerForm.value.city!,
        street: this.registerForm.value.street!,
        phone: this.registerForm.value.phone!,
        blocked:false,
        active:false,
        role:Role.User
      };
      const formData: FormData = new FormData();
      formData.append('image', this.uploadedPicture, this.uploadedPicture.name);

      this.loading = true;
      this.authService.register(user).subscribe({
        next: (response) => {
          this.authService.uploadFile(formData, this.registerForm.value.email!).subscribe(
          (response) => {
            this.loading = false;
            this.showPopup("Registration successful", "You can sign in as soon as you confirm your email.");
            this.router.navigate(['/sign-in']);
          },
          (error) => {
            this.loading = false;
            console.error('Error uploading profile picture:', error);
            this.showPopup("Registration Failed", "Unable to upload profile picture. Please try again.");
          });

        },
        error: (error) => {
          this.loading = false;
          if (error.status === 409) {
            this.showPopup("Registration Failed", "The email address is already in use. Please try a different one.");
          } else {
            this.showPopup("Registration Failed", "Unable to register. Please try again.");
          }
        }
      });

    } else {
      this.imageError = this.uploadedPicture == null;
      this.registerForm.markAllAsTouched();
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

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get rePassword() {
    return this.registerForm.get('rePassword');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get country() {
    return this.registerForm.get('country');
  }

  get city() {
    return this.registerForm.get('city');
  }

  get street() {
    return this.registerForm.get('street');
  }

  get phone() {
    return this.registerForm.get('phone');
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

  get rePasswordErrorMessage(): string {
    if (this.rePassword?.hasError('required')) {
      return 'Please confirm your password.';
    } else if (!this.passwordsMatch) {
      return 'Passwords do not match.';
    }
    return '';
  }

  get nameErrorMessage(): string {
    if (this.name?.hasError('required')) {
      return 'Name is required.';
    }
    return '';
  }

  get surnameErrorMessage(): string {
    if (this.surname?.hasError('required')) {
      return 'Surname is required.';
    }
    return '';
  }

  get countryErrorMessage(): string {
    if (this.country?.hasError('required')) {
      return 'Country is required.';
    }
    return '';
  }

  get cityErrorMessage(): string {
    if (this.city?.hasError('required')) {
      return 'City is required.';
    }
    return '';
  }

  get streetErrorMessage(): string {
    if (this.street?.hasError('required')) {
      return 'Street is required.';
    }
    return '';
  }

  get phoneErrorMessage(): string {
    if (this.phone?.hasError('required')) {
      return 'Phone number is required.';
    } else if (this.phone?.hasError('pattern')) {
      return 'Enter a valid phone number.';
    }
    return '';
  }

}
