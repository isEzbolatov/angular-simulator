import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser[]>([]);

  public user$: Observable<IUser[]> = this.userSubject.asObservable();
  public userApi: UserApiService = inject(UserApiService);
  public loader: LoaderService = inject(LoaderService);
  public localStorageService: LocalStorageService = inject(LocalStorageService);

  setUsers(user: IUser[]) {
    this.userSubject.next(user);
    this.localStorageService.set('users', user);
  }

  getUsers(users: IUser[]) {
    return this.user$;
  }

  loadUsers(): Observable<IUser[]> {
    const localUsers = this.localStorageService.get('users');

    if (localUsers && Array.isArray(localUsers) && localUsers.length !== null) {
      this.userSubject.next(localUsers);
      this.loader.hideLoader();
      return of(localUsers);
    }

    this.loader.showLoader();

    return this.userApi.getUsers()
      .pipe(
        tap((data) =>
          this.setUsers(data)),

        catchError(error => {
          this.setUsers([]);
          return of([]);
        }),

        finalize(() => {
          this.loader.hideLoader();
        })
      )
  }

  deleteUser(userId: number) {
    const currentUsers = this.userSubject.value;
    const updatedUsers = currentUsers.filter(user => user.id !== userId);

    this.userSubject.next(updatedUsers);

    this.localStorageService.set('users', this.userSubject.value);

    return of(void 0);
  }

  addUser(user: IUser): Observable<void> {
    this.userSubject.value;
    const updated = [...this.userSubject.value, user];
    this.userSubject.next(updated);
    this.localStorageService.set('users', this.userSubject.value);
    return of(void 0);
  }
}
