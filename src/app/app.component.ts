import { Component } from '@angular/core';
import { Training } from './training';
import { IUserInfo } from './training';
import { colors } from '../enums/Color';
import { Collection } from './collection';
import { IOffer } from '../interfaces/IOffer';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public companyName: string = 'румтибет';
  public loremIpsum: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.';
  public locationTour: string = '';
  public date: string = '';
  public participantsCount: string = '';
  public currentDate: Date = new Date;
  public showTimer: boolean = true;
  public count: number = 0;
  public liveText: string = '';
  public loadingWebsite: boolean = false;

  public offerData: IOffer = {
    id: 1,
    title: 'Лучшие программы для тебя',
    description: 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.',
    features: [
      {
        id: 1,
        icon: 'images/offer-icons/guide-icon.svg',
        title: 'Опытный гид',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
      {
        id: 2,
        icon: 'images/offer-icons/security-icon.svg',
        title: 'Безопасный поход',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
      {
        id: 3,
        icon: 'images/offer-icons/prices-icon.svg',
        title: 'Лояльные цены',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      }
    ]
  }

  constructor() {
    this.saveLastVisitDate();
    this.saveCountVisit();

    setInterval(() => {
      this.currentDate = new Date();
    }, 1000)

    setInterval(() => {
      this.loadingWebsite = true;
    }, 2000)
  }

  // (ДЗ 15.2) Метод который проверяет, является ли переданный цвет основным и возвращает true/false.
  public checkMainColor(color: string): boolean {
    if (color === colors.BLUE || color === colors.GREEN || color === colors.RED) {
      return true;
    } else {
      return false;
    }
  }

  // (ДЗ 15.3) Метод, который сохраняет в локальное хранилище дату последнего захода на страницу.
  private saveLastVisitDate(): void {
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
  private saveCountVisit(): void {
    const savedCount = localStorage.getItem('visitCount');
    let count: number = savedCount ? parseInt(savedCount, 10) : 0
    count++;
    localStorage.setItem('visitCount', count.toString());
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

Collection;