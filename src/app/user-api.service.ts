import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  http = inject(HttpClient);

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }

  deleteUser(userId: number): Observable<void> {
    void userId;
    return of(void 0);
  }
}
