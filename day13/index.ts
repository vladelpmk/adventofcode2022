import { readFile } from '../utils/file';

const pairs = readFile('input.txt').split('\n\n');

const makeArray = (item) => (Array.isArray(item) ? item : [item]);

const compare = (left, right) => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      return 1;
    }
    if (left === right) {
      return 0;
    }
    return -1;
  }
  left = makeArray(left);
  right = makeArray(right);

  for (let i = 0; i < left.length || i < right.length; i++) {
    if (left[i] === undefined && right[i] === undefined) {
      return 0;
    }
    if (left[i] === undefined) {
      return 1;
    }

    if (right[i] === undefined) {
      return -1;
    }

    const x = compare(left[i], right[i]);
    if (typeof x === 'number' && x !== 0) {
      return x;
    }
  }
};

// part 1
let result = 0;
for (let i = 0; i < pairs.length; i++) {
  const [left, right] = pairs[i].split('\n').map((i) => JSON.parse(i));
  const x = compare(left, right);
  if (x === 1) {
    result = result + i + 1;
  }
}

console.log('part 1:', result);

//part2
let list = readFile('input.txt')
  .replace(/\n\n/g, '\n')
  .split('\n')
  .map((i) => JSON.parse(i))
  .concat([[[6]], [[2]]])
  .sort((left, right) => {
    return compare(left, right);
  })
  .reverse();

console.log(
  'part 2',
  (list.findIndex((i) => JSON.stringify(i) === '[[6]]') + 1) *
    (list.findIndex((i) => JSON.stringify(i) === '[[2]]') + 1)
);
