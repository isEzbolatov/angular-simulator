import { Component, EventEmitter, Output, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
  @Output() filterChange = new EventEmitter<string>;

  private destroyRef = inject(DestroyRef);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(value => value.trim().toLowerCase()),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value) => {
      this.filterChange.emit(value);
    })
  }
}
