import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { MessageTextService } from '../../message-text.service';
import { DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { merge, scan, startWith, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ToggleSwitchModule, ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../theme.service';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, RouterLinkActive, AsyncPipe, ToggleSwitch, SelectButtonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  renderTextService: MessageTextService = inject(MessageTextService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  themeService = inject(ThemeService);

  public companyName: string = 'румтибет';
  public currentDate: Date = new Date;
  public showTimer: boolean = true;

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

  //Переписал счётчик на RxJS формат
  private increment$ = new Subject<number>();
  private decrement$ = new Subject<number>();

  counter = merge(this.increment$, this.decrement$).pipe(
    startWith(0),
    scan((acc, delta) => Math.max(acc + delta, 0))
  )

  // (ДЗ 16.5) Счетчик кликов.
  incrementCount() {
    this.increment$.next(1);
  }

  decrementCount() {
    this.decrement$.next(-1);
  }

  // (ДЗ 16.6) Кнопка, которая при нажатии отображает в шапке ИЛИ 4, ИЛИ 5 задачу.
  toggleWidget() {
    this.showTimer = !this.showTimer;
  }

  stateOptions: any[] = [
    { label: 'aura', value: 'aura' },
    { label: 'lara', value: 'lara' },
    { label: 'nora', value: 'nora' }
  ];
  value: string = 'one-way';
}
