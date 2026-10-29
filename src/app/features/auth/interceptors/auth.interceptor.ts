import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return authService.refreshAccessToken().pipe(
          switchMap((response) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            });

            return next(retryReq);
          }),
        );
      }

      throw error;
    }),
  );
};
