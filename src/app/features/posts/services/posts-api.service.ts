import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  http = inject(HttpClient);

  getPosts() {
    return this.http.get('https://dummyjson.com/posts');
  }
}
