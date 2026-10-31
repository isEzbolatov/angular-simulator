import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart, ICartRequest } from './cart.interface';

const CARTS_API_URL = 'https://dummyjson.com/carts';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly http = inject(HttpClient);

  getCart(id: number): Observable<ICart> {
    return this.http.get<ICart>(`${CARTS_API_URL}/${id}`);
  }

  getCartsByUser(userId: number): Observable<{ carts: ICart[]; total: number }> {
    return this.http.get<{ carts: ICart[]; total: number }>(`${CARTS_API_URL}/user/${userId}`);
  }

  createCart(cart: ICartRequest): Observable<ICart> {
    return this.http.post<ICart>(`${CARTS_API_URL}/add`, cart);
  }

  updateCart(id: number, products: ICartRequest['products']): Observable<ICart> {
    return this.http.put<ICart>(`${CARTS_API_URL}/${id}`, { products, merge: false });
  }

  deleteCart(id: number): Observable<ICart> {
    return this.http.delete<ICart>(`${CARTS_API_URL}/${id}`);
  }
}
