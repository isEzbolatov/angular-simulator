import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { APP_CONFIG } from '../config/app-config.token';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_CONFIG);

  if (!config.enableLogs) {
    return next(req);
  }

  const startedAt = Date.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startedAt;

          // eslint-disable-next-line no-console -- response diagnostics are explicitly gated by enableLogs.
          console.log('HTTP response:', {
            method: req.method,
            url: req.url,
            status: event.status,
            duration: `${duration} ms`,
          });
        }
      },

      error: (error) => {
        const duration = Date.now() - startedAt;

        console.error('HTTP error:', {
          method: req.method,
          url: req.url,
          status: error.status ?? 'network error',
          duration: `${duration} ms`,
        });
      },
    }),
  );
};
