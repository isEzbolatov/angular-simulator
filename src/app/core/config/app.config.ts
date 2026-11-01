import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { routes } from '../../app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { loggingInterceptor } from '../interceptors/logging.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { authInterceptor } from '../../features/auth/interceptors/auth.interceptor';
import { APP_CONFIG } from './app-config.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor])),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      },
    },
    {
      provide: APP_CONFIG,
      useValue: {
        companyName: 'румтибет',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 3600000,
      },
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 50, logOnly: !isDevMode() }),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
  ],
};
