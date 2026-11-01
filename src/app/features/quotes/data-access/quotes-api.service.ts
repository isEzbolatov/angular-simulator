import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuotesResponse } from '../models/quote.interface';

const QUOTES_API_URL = 'https://dummyjson.com/quotes';

@Injectable({ providedIn: 'root' })
export class QuotesApiService {
  private readonly http = inject(HttpClient);

  getQuotes(): Observable<IQuotesResponse> {
    const params = new HttpParams().set('limit', 0);
    return this.http.get<IQuotesResponse>(QUOTES_API_URL, { params });
  }
}
