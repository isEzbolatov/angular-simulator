import { computed, inject } from '@angular/core';
import {
  getQueryMapperForState,
  withSyncToRouteQueryParams,
  withSyncToWebStorage,
} from '@ngrx-traits/signals';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withRequestStatus } from '../../../core/state/with-request-status.feature';
import { IUser } from '../models/user.model';
import { UserApiService } from '../services/user-api.service';

interface IUsersState {
  users: IUser[];
  search: string;
}

const initialState: IUsersState = {
  users: [],
  search: '',
};

export const UsersStore = signalStore(
  withDevtools('users'),
  withState(initialState),
  withRequestStatus<IUser[]>('Не удалось загрузить пользователей'),
  withSyncToWebStorage({
    key: 'users-page-state',
    type: 'local',
    restoreOnInit: true,
    saveStateChangesAfterMs: 300,
    filterState: ({ users, search }) => ({ users, search }),
  }),
  withSyncToRouteQueryParams({
    mappers: [getQueryMapperForState({ search: 'string' })],
    defaultDebounce: 250,
    restoreOnInit: true,
  }),
  withComputed(({ users, search }) => ({
    filteredUsers: computed(() => {
      const normalizedSearch = search().trim().toLowerCase();
      return users().filter((user) => user.name.toLowerCase().includes(normalizedSearch));
    }),
  })),
  withMethods((store, userApi = inject(UserApiService)) => {
    const loadUsers = (): void => {
      if (store.users().length > 0) {
        return;
      }

      store.executeRequest({
        request: userApi.getUsers(),
        onSuccess: (users) => {
          patchState(store, { users });
        },
      });
    };

    return {
      loadUsers,
      retry: loadUsers,
      setSearch(search: string): void {
        patchState(store, { search: search.trim() });
      },
      addUser(user: IUser): void {
        const users = [...store.users(), user];
        patchState(store, { users });
      },
      deleteUser(userId: number): void {
        const users = store.users().filter((user) => user.id !== userId);
        patchState(store, { users });
      },
    };
  }),
);
