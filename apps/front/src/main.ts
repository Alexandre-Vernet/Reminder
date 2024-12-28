import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app/app.routes";
import {provideHttpClient} from "@angular/common/http";
import {provideServiceWorker} from "@angular/service-worker";
import {environment} from "./environments/environment";

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      registrationStrategy: 'registerWhenStable:30000',
      enabled: environment.production,
    }),
  ],
}).catch((err) =>
  console.error(err)
);
