export default class Range {
  private start: number;
  private end: number;

  constructor(range: string) {
    const [start, end] = range.split('-');
    this.start = Number(start);
    this.end = Number(end);
  }

  public fullyOverlap(rage: Range): boolean {
    return (this.start <= rage.start && this.end >= rage.end) || (this.start >= rage.start && this.end <= rage.end);
  }

  public overlap(rage: Range): boolean {
    return (this.start <= rage.start && this.end >= rage.start) || (this.start >= rage.start && this.start <= rage.end);
  }
}
