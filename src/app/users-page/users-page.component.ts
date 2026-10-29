import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../user.service';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';
import { IUser } from '../../interfaces/IUser';
import { UserCreateComponent } from '../user-create/user-create.component';
import { MessageTextService } from '../../message-text.service';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PluralPipe } from '../plural.pipe';
import { BoldOnHoverDirective } from '../bold-on-hover.directive';

@Component({
  selector: 'app-users-page',
  imports: [
    AsyncPipe,
    UserCardComponent,
    UserCreateComponent,
    UsersFilterComponent,
    PluralPipe,
    BoldOnHoverDirective,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  private userService = inject(UserService);

  private renderTextService = inject(MessageTextService);

  users$ = this.userService.user$;

  isModalOpen: boolean = false;

  filterQuery$ = new BehaviorSubject<string>('');

  filteredUsers$ = combineLatest([this.users$, this.filterQuery$]).pipe(
    map(([user, filterUser]) =>
      user.filter((name) => name.name.toLowerCase().includes(filterUser.trim().toLowerCase())),
    ),
    takeUntilDestroyed(),
  );

  ngOnInit() {
    this.userService.loadUsers().subscribe();
  }

  users1$ = this.userService.user$.pipe(tap((users) => console.log('users$ emitted:', users)));

  deleteUserCard(userId: number) {
    this.userService.deleteUser(userId);
  }

  onCreateUser(newUser: IUser) {
    this.userService.addUser(newUser).subscribe();
  }

  onFilterChange(search: string) {
    this.filterQuery$.next(search);
  }
}
