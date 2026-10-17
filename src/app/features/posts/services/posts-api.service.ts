import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost, IPostResponse } from '../models/post.model';

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

  getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  updatePost(id: number, changes: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(
      `https://dummyjson.com/posts/${id}`,
      changes
    );
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://dummyjson.com/posts/${id}`
    );
  }
}
