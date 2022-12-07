declare interface Array<T> {
  sum(this: Array<number>): number;
  max(this: Array<number>): number;
  sortNumbers(this: Array<number>, direction?: 'ASC' | 'DSC'): Array<number>;
  unique(this: Array<any>): Array<any>;
  intersect(this: Array<any>, array: Array<any>): Array<any>;
}

Object.defineProperty(Array.prototype, 'sum', {
  value: function (this: Array<number>): number {
    return this.reduce((acc, now) => acc + now, 0);
  }
});

Object.defineProperty(Array.prototype, 'max', {
  value: function (this: Array<number>): number {
    return Math.max(...this);
  }
});

Object.defineProperty(Array.prototype, 'sortNumbers', {
  value: function (this: Array<number>, direction = 'ASC'): Array<number> {
    return this.sort((a, b) => {
      switch (direction) {
        case 'ASC':
          return b - a;
        case 'DSC':
          return a - b;
      }
    });
  }
});

Object.defineProperty(Array.prototype, 'unique', {
  value: function (this: Array<any>): Array<any> {
    return this.filter((value, index, self) => self.indexOf(value) === index);
  }
});

Object.defineProperty(Array.prototype, 'intersect', {
  value: function (this: Array<any>, array: Array<any>): Array<any> {
    return this.filter((value) => array.includes(value)).unique();
  }
});
