import { Component, inject } from '@angular/core';
import { Training } from './training';
import { IUserInfo } from './training';
import { colors } from '../enums/Color';
import { Collection } from './collection';
import { IOffer } from '../interfaces/IOffer';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IDestination } from '../interfaces/IDestination';
import { ITravelCards } from '../interfaces/ITravelCards';
import { IMessage } from '../interfaces/IMessage';
import { MessageTextService } from '../message-text.service';
import { MessageType } from '../enums/MessageType';
import { MessageList } from './message-list/message-list.component';
import { LocalStorageService } from './local-storage.service';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, MessageList],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  renderTextService: MessageTextService = inject(MessageTextService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

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

  public destinationData: IDestination[] = [
    {
      id: 1,
      imageUrl: 'images/mountain-lake.png',
      rating: 4.9,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480
    },
    {
      id: 2,
      imageUrl: 'images/mountain-night.png',
      rating: 4.5,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500
    },
    {
      id: 3,
      imageUrl: 'images/mountain-yoga.png',
      rating: 5.0,
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      price: 230
    }
  ]

  public travelCards: ITravelCards[] = [
    {
      id: 1,
      imageUrl: 'images/manarola.png',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      data: '01/04/2023',
    },
    {
      id: 2,
      imageUrl: 'images/airplane.png',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      data: '01/04/2023'
    },
    {
      id: 3,
      imageUrl: 'images/backpacker.png',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      data: '01/04/2023'
    },
    {
      id: 4,
      imageUrl: 'images/taj-mahal.png',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      data: '01/04/2023'
    }
  ]

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
    const lastVisit: string | null = this.localStorageService.get('lastVisit');
    let dateArray: string[] = [];
    const date: Date = new Date();
    dateArray.push(date.toString());
    this.localStorageService.set('lastVisit', dateArray);
  }

  // (ДЗ 15.4) Метод, который сохраняет в localStorage количество заходов на страницу.
  private saveCountVisit(): void {
    const savedCount = this.localStorageService.get<number>('visitCount');
    const count = (savedCount ?? 0) + 1;
    this.localStorageService.set('visitCount', count);
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