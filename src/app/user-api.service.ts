import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import usersData from '../mock-users.json';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  getUsers(): Observable<IUser[]> {
    return of(usersData as IUser[]);
  }
}