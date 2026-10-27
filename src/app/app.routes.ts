import { model } from '@angular/core';
import { Routes } from '@angular/router';
import { postDetailResolver } from './features/posts/resolvers/post-detail.resolver';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./home-page/home-page.component')
                .then((module) => module.HomePageComponent),
    },
    {
        path: 'users',
        loadComponent: () =>
            import('./users-page/users-page.component')
                .then((module) => module.UsersPageComponent),
    },
    {
        path: 'posts',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/posts/components/posts/posts.component')
                .then((module) => module.PostsComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/components/login/login.component')
                .then((m) => m.LoginComponent),
    },
    {
        path: 'posts/create',
        loadComponent: () =>
            import('./features/posts/components/post-create/post-create.component')
                .then((module) => module.PostCreateComponent)
    },
    {
        path: 'posts/:id',
        loadComponent: () =>
            import('./features/posts/components/post-detail/post-detail.component')
                .then((module) => module.PostDetailComponent),
        resolve: {
            post: postDetailResolver,
        },
    },
    {
        path: '**',
        loadComponent: () =>
            import('./not-found-page/not-found-page.component')
                .then((module) => module.NotFoundPageComponent),
    },
];
