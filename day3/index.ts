import '../utils/array';
import { readLines } from '../utils/file';

const lines = readLines('input.txt');

const splitStringOnHalf = (input: string): Array<string> => {
  return [input.substring(0, input.length / 2), input.substring(input.length / 2, input.length)];
};

const getLetterWeight = (input: string): number => {
  var alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return alphabet.indexOf(input) + 1;
};

// part 1
const result1 = lines
  .map((line) => {
    const [firstCompartment, secondCompartment] = splitStringOnHalf(line);
    return firstCompartment
      .split('')
      .intersect(secondCompartment.split(''))
      .map((i) => getLetterWeight(i))
      .sum();
  })
  .sum();
console.log(result1);

// part 2
let i = 0;
let result2 = 0;
while (i < lines.length) {
  const group = lines.slice(i, i + 3);
  result2 += group[0]
    .split('')
    .intersect(group[1].split(''))
    .intersect(group[2].split(''))
    .map((i) => getLetterWeight(i))
    .sum();
  i += 3;
}
console.log(result2);
