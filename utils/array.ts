declare interface Array<T> {
  sum(this: Array<number>): number;
  max(this: Array<number>): number;
  sortNumbers(this: Array<number>): Array<number>;
}

Object.defineProperty(Array.prototype, "sum", {
  value: function (this: Array<number>): number {
    return this.reduce((acc, now) => acc + now, 0);
  },
});


Object.defineProperty(Array.prototype, "max", {
  value: function (this: Array<number>): number {
    return Math.max(...this);
  },
});


Object.defineProperty(Array.prototype, "sortNumbers", {
  value: function (this: Array<number>): Array<any> {
    return this.sort((a, b) => b - a);
  },
});
