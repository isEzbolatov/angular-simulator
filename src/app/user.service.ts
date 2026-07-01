import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageTextService } from '../message-text.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser[]>([]);

  public user$: Observable<IUser[]> = this.userSubject.asObservable();
  public userApi: UserApiService = inject(UserApiService);
  public loader: LoaderService = inject(LoaderService);
  public renderTextService: MessageTextService = inject(MessageTextService);

  setUsers(user: IUser[]) {
    this.userSubject.next(user);
  }

  getUsers(users: IUser[]) {
    return this.user$;
  }

  loadUsers(): Observable<IUser[]> {
    this.loader.showLoader();

    return this.userApi.getUsers()
      .pipe(
        tap((data) =>
          this.setUsers(data)),

        catchError(error => {
          this.renderTextService.showError();
          this.setUsers([]);
          return of([]);
        }),

        finalize(() => {
          this.loader.hideLoader();
        })
      )
  }
}
