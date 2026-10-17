import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../../services/posts-api.service';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  route = inject(ActivatedRoute);
  postsApiService = inject(PostsApiService);
  post: IPost | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.postsApiService.getPost(Number(id)).subscribe((post) => {
        this.post = post;
      });
    }
  }
}
