import { readFile } from '../utils/file';

const file = readFile('input.txt');
const [containersList, movesList] = file.split('\n\n').map((i) => i.split('\n'));

const moves = movesList.map((row) => {
  const [move, from, to] = row
    .replace('move ', '')
    .replace('from ', '')
    .replace('to ', '')
    .split(' ')
    .map((i) => Number(i));
  return { move, from, to };
});

const getContainerArrays = (containersList: Array<string>) => {
  const rowNumbers = containersList.pop();

  let containers: string[][] = [];
  const numberOfRows = Number(rowNumbers.replaceAll('   ', ',').replaceAll(' ', '').split(',').pop());

  for (let index = 0; index < numberOfRows; index++) {
    containers.push([]);
  }

  containersList.forEach((row) => {
    const cR = row
      .replaceAll(' [', '[')
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll('   ', '.')
      .replaceAll(' ', '')
      .split('');

    cR.forEach((value, index) => {
      if (value !== '.') {
        containers[index].push(value);
      }
    });
  });
  return containers;
};

/// part 1
const containers1 = getContainerArrays([...containersList]);

moves.forEach((move) => {
  for (let index = 0; index < move.move; index++) {
    const el = containers1[move.from - 1].shift();
    containers1[move.to - 1].unshift(el);
  }
});

console.log(containers1.map((i) => i[0]).join(''));

/// part 2
const containers2 = getContainerArrays([...containersList]);

moves.forEach((move) => {
  const ct = containers2[move.from - 1].slice(0, move.move);
  containers2[move.from - 1] = containers2[move.from - 1].slice(move.move);
  containers2[move.to - 1] = [...ct, ...containers2[move.to - 1]];
});

console.log(containers2.map((i) => i[0]).join(''));
