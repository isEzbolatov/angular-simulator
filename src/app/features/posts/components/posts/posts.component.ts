import { Component, inject } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  postsApiService = inject(PostsApiService);
  posts: any;

  ngOnInit() {
    this.postsApiService.getPosts().subscribe(
      (post: any) => { this.posts = post.posts; console.log(this.posts) }
    );
  }
}
