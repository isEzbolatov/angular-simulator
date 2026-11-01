import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, defer, EMPTY, finalize, Observable, pipe, switchMap, tap } from 'rxjs';

interface IRequestStatusState {
  loading: boolean;
  error: string | null;
}

interface IRequestTask<T> {
  request: Observable<T>;
  onSuccess: (value: T) => void;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Не удалось загрузить цитаты';
}

export function withRequestStatus<T>() {
  return signalStoreFeature(
    withState<IRequestStatusState>({ loading: false, error: null }),
    withMethods((store) => ({
      executeRequest: rxMethod<IRequestTask<T>>(
        pipe(
          switchMap(({ request, onSuccess }) =>
            defer(() => {
              patchState(store, { loading: true, error: null });

              return request.pipe(
                tap({
                  next: onSuccess,
                  error: (error: unknown) => patchState(store, { error: getErrorMessage(error) }),
                }),
                catchError(() => EMPTY),
                finalize(() => patchState(store, { loading: false })),
              );
            }),
          ),
        ),
      ),
    })),
  );
}
