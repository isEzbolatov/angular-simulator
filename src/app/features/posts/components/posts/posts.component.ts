import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsApiService } from '../../services/posts-api.service';
import { TableModule } from 'primeng/table';
import { IPost } from '../../models/post.model';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { MessageTextService } from '../../../../core/services/message-text.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [TableModule, PaginatorModule, SkeletonModule, ContextMenuModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  private postsApiService = inject(PostsApiService);

  private messageService = inject(MessageTextService);

  private router = inject(Router);

  private dialogService = inject(DialogService);

  posts: IPost[] = [];

  first = 0;

  rows = 10;

  totalRecords = 0;

  isLoading = false;

  menuItems: MenuItem[] = [
    { label: 'Просмотреть', command: () => this.viewPost() },
    { label: 'Редактировать', command: () => this.editPost() },
    { label: 'Удалить', command: () => this.deletePost() },
  ];

  selectedPost: IPost | null = null;

  ngOnInit() {
    this.isLoading = true;
    this.postsApiService.getPosts(10, 0).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.totalRecords = response.total;
        this.isLoading = false;
        console.log(this.posts);
      },
      error: () => {
        this.isLoading = false;
        this.messageService.showError();
      },
    });
  }

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.isLoading = true;

    this.postsApiService.getPosts(this.rows, this.first).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.messageService.showError();
      },
    });
  }

  viewPost(post?: IPost) {
    const postToView = post ?? this.selectedPost;

    if (postToView) {
      this.router.navigate(['/posts', postToView.id]);
    }
  }

  editPost() {
    if (this.selectedPost) {
      const selectedPost = this.selectedPost;
      const dialogRef = this.dialogService.open(PostEditDialogComponent, {
        header: 'Редактирование поста',
        width: 'min(600px, 90vw)',
        data: { post: selectedPost },
      });

      dialogRef?.onClose.subscribe((changes) => {
        if (!changes) {
          return;
        }

        const changesForPost: Partial<IPost> = {
          title: changes.title,
          tags: changes.tags
            .split(',')
            .map((tag: string) => tag.trim())
            .filter((tag: string) => tag.length > 0),
          views: Number(changes.views),
        };

        this.posts = this.posts.map((post) =>
          post.id === selectedPost.id ? { ...post, ...changesForPost } : post,
        );

        this.postsApiService.updatePost(selectedPost.id, changesForPost).subscribe();
      });
    }
  }

  deletePost(): void {
    if (!this.selectedPost) {
      return;
    }

    const postId = this.selectedPost.id;

    this.postsApiService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.selectedPost = null;
      },
      error: () => {
        this.messageService.showError();
      },
    });
  }
}
