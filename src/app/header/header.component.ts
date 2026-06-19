import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { MessageTextService } from '../../message-text.service';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { INavigation } from '../../interfaces/INavigation';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  renderTextService: MessageTextService = inject(MessageTextService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  public companyName: string = 'румтибет';
  public currentDate: Date = new Date;
  public showTimer: boolean = true;
  public count: number = 0;

  public routerLink = [
    {
      path: '',
      label: 'Главная'
    },
    {
      path: '/users',
      label: 'Пользователи'
    }
  ]

  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000)
  }

  // (ДЗ 16.5) Счетчик кликов.
  incrementCount() {
    this.count += 1;
  }

  decrementCount() {
    if (this.count > 0) {
      this.count -= 1;
    }
  }

  // (ДЗ 16.6) Кнопка, которая при нажатии отображает в шапке ИЛИ 4, ИЛИ 5 задачу.
  toggleWidget() {
    this.showTimer = !this.showTimer;
  }
}
