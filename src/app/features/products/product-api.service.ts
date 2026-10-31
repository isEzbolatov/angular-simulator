import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './product.interface';
import { IProductCategory, IProductResponse } from './product-response.interface';

export type ProductSortOrder = 'asc' | 'desc';

export interface IProductQuery {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: ProductSortOrder;
}

const PRODUCTS_API_URL = 'https://dummyjson.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private readonly http = inject(HttpClient);

  getProducts(query: IProductQuery = {}): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(PRODUCTS_API_URL, {
      params: this.createParams(query),
    });
  }

  searchProducts(search: string, query: IProductQuery = {}): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${PRODUCTS_API_URL}/search`, {
      params: this.createParams({ ...query, q: search }),
    });
  }

  getProductsByCategory(category: string, query: IProductQuery = {}): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `${PRODUCTS_API_URL}/category/${encodeURIComponent(category)}`,
      { params: this.createParams(query) },
    );
  }

  getCategories(): Observable<IProductCategory[]> {
    return this.http.get<IProductCategory[]>(`${PRODUCTS_API_URL}/categories`);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${PRODUCTS_API_URL}/${id}`);
  }

  private createParams(query: IProductQuery & { q?: string }): HttpParams {
    let params = new HttpParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    }

    return params;
  }
}
