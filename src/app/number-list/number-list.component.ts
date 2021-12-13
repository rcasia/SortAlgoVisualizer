import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NumberList } from '../model/numberlist.model';
import { NumberService } from '../services/number/number.service';

@Component({
  selector: 'app-number-list',
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.css'],
})
export class NumberListComponent implements OnInit, AfterViewInit {
  isCurrentlySorting = false;

  numberList!: NumberList;

  number$!: Observable<number[]>;

  constructor(private numberService: NumberService) {}

  ngOnInit(): void {
    this.number$ = this.numberService.getNumbers();
    this.getRandomNumbers();
  }

  ngAfterViewInit() {
    const numberNodeList = document.querySelectorAll('.number');

    this.numberList = new NumberList(numberNodeList);
  }

  bubblesort() {
    this.isCurrentlySorting = true;
    this.numberList.bubbleSort().finally(() => {
      this.isCurrentlySorting = false;
    });
  }

  getRandomNumbers() {
    this.numberService.randomnize();

    setTimeout(() => {
      const numberNodeList = document.querySelectorAll('.number');
      this.numberList = new NumberList(numberNodeList);
    }, 0);
  }
}
