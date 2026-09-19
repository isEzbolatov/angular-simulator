import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  http = inject(HttpClient);

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
    );
  }
}
