import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsApiService } from '../../services/posts-api.service';
import { MessageTextService } from '../../../../../message-text.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {
  private messageService = inject(MessageTextService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private postsApiService = inject(PostsApiService);

  message = '';

  form = this.formBuilder.group({
    title: [''],
    body: [''],
    tags: ['']
  })
  
  createPost() {
    const formValue = this.form.getRawValue();
    const postData = {
      ...formValue,
      title: formValue.title ?? '',
      body: formValue.body ?? '',
      userId: 1,
      tags: (formValue.tags ?? '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    this.postsApiService.createPost(postData).subscribe({
      next: (response) => {
        console.log(response);
        this.form.reset();
        this.message = 'Пост создан';
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.messageService.showError();
      },
    });
  }
}
