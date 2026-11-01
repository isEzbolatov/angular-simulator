import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipesResponse } from '../models/recipe.interface';

const RECIPES_API_URL = 'https://dummyjson.com/recipes';

@Injectable({ providedIn: 'root' })
export class RecipesApiService {
  private readonly http = inject(HttpClient);

  getRecipes(): Observable<IRecipesResponse> {
    return this.http.get<IRecipesResponse>(RECIPES_API_URL);
  }
}
