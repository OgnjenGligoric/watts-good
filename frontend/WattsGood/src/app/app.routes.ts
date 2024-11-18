import { Routes } from '@angular/router';
import {PropertyRegistrationComponent} from "./property/property-registration/property-registration.component";
import {LoginComponent} from "./auth/login/login.component";
import {AppComponent} from "./app.component";
import {ActivateSuperAdminComponent} from "./auth/activate-super-admin/activate-super-admin.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ActivateUserComponent} from "./auth/activate-user/activate-user.component";
import {PropertyRequestUserComponent} from "./property/property-request-user/property-request-user.component";
import {PropertyRequestAdminComponent} from "./property/property-request-admin/property-request-admin.component";
import {AuthGuard} from "./auth.guard";
import {Role} from "./model/User";
import {ProfileComponent} from "./user/profile/profile.component";
import {AdminRegistrationComponent} from "./user/admin-registration/admin-registration.component";

export const routes: Routes = [
  { path: 'property-registration',
    component: PropertyRegistrationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User],
      requiresActive: false,
    },
  },
  { path: 'sign-in',
    component: LoginComponent
  },
  { path: 'activate-super-admin',
    component: ActivateSuperAdminComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.SuperAdmin],
      activeNotRequired: true,
    },
  },
  { path: 'register',
    component: RegisterComponent
  },
  { path: 'activate/:email/:secret',
    component: ActivateUserComponent
  },
  { path: 'property-requests-user',
    component: PropertyRequestUserComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.User],
      activeNotRequired: false,
    },
  },
  { path: 'property-requests',
    component: PropertyRequestAdminComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin, Role.SuperAdmin],
      activeNotRequired: false,
    },
  },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin, Role.SuperAdmin, Role.Official, Role.User],
      activeNotRequired: false,
    },
  },
  { path: 'admin-registration',
    component: AdminRegistrationComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.SuperAdmin],
      activeNotRequired: false,
    },
  },
  {
    path: '**',
    redirectTo: '/sign-in',
  },
];
