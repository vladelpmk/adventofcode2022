export class Monkey {
  id: number;
  items: number[];
  operationString = '';
  devisableBy: number;
  ifTrue: number;
  ifFalse: number;
  numberOfInspections = 0;

  constructor(monkey: string) {
    const parts = monkey.split('\n');
    this.id = Number(parts[0].replace('Monkey ', '').replace(':', ''));
    this.items = parts[1]
      .replace('Starting items: ', '')
      .split(', ')
      .map((i) => Number(i));

    this.operationString = parts[2].replace('  Operation: new = ', '');
    this.devisableBy = Number(parts[3].replace('  Test: divisible by ', ''));

    this.ifTrue = Number(parts[4].replace('    If true: throw to monkey ', ''));
    this.ifFalse = Number(parts[5].replace('    If false: throw to monkey ', ''));
  }

  inspectItemWorryLevel = (item: number): number => {
    this.numberOfInspections++;
    return this.operation(item);
  };

  afterInspectWorryLevel = (item: number): number => {
    return Math.floor(item / 3);
  };

  operation = (old: number): number => {
    return eval(this.operationString) as number;
  };

  test = (item: number) => {
    return item % this.devisableBy === 0;
  };

  trowTo = (item: number) => {
    if (this.test(item)) {
      return this.ifTrue;
    }
    return this.ifFalse;
  };
}
