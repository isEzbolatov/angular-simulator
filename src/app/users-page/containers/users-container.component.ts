import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users-container',
  imports: [],
  templateUrl: './users-container.component.html',
  styleUrl: './users-container.component.scss',
})
export class UsersContainerComponent {
  private userService = inject(UserService);

  public users$ = this.userService.user$;

  ngOnInit() {
    this.userService.loadUsers().subscribe();
  }

  public users1$ = this.userService.user$.pipe(
    tap(users => console.log('users$ emitted:', users))
  );
}
