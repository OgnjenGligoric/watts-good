import { Routes } from '@angular/router';
import {PropertyRegistrationComponent} from "./property/property-registration/property-registration.component";
import {PropertyRequestComponent} from "./property/property-request/property-request.component";

export const routes: Routes = [
  { path: 'property-registration', component: PropertyRegistrationComponent },
  { path: 'property-requests', component: PropertyRequestComponent },
];
