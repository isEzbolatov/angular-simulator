import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, map, of, startWith, switchMap } from 'rxjs';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { IProduct } from '../product.interface';
import { IProductCategory, IProductResponse } from '../product-response.interface';
import { IProductQuery, ProductApiService } from '../product-api.service';
import { CartService } from '../cart/cart.service';

interface IProductListState {
  response: IProductResponse | null;
  loading: boolean;
  error: boolean;
}

interface IProductSortOption {
  label: string;
  sortBy: string;
  order: 'asc' | 'desc';
}

const INITIAL_STATE: IProductListState = {
  response: null,
  loading: true,
  error: false,
};

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    RouterLink,
    SelectModule,
    SkeletonModule,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
})
export class ProductsPageComponent {
  private readonly productApi = inject(ProductApiService);

  readonly cartCount = inject(CartService).itemCount;

  readonly search = signal('');

  readonly category = signal<string | null>(null);

  readonly sort = signal<IProductSortOption>({
    label: 'Сначала популярные',
    sortBy: 'rating',
    order: 'desc',
  });

  readonly first = signal(0);

  readonly rows = signal(12);

  private readonly refreshVersion = signal(0);

  readonly sortOptions: IProductSortOption[] = [
    { label: 'Сначала популярные', sortBy: 'rating', order: 'desc' },
    { label: 'Сначала дешевле', sortBy: 'price', order: 'asc' },
    { label: 'Сначала дороже', sortBy: 'price', order: 'desc' },
    { label: 'По названию А–Я', sortBy: 'title', order: 'asc' },
  ];

  readonly categories = toSignal(
    this.productApi.getCategories().pipe(catchError(() => of<IProductCategory[]>([]))),
    { initialValue: [] as IProductCategory[] },
  );

  private readonly query = computed(() => ({
    search: this.search().trim(),
    category: this.category(),
    sort: this.sort(),
    first: this.first(),
    rows: this.rows(),
    refreshVersion: this.refreshVersion(),
  }));

  readonly state = toSignal(
    toObservable(this.query).pipe(
      debounceTime(250),
      switchMap(({ search, category, sort, first, rows }) => {
        const pagination: IProductQuery = {
          limit: rows,
          skip: first,
          sortBy: sort.sortBy,
          order: sort.order,
        };
        const request = search
          ? this.productApi.searchProducts(search, pagination)
          : category
            ? this.productApi.getProductsByCategory(category, pagination)
            : this.productApi.getProducts(pagination);

        return request.pipe(
          map((response): IProductListState => ({ response, loading: false, error: false })),
          startWith({ response: null, loading: true, error: false } as IProductListState),
          catchError(() => of<IProductListState>({ response: null, loading: false, error: true })),
        );
      }),
    ),
    { initialValue: INITIAL_STATE },
  );

  onSearch(value: string): void {
    this.search.set(value);
    this.first.set(0);
  }

  onCategoryChange(value: string | null): void {
    this.category.set(value);
    this.first.set(0);
  }

  onSortChange(value: IProductSortOption): void {
    this.sort.set(value);
    this.first.set(0);
  }

  onPageChange(event: PaginatorState): void {
    this.first.set(event.first ?? 0);
    this.rows.set(event.rows ?? 12);
  }

  retry(): void {
    this.refreshVersion.update((version) => version + 1);
  }

  trackProduct(_index: number, product: IProduct): number {
    return product.id;
  }
}
