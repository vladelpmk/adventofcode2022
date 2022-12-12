import { readMatrix } from '../utils/file';

const map = readMatrix('input.txt');
const height = map.length;
const length = map[0].length;

const find = (value: string): { i: number; j: number } => {
  for (let i = 0; i < map.length; i++) {
    const j = map[i].indexOf(value);
    if (j !== -1) {
      return { i, j };
    }
  }
};

const getValue = (char: string): number => {
  if (char === 'S') {
    return 0;
  }
  if (char === 'E') {
    return 25;
  }
  return Number(char.toLowerCase().charCodeAt(0) - 97);
};

const nextSteps = (i: number, j: number, direction: 'UP' | 'DOWN' = 'UP') => {
  let locations = [];

  if (i - 1 >= 0) {
    locations.push([i - 1, j]);
  }
  if (i + 1 < height) {
    locations.push([i + 1, j]);
  }

  if (j - 1 >= 0) {
    locations.push([i, j - 1]);
  }
  if (j + 1 < length) {
    locations.push([i, j + 1]);
  }

  return locations
    .filter((k) => {
      switch (direction) {
        case 'UP': {
          return getValue(map[k[0]][k[1]]) <= getValue(map[i][j]) + 1;
        }
        case 'DOWN': {
          return getValue(map[k[0]][k[1]]) >= getValue(map[i][j]) - 1;
        }
      }
    })
    .map((k) => ({ i: k[0], j: k[1] }));
};

///Dijksra

const findSteps = (start: { i: number; j: number }, endOn: string, direction: 'UP' | 'DOWN' = 'UP') => {
  const visited = [
    ...Array(height)
      .fill([])
      .map((i) => [
        ...Array(length)
          .fill([])
          .map((i) => false)
      ])
  ];

  let heap = [
    {
      steps: 0,
      ...start
    }
  ];
  while (true) {
    const { steps, i, j } = heap.shift();

    if (visited[i][j]) {
      continue;
    }

    visited[i][j] = true;

    if (map[i][j] === endOn) {
      return steps;
    }

    for (let next of nextSteps(i, j, direction)) {
      heap.push({
        steps: steps + 1,
        ...next
      });
    }
  }
};

console.log('part 1', findSteps(find('S'), 'E'));
console.log('part 2', findSteps(find('E'), 'a', 'DOWN'));
