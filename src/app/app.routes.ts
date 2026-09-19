import { model } from '@angular/core';
import { Routes } from '@angular/router';

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
        loadComponent: () =>
            import('./features/posts/components/posts/posts.component')
                .then((module) => module.PostsComponent)
    },
    {
        path: '**',
        loadComponent: () =>
            import('./not-found-page/not-found-page.component')
                .then((module) => module.NotFoundPageComponent),
    },
];
