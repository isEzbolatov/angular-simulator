import { Component } from '@angular/core';
import { Training } from './training';
import { IUserInfo } from './training';
import { colors } from '../enums/Color';
import { Collection } from './collection';
import { IOffer } from '../interfaces/IOffer';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  companyName: string = 'румтибет';
  loremIpsum: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.';

  offerData: IOffer = {
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
