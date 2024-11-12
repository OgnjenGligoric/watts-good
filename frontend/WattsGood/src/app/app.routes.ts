import { Routes } from '@angular/router';
import {PropertyRegistrationComponent} from "./property/property-registration/property-registration.component";
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [
  { path: 'property-registration', component: PropertyRegistrationComponent },
  { path: 'sign-in', component: LoginComponent },
];
