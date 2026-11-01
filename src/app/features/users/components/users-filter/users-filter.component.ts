import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();

  @Input() set search(value: string) {
    const normalizedSearch = value ?? '';
    if (this.searchControl.value !== normalizedSearch) {
      this.searchControl.setValue(normalizedSearch, { emitEvent: false });
    }
  }

  private destroyRef = inject(DestroyRef);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((value) => value.trim().toLowerCase()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.filterChange.emit(value);
      });
  }
}
