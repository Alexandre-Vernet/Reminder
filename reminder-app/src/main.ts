import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app/app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from "./environments/environment";
import { providePrimeNG } from "primeng/config";
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { authIntercept } from "./app/auth/auth.interceptor";

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authIntercept])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'p-light',
          cssLayer: false
        }
      }
    }),
  ],
}).catch((err) =>
  console.error(err)
);
