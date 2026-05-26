import { Component } from '@angular/core';
import { Training } from './training';
import { IUserInfo } from './training';
import { colors } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  companyName: string = 'румтибет';

  constructor() {
    this.saveLastVisitDate();
    this.saveCountVisit();

  }

  // (ДЗ 15.2) Метод который проверяет, является ли переданный цвет основным и возвращает true/false.
  checkMainColor(color: string): boolean {
    if (color === colors.BLUE || color === colors.GREEN || color === colors.RED) {
      return true;
    } else {
      return false;
    }
  }

  // (ДЗ 15.3) Метод, который сохраняет в локальное хранилище дату последнего захода на страницу.
  saveLastVisitDate(): void {
    const lastVisit = localStorage.getItem('lastVisit')
    let dateArray: string[] = [];

    if (lastVisit) {
      dateArray = JSON.parse(lastVisit);
    }
    const date: Date = new Date();
    dateArray.push(date.toString());
    localStorage.setItem('lastVisit', JSON.stringify(dateArray));
  }

  // (ДЗ 15.4) Метод, который сохраняет в localStorage количество заходов на страницу.
  saveCountVisit(): void {
    const savedCount = localStorage.getItem('visitCount');
    let count: number = savedCount ? parseInt(savedCount, 10) : 0
    count++;
    localStorage.setItem('visitCount', count.toString());
  }
}

Collection;
