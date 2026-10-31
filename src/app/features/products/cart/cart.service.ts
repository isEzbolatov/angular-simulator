import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { IProduct } from '../product.interface';
import { CartApiService } from './cart-api.service';
import { ICart } from './cart.interface';

export interface ICartLine {
  product: IProduct;
  quantity: number;
}

const TAX_RATE = 0.2;
const DUMMYJSON_DEMO_USER_ID = 1;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartApi = inject(CartApiService);

  private readonly linesState = signal<ICartLine[]>([]);

  private readonly remoteCartIdState = signal<number | null>(null);

  private readonly busyState = signal(false);

  private readonly errorState = signal<string | null>(null);

  readonly lines = this.linesState.asReadonly();

  readonly busy = this.busyState.asReadonly();

  readonly error = this.errorState.asReadonly();

  readonly itemCount = computed(() =>
    this.linesState().reduce((count, line) => count + line.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.linesState().reduce((sum, line) => sum + line.product.price * line.quantity, 0),
  );

  readonly tax = computed(() => this.subtotal() * TAX_RATE);

  readonly total = computed(() => this.subtotal() + this.tax());

  addProduct(product: IProduct): Observable<ICart | null> {
    const lines = this.linesState();
    const existingLine = lines.find((line) => line.product.id === product.id);
    const nextLines = existingLine
      ? lines.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
        )
      : [...lines, { product, quantity: 1 }];

    return this.saveLines(nextLines);
  }

  setQuantity(productId: number, quantity: number): Observable<ICart | null> {
    if (quantity <= 0) {
      return this.removeProduct(productId);
    }

    const nextLines = this.linesState().map((line) =>
      line.product.id === productId ? { ...line, quantity } : line,
    );

    return this.saveLines(nextLines);
  }

  removeProduct(productId: number): Observable<ICart | null> {
    const nextLines = this.linesState().filter((line) => line.product.id !== productId);

    return this.saveLines(nextLines);
  }

  clear(): Observable<ICart | null> {
    const remoteCartId = this.remoteCartIdState();
    if (remoteCartId === null) {
      this.linesState.set([]);
      return of(null);
    }

    return this.runRequest(this.cartApi.deleteCart(remoteCartId), () => {
      this.linesState.set([]);
      this.remoteCartIdState.set(null);
    });
  }

  private saveLines(nextLines: ICartLine[]): Observable<ICart | null> {
    if (this.busyState()) {
      return of(null);
    }

    const products = nextLines.map(({ product, quantity }) => ({ id: product.id, quantity }));
    const remoteCartId = this.remoteCartIdState();
    const request =
      remoteCartId === null
        ? this.cartApi.createCart({ userId: DUMMYJSON_DEMO_USER_ID, products })
        : this.cartApi.updateCart(remoteCartId, products);

    return this.runRequest(request, (cart) => {
      this.remoteCartIdState.set(cart.id);
      this.linesState.set(nextLines);
    });
  }

  private runRequest(
    request: Observable<ICart>,
    onSuccess: (cart: ICart) => void,
  ): Observable<ICart | null> {
    this.busyState.set(true);
    this.errorState.set(null);

    return request.pipe(
      tap((cart) => onSuccess(cart)),
      catchError(() => {
        this.errorState.set('Не удалось обновить корзину. Попробуйте ещё раз.');
        return of(null);
      }),
      finalize(() => this.busyState.set(false)),
    );
  }
}
