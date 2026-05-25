// (ДЗ 15.5) Файл collection.ts, который реализует внутри себя класс Collection, работающий с любым типом данных.
export class Collection<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  getAllElements(): T[] {
    return this.items;
  }

  getSpecificElement(index: number): T | undefined {
    return this.items[index];
  }

  clearCollection(): void {
    this.items = [];
  }

  deleteSpecificElement(index: number): void {
    this.items.splice(index, 1);
  }

  changeSpecificElement(index: number, newItem: T) {
    this.items[index] = newItem;
  }
}

const fruits = new Collection<string>();
fruits.add('apple');
fruits.add('orange');
console.log(fruits.getSpecificElement(1));

const cars: Array<{ [key: string]: string }> = [{ Mercedes: 'W211' }, { LandRover: 'Range Rover' }];
const collectionCars: Collection<Array<{ [key: string]: string }>> = new Collection();
collectionCars.add(cars);
console.log(collectionCars.getAllElements());