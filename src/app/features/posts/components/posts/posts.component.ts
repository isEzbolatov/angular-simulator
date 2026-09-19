import { Component, inject } from '@angular/core';
import { PostsApiService } from '../../services/posts-api.service';
import { TableModule } from 'primeng/table';
import { IPost } from '../../models/post.model';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, PaginatorModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  postsApiService = inject(PostsApiService);
  posts: IPost[] = [];
  first = 0;
  rows = 10;
  totalRecords = 0;

  ngOnInit() {
    this.postsApiService.getPosts(10, 0).subscribe((response) => {
      this.posts = response.posts;
      this.totalRecords = response.total;
      console.log(this.posts)
    });
  }

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;

    this.postsApiService.getPosts(this.rows, this.first).subscribe((response) => {
      this.posts = response.posts;
    })
  }
}
