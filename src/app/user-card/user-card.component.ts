import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { BoldOnHoverDirective } from '../bold-on-hover.directive';
import { AnimatedGradientOnHoverDirective } from '../animated-gradient-on-hover.directive';
import { PhoneFormatPipe } from "../phone-format.pipe";

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, BoldOnHoverDirective, AnimatedGradientOnHoverDirective, PhoneFormatPipe],
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
