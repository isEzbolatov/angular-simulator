import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogConfig = inject(DynamicDialogConfig);
  private readonly dialogRef = inject(DynamicDialogRef);

  form = this.formBuilder.group({
    title: [this.dialogConfig.data?.post?.title ?? '', Validators.required],
    tags: [this.dialogConfig.data?.post?.tags?.join(', ') ?? ''],
    views: [this.dialogConfig.data?.post?.views ?? 0, Validators.required],
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }
}
