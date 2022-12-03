import '../utils/array';
import { readFile } from '../utils/file';

const calories = readFile('input.txt')
  .split('\n\n')
  .map((elf) => {
    return elf
      .split('\n')
      .map((item) => Number(item))
      .sum();
  });

console.log(calories.max());

console.log(calories.sortNumbers().slice(0, 3).sum());
