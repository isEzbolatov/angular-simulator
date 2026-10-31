import { Routes } from '@angular/router';
import { postDetailResolver } from './features/posts/resolvers/post-detail.resolver';
import { authGuard } from './features/auth/guards/auth.guard';
import { adminGuard } from './features/auth/guards/admin.guard';
import { productDetailResolver } from './features/products/resolvers/product-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home-page/home-page.component').then((module) => module.HomePageComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./users-page/users-page.component').then((module) => module.UsersPageComponent),
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/components/posts/posts.component').then(
        (module) => module.PostsComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products-page/products-page.component').then(
        (module) => module.ProductsPageComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/product-detail/product-detail.component').then(
        (module) => module.ProductDetailComponent,
      ),
    resolve: {
      product: productDetailResolver,
    },
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/products/cart/cart-page.component').then(
        (module) => module.CartPageComponent,
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'homework-28',
    loadComponent: () =>
      import('./homework-28/parent/parent.component').then((module) => module.ParentComponent),
  },
  {
    path: 'homework-28/default-check',
    loadComponent: () =>
      import('./homework-28/default-check/default-check.component').then(
        (module) => module.DefaultCheckComponent,
      ),
  },
  {
    path: 'homework-28/on-push-check',
    loadComponent: () =>
      import('./homework-28/on-push-check/on-push-check.component').then(
        (module) => module.OnPushCheckComponent,
      ),
  },
  {
    path: 'posts/create',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/components/post-create/post-create.component').then(
        (module) => module.PostCreateComponent,
      ),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./features/posts/components/post-detail/post-detail.component').then(
        (module) => module.PostDetailComponent,
      ),
    resolve: {
      post: postDetailResolver,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then(
        (module) => module.NotFoundPageComponent,
      ),
  },
];
