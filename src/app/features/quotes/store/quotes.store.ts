import { computed, inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withRequestStatus } from '../../../core/state/with-request-status.feature';
import { IQuote, IQuotesResponse } from '../models/quote.interface';
import { QuotesApiService } from '../data-access/quotes-api.service';

interface IQuotesState {
  quotes: IQuote[];
  favorites: number[];
  favoritesOnly: boolean;
  randomQuote: IQuote | null;
}

const initialState: IQuotesState = {
  quotes: [],
  favorites: [],
  favoritesOnly: false,
  randomQuote: null,
};

export const QuotesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('quotes'),
  withState(initialState),
  withRequestStatus<IQuotesResponse>('Не удалось загрузить цитаты'),
  withComputed(({ quotes, favorites, favoritesOnly }) => ({
    visibleQuotes: computed(() => {
      if (!favoritesOnly()) {
        return quotes();
      }

      const favoriteIds = new Set(favorites());
      return quotes().filter((quote) => favoriteIds.has(quote.id));
    }),
    favoritesCount: computed(() => favorites().length),
    authorsCount: computed(() => new Set(quotes().map((quote) => quote.author)).size),
  })),
  withMethods((store, quotesApi = inject(QuotesApiService)) => {
    const loadQuotes = (): void => {
      store.executeRequest({
        request: quotesApi.getQuotes(),
        onSuccess: (response) => patchState(store, { quotes: response.quotes }),
      });
    };

    return {
      loadQuotes,
      retry: loadQuotes,
      toggleFavorite(id: number): void {
        const favorites = store.favorites();
        const nextFavorites = favorites.includes(id)
          ? favorites.filter((favoriteId) => favoriteId !== id)
          : [...favorites, id];

        patchState(store, { favorites: nextFavorites });
      },
      setFavoritesOnly(favoritesOnly: boolean): void {
        patchState(store, { favoritesOnly });
      },
      pickRandomQuote(): void {
        const quotes = store.quotes();
        const randomQuote = quotes.length
          ? quotes[Math.floor(Math.random() * quotes.length)]
          : null;

        patchState(store, { randomQuote });
      },
    };
  }),
);
