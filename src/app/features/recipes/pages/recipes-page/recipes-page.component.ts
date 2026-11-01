import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadRecipes } from '../../store/recipes.actions';
import {
  selectRecipes,
  selectRecipesError,
  selectRecipesLoading,
} from '../../store/recipes.selectors';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
})
export class RecipesPageComponent implements OnInit {
  private readonly store = inject(Store);

  readonly recipes = toSignal(this.store.select(selectRecipes), { initialValue: [] });

  readonly loading = toSignal(this.store.select(selectRecipesLoading), { initialValue: false });

  readonly error = toSignal(this.store.select(selectRecipesError), { initialValue: null });

  ngOnInit(): void {
    this.reloadRecipes();
  }

  reloadRecipes(): void {
    this.store.dispatch(loadRecipes());
  }
}
