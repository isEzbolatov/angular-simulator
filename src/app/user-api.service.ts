import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import usersData from '../mock-users.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  http = inject(HttpClient)

  getUsers(): Observable<IUser[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  }

  deleteUser(userId: number): Observable<void> {
    return of(void 0);
  }
}