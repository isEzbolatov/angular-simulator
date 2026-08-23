import { HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { inject } from '@angular/core';
import { MessageTextService } from '../message-text.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageTextService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500 && error.status < 600) {
        messageService.showError();
      }

      return throwError(() => error);
    })
  );
};