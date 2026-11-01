import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipesApiService } from '../data-access/recipes-api.service';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

@Injectable()
export class RecipesEffects {
  private readonly actions$ = inject(Actions);

  private readonly recipesApi = inject(RecipesApiService);

  readonly loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),
      switchMap(() =>
        this.recipesApi.getRecipes().pipe(
          map(({ recipes }) => loadRecipesSuccess({ recipes })),
          catchError((error: unknown) =>
            of(
              loadRecipesFailure({
                error: error instanceof Error ? error.message : 'Не удалось загрузить рецепты',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
