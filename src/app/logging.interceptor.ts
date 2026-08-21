import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs";

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = Date.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startedAt;

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
    })
  );
};