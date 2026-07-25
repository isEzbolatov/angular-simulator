import { Component, inject } from '@angular/core';
import { IOffer } from '../../interfaces/IOffer';
import { IDestination } from '../../interfaces/IDestination';
import { ITravelCards } from '../../interfaces/ITravelCards';
import { colors } from '../../enums/Color';
import { LocalStorageService } from './../local-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MessageTextService } from '../../message-text.service';
import { faPeopleGroup, faShield, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  localStorageService: LocalStorageService = inject(LocalStorageService);
  renderTextService: MessageTextService = inject(MessageTextService);

  public loremIpsum: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur"и занялся его поисками в классической латинской литературе.';
  public loremIpsumFooter: string = 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney.';
  public locationTour: string = '';
  public currentDate: Date = new Date;
  public liveText: string = '';
  public date: string = '';
  public participantsCount: number = 0;

  public offerData: IOffer = {
    id: 1,
    title: 'Лучшие программы для тебя',
    description: 'Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа.',
    features: [
      {
        id: 1,
        icon: faPeopleGroup,
        iconClass: 'team',
        title: 'Опытный гид',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
      {
        id: 2,
        icon: faShield,
        iconClass: 'security',
        title: 'Безопасный поход',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
      },
      {
        id: 3,
        icon: faTag,
        iconClass: 'discount',
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
}
