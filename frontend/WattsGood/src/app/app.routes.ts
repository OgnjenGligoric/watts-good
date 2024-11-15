import { Routes } from '@angular/router';
import {PropertyRegistrationComponent} from "./property/property-registration/property-registration.component";
import {LoginComponent} from "./auth/login/login.component";
import {AppComponent} from "./app.component";
import {ActivateSuperAdminComponent} from "./auth/activate-super-admin/activate-super-admin.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ActivateUserComponent} from "./auth/activate-user/activate-user.component";
import {PropertyRequestUserComponent} from "./property/property-request-user/property-request-user.component";
import {PropertyRequestAdminComponent} from "./property/property-request-admin/property-request-admin.component";

export const routes: Routes = [
  { path: 'property-registration', component: PropertyRegistrationComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'activate-super-admin', component: ActivateSuperAdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activate/:email/:secret', component: ActivateUserComponent },
  { path: 'property-requests-user', component: PropertyRequestUserComponent },
  { path: 'property-requests', component: PropertyRequestAdminComponent },
];
