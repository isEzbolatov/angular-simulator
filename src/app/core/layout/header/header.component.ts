import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { MessageTextService } from '../../services/message-text.service';
import { DatePipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { merge, scan, startWith, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ThemeService } from '../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AuthService } from '../../../features/auth/services/auth.service';
import { APP_CONFIG } from '../../config/app-config.token';

@Component({
  selector: 'app-header',
  imports: [
    DatePipe,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    ToggleSwitch,
    SelectButtonModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  private appConfig = inject(APP_CONFIG);

  private router = inject(Router);

  isAuthenticated = this.authService.authState;

  renderTextService: MessageTextService = inject(MessageTextService);

  localStorageService: LocalStorageService = inject(LocalStorageService);

  themeService = inject(ThemeService);

  companyName = this.appConfig.companyName;

  enableTheming = this.appConfig.enableTheming;

  currentDate: Date = new Date();

  showTimer: boolean = true;

  routerLink = [
    {
      path: '',
      label: 'Главная',
    },
    {
      path: '/users',
      label: 'Пользователи',
    },
  ];

  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  //Переписал счётчик на RxJS формат
  private increment$ = new Subject<number>();

  private decrement$ = new Subject<number>();

  counter = merge(this.increment$, this.decrement$).pipe(
    startWith(0),
    scan((acc, delta) => Math.max(acc + delta, 0)),
  );

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

  themeOptions = [
    { label: 'Aura', value: 'aura' },
    { label: 'Lara', value: 'lara' },
    { label: 'Nora', value: 'nora' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
