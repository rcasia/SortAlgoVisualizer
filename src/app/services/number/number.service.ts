import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  numbers!: number[];

  constructor() {
    this.numbers = [5, 4, 3, 2, 1];
  }

  getNumbers(): Observable<number[]> {
    return new Observable<number[]>((subscriber) => {
      subscriber.next(this.numbers);
    });
  }

  randomnize(): void {
    this.numbers.splice(0);

    for (let i = 0; i < 10; i++) {
      this.numbers.push(Math.floor(Math.random() * 100));
    }
  }
}
