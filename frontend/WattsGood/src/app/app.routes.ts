import { Routes } from '@angular/router';
import {PropertyRegistrationComponent} from "./property/property-registration/property-registration.component";
import {PropertyRequestUserComponent} from "./property/property-request-user/property-request-user.component";
import {PropertyRequestAdminComponent} from "./property/property-request-admin/property-request-admin.component";

export const routes: Routes = [
  { path: 'property-registration', component: PropertyRegistrationComponent },
  { path: 'property-requests-user', component: PropertyRequestUserComponent },
  { path: 'property-requests', component: PropertyRequestAdminComponent },

];
