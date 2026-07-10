import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../user.service';
import { tap } from 'rxjs';
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  private userService = inject(UserService);

  public users$ = this.userService.user$;

  ngOnInit() {
    this.userService.loadUsers().subscribe();
  }

  public users1$ = this.userService.user$.pipe(
    tap(users => console.log('users$ emitted:', users))
  );
}
