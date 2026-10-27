import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authHttp = inject(HttpClient);
  authState = signal(!!localStorage.getItem('accessToken'));

  login(credentials: { username: string; password: string }) {
    return this.authHttp
      .post<{ accessToken: string; refreshToken: string }>(
        'https://dummyjson.com/auth/login',
        credentials
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.authState.set(true);
        }),
        switchMap(() => this.getCurrentMe())
      );
  }

  refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.authHttp
      .post<{ accessToken: string; refreshToken: string }>(
        'https://dummyjson.com/auth/refresh',
        { refreshToken }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        })
      );
  }

  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    this.authState.set(false);
  }

  getCurrentMe() {
    return this.authHttp.get<{ role: string }>(
      'https://dummyjson.com/auth/me'
    ).pipe(
      tap((response) => {
        localStorage.setItem('role', response.role);
      })
    );
  }
}
