import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IPost } from '../models/post.model';
import { PostsApiService } from '../services/posts-api.service';

export const postDetailResolver: ResolveFn<IPost> = (route) => {
  const postsApiService = inject(PostsApiService);
  const id = Number(route.paramMap.get('id'));

  return postsApiService.getPost(id);
};
