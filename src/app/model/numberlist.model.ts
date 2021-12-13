declare const anime: any;

export class NumberList {
  currentOrderMap = new Map();
  lastOrderMapChecked = new Map();

  constructor(numberElements: NodeListOf<Element>) {
    let index = 0;

    numberElements.forEach((element: Element) => {
      this.currentOrderMap.set(index, element);
      index++;
    });

    this.lastOrderMapChecked = new Map(this.currentOrderMap);
  }

  private calculateDistanceBetweenNodes(
    first: HTMLElement,
    second: HTMLElement
  ) {
    let firstRect = first.getBoundingClientRect();
    let secondRect = second.getBoundingClientRect();

    return secondRect.left - firstRect.left;
  }

  private showPair(index: number) {
    return new Promise<void>((resolve) => {
      anime({
        targets: [
          this.currentOrderMap.get(index),
          this.currentOrderMap.get(index + 1),
        ],
        keyframes: [{ translateY: -30, delay: 500 }, { translateY: 0 }],
        easing: 'easeInOutSine',
        complete: (anim: any) => resolve(),
      });
    });
  }

  private showTwoNodesByIndex(firstNodeIndex: number, secondNodeIndex: number) {
    return new Promise<void>((resolve) => {
      anime({
        targets: [
          this.currentOrderMap.get(firstNodeIndex),
          this.currentOrderMap.get(secondNodeIndex),
        ],
        keyframes: [{ translateY: -30, delay: 500 }, { translateY: 0 }],
        easing: 'easeInOutSine',
        complete: (anim: any) => {
          resolve();
        },
      });
    });
  }

  private interchangeByIndex(firstIndex: number, secondIndex: number) {
    return new Promise<void>((resolve) => {
      const first = this.currentOrderMap.get(firstIndex);
      const second = this.currentOrderMap.get(secondIndex);

      const distanceX = this.calculateDistanceBetweenNodes(first, second);

      anime({
        targets: first,
        keyframes: [
          { translateY: -30, delay: 500 },
          { translateX: `+=${distanceX}` },
          { translateY: 0, delay: 100 },
        ],
        easing: 'easeInOutSine',
      });

      anime({
        targets: second,
        keyframes: [
          { translateY: -30, delay: 500 },
          { translateX: `+=${-distanceX}` },
          { translateY: 0, delay: 100 },
        ],
        easing: 'easeInOutSine',
        complete: (anim: any) => {
          resolve();
        },
      });

      // Register order //
      this.currentOrderMap.set(firstIndex, second);
      this.currentOrderMap.set(firstIndex + 1, first);
    });
  }

  private switchOneAndZero(number: Number) {
    if (number == 0) return 1;
    else return 0;
  }

  async bubbleSort() {
    let fromIndex = 0;
    do {
      for (let i = fromIndex; i < this.currentOrderMap.size; i = i + 2) {
        //Ignores the last number with no pair
        if (!this.currentOrderMap.has(i + 1)) continue;

        let firstValue = parseInt(this.currentOrderMap.get(i).innerText);
        let secondValue = parseInt(this.currentOrderMap.get(i + 1).innerText);

        if (firstValue > secondValue) {
          await this.interchangeByIndex(i, i + 1);
        } else {
          await this.showPair(i);
        }
      }
      fromIndex = this.switchOneAndZero(fromIndex);
    } while (!this.isReapeatedSequence());
  }

  isReapeatedSequence(): boolean {
    for (let i = 0; i < this.lastOrderMapChecked.size; i++) {
      let curr = this.currentOrderMap.get(i).innerText;
      let last = this.lastOrderMapChecked.get(i).innerText;

      if (curr !== last) {
        this.lastOrderMapChecked = new Map(this.currentOrderMap);
        return false;
      }
    }

    return true;
  }

  print() {
    console.log(this.currentOrderMap);
  }
}
