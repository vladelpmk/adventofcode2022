import '../utils/array';
import { readLines } from '../utils/file';

const instructions = readLines('input.txt');

let cycle = 0;
let registerX = 1;
let result = 0;
let screen: string[] = [...Array(240)].map((i) => '.');

const IMPORTANT_CYCLES = [20, 60, 100, 140, 180, 220];

const isImportantCycle = () => {
  drawScreen();
  if (IMPORTANT_CYCLES.includes(cycle)) {
    result += cycle * registerX;
  }
};

const doInstruction = (instruction: string): void => {
  const [operation, value] = instruction.split(' ');

  switch (operation) {
    case 'addx': {
      cycle = cycle + 1;
      isImportantCycle();
      cycle = cycle + 1;
      isImportantCycle();
      registerX = registerX + Number(value);
      break;
    }
    case 'noop': {
      cycle = cycle + 1;
      isImportantCycle();
      break;
    }
  }
};

const drawScreen = () => {
  const column = (cycle - 1) % 40;
  screen[cycle - 1] = registerX - 1 <= column && column <= registerX + 1 ? '#' : '.';
};

for (const instruction of instructions) {
  doInstruction(instruction);
}

console.log(result);

console.log(screen.slice(0, 40).join(''));
console.log(screen.slice(40, 80).join(''));
console.log(screen.slice(80, 120).join(''));
console.log(screen.slice(120, 160).join(''));
console.log(screen.slice(160, 200).join(''));
console.log(screen.slice(200, 240).join(''));
