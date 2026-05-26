import { concatAll, reduce } from "rxjs";

// (3) Функция, которая возвращает сумму двух чисел.
export class Training {
  firstNumber: number;
  secondNumber: number;

  constructor(firstNumber: number, secondNumber: number) {
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
  }

  getSumOfNumbers() {
    const sum: number = this.firstNumber + this.secondNumber;
    console.log(sum);
  }
}

// (4) Переменная status, которая может быть только: "loading", "success", "error".
let status: 'loading' | 'success' | 'error';

// (5) Переменная textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'".
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

// (6)  Интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным.
export interface IUserInfo {
  id: number;
  name: string;
  surname: string;
  city: string;
  language?: string;
}

// (7) Интерфейс, который расширяется интерфейсом User с задания №6 и имеет свои дополнительные поля.
export interface IUserStatus extends IUserInfo {
  status: boolean;
}

// (8) Функцию, которая принимает строку и вариант,
// как именно форматировать строку (задание №5) и на основе этого возвращает форматированную строку.
function getformatText(text: string, textFormat: 'uppercase' | 'lowercase' | 'capitalize') {
  if (textFormat === 'uppercase') {
    return text.toUpperCase();
  } else if (textFormat === 'capitalize') {
    return text[0].toUpperCase() + text.slice(1);
  } else if (textFormat === 'lowercase') {
    return text.toLowerCase();
  } else {
    return text;
  }
}

// (9) Функция, которая принимает строку и символ, возвращает строку без переданного символа.
function getRemoveChar(text: string, charsToRemove: string): string {
  return text.replaceAll(charsToRemove, '');
}

// (10) Массив объектов на основе интерфейса с задания №6. Отфильтровать его по одному из параметров.
const usersList: IUserInfo[] = [
  {
    id: 1,
    name: 'Алексей',
    surname: 'Петров',
    city: 'Москва',
    language: 'Russian'
  },
  {
    id: 2,
    name: 'Дмитрий',
    surname: 'Иванов',
    city: 'Минск',
    language: 'Russian'
  },
  {
    id: 3,
    name: 'Елена',
    surname: 'Сидорова',
    city: 'Москва',
    language: 'Russian'
  }
];

const filteredUsers = usersList.filter(user => user.city === 'Москва');
