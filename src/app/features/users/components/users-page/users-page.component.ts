import { Component, inject, OnInit } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { IUser } from '../../models/user.model';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { PluralPipe } from '../../../../plural.pipe';
import { BoldOnHoverDirective } from '../../../../bold-on-hover.directive';
import { UsersStore } from '../../store/users.store';

@Component({
  selector: 'app-users-page',
  imports: [
    UserCardComponent,
    UserCreateComponent,
    UsersFilterComponent,
    PluralPipe,
    BoldOnHoverDirective,
  ],
  providers: [UsersStore],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  readonly store = inject(UsersStore);

  isModalOpen: boolean = false;

  ngOnInit() {
    this.store.loadUsers();
  }

  deleteUserCard(userId: number) {
    this.store.deleteUser(userId);
  }

  onCreateUser(newUser: IUser) {
    this.store.addUser(newUser);
  }

  onFilterChange(search: string) {
    this.store.setSearch(search);
  }
}
