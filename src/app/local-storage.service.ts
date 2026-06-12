import { Injectable, KeyValueDiffers } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * Установить значение в localStorage
   * @param key ключ: string
   * @param value значение: any
   */
  public set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Получение значения
   * @param key ключ: string
   * @returns значение или null, если ключ не найден
   */
  public get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  /**
   * Удаление значения из localStorage
   * @param key ключ: string
   */
  public clearElem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Очистка всего хранилища
   */
  public clearAllElem() {
    localStorage.clear();
  }
}