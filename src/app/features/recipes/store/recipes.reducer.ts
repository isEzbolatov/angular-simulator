import { createReducer, on } from '@ngrx/store';
import { IRecipe } from '../models/recipe.interface';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

export interface IRecipesState {
  recipes: IRecipe[];
  loading: boolean;
  error: string | null;
}

export const initialRecipesState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer = createReducer(
  initialRecipesState,
  on(loadRecipes, (state) => ({ ...state, loading: true, error: null })),
  on(loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
    error: null,
  })),
  on(loadRecipesFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export const RECIPES_FEATURE_KEY = 'recipes';
