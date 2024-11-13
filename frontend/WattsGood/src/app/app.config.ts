import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withInterceptors} from "@angular/common/http";

import { routes } from './app.routes';
import { MatDialogModule } from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {authInterceptor} from "./interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(BrowserAnimationsModule, MatDialogModule)
  ]
};
