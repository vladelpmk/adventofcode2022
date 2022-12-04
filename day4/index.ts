import '../utils/array';
import { readLines } from '../utils/file';
import Range from '../utils/range';

const lines = readLines('input.txt');

//Part 1
let result1 = 0;
lines.forEach((line) => {
  const [r1, r2] = line.split(',');
  if (new Range(r1).fullyOverlap(new Range(r2))) {
    result1++;
  }
});
console.log(result1);

//Part 2
let result2 = 0;
lines.forEach((line) => {
  const [r1, r2] = line.split(',');
  if (new Range(r1).overlap(new Range(r2))) {
    result2++;
  }
});
console.log(result2);
