import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() deleteUser = new EventEmitter<number>();

  onDelete() {
    this.deleteUser.emit(this.user.id);
  }
}
