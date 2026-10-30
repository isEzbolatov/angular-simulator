import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { MessageTextService } from '../message-text.service';
import { APP_CONFIG } from './app-config.token';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageTextService);
  const config = inject(APP_CONFIG);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 400 && error.status < 600 && config.enableNotifications) {
        messageService.showError();
      }

      return throwError(() => error);
    }),
  );
};
