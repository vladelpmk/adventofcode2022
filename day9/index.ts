import '../utils/array';
import { readLines } from '../utils/file';

const moves = readLines('input.txt');

const getDirection = (move: string): [string, number] => {
  const [direction, amount] = move.split(' ');
  return [direction, Number(amount)];
};

const moveTo = (state: [number, number], direction: string): [number, number] => {
  switch (direction) {
    case 'R': {
      return [state[0], state[1] + 1];
    }
    case 'L': {
      return [state[0], state[1] - 1];
    }
    case 'U': {
      return [state[0] + 1, state[1]];
    }
    case 'D': {
      return [state[0] - 1, state[1]];
    }
  }
  return [...state];
};

const isNextTo = (l1: [number, number], l2: [number, number]): boolean => {
  return (
    (l1[0] - 1 === l2[0] || l1[0] + 1 === l2[0] || l1[0] === l2[0]) &&
    (l1[1] - 1 === l2[1] || l1[1] + 1 === l2[1] || l1[1] === l2[1])
  );
};

const chaiseTo = (l1: [number, number], l2: [number, number]): string[] => {
  const dx = l1[0] - l2[0]; // up down
  const dy = l1[1] - l2[1]; // left right

  if (dx === 0 && dy === 0) {
    return [];
  }

  if (dy === 0) {
    if (dx < 0) {
      return ['U'];
    }
    if (dx > 0) {
      return ['D'];
    }
  }

  if (dx === 0) {
    if (dy < 0) {
      return ['R'];
    }
    if (dy > 0) {
      return ['L'];
    }
  }

  if (dx !== 0 && dy !== 0) {
    if (dx < 0 && dy < 0) {
      return ['U', 'R'];
    }
    if (dx < 0 && dy > 0) {
      return ['U', 'L'];
    }
    if (dx > 0 && dy < 0) {
      return ['D', 'R'];
    }
    if (dx > 0 && dy > 0) {
      return ['D', 'L'];
    }
  }
};

const moveTail = (state: [number, number], headLocation: [number, number]): [number, number] => {
  if (!isNextTo(state, headLocation)) {
    const chaise = chaiseTo(state, headLocation);
    let ts: [number, number] = [...state];
    for (let move of chaise) {
      ts = moveTo(ts, move);
    }
    return [...ts];
  }
  return [...state];
};

// part 1
let headLocation: [number, number] = [0, 0];
let tailLocation: [number, number] = [0, 0];

let tailLocations: [number, number][] = [];

for (let move of moves) {
  const [direction, amount] = getDirection(move);
  for (let i = 0; i < amount; i++) {
    headLocation = moveTo(headLocation, direction);
    tailLocation = moveTail(tailLocation, headLocation);
    tailLocations.push(tailLocation);
  }
}
console.log(tailLocations.unique().length);

// part 2
let headLocation1: [number, number] = [0, 0];
let tails: [number, number][] = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0]
];
let tailLocation1: [number, number] = [0, 0];
let tailLocation2: [number, number] = [0, 0];
let tailLocation3: [number, number] = [0, 0];
let tailLocation4: [number, number] = [0, 0];
let tailLocation5: [number, number] = [0, 0];
let tailLocation6: [number, number] = [0, 0];
let tailLocation7: [number, number] = [0, 0];
let tailLocation8: [number, number] = [0, 0];
let tailLocation9: [number, number] = [0, 0];

let tailLocations1: [number, number][] = [];

for (let move of moves) {
  const [direction, amount] = getDirection(move);
  for (let i = 0; i < amount; i++) {
    headLocation1 = moveTo(headLocation1, direction);
    tailLocation1 = moveTail(tailLocation1, headLocation1);
    tailLocation2 = moveTail(tailLocation2, tailLocation1);
    tailLocation3 = moveTail(tailLocation3, tailLocation2);
    tailLocation4 = moveTail(tailLocation4, tailLocation3);
    tailLocation5 = moveTail(tailLocation5, tailLocation4);
    tailLocation6 = moveTail(tailLocation6, tailLocation5);
    tailLocation7 = moveTail(tailLocation7, tailLocation6);
    tailLocation8 = moveTail(tailLocation8, tailLocation7);
    tailLocation9 = moveTail(tailLocation9, tailLocation8);
    tailLocations1.push(tailLocation9);
  }
}
console.log(tailLocations1.unique().length);
