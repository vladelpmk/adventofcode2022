import '../utils/array';
import { readNumberMatrix } from '../utils/file';

const treeline = readNumberMatrix('input.txt');

const countTillFirst = (array: number[], till: number) => {
  let count = 0;
  for (let item of array) {
    count++;
    if (till <= item) {
      return count;
    }
  }
  return count;
};

const getScenicScore = (matrix: number[][], row: number, column: number) => {
  const { left, right, up, down } = getTreeLines(matrix, row, column);
  return (
    countTillFirst(left, matrix[row][column]) *
    countTillFirst(right, matrix[row][column]) *
    countTillFirst(up, matrix[row][column]) *
    countTillFirst(down, matrix[row][column])
  );
};

const getTreeLines = (matrix: number[][], row: number, column: number) => {
  return {
    left: matrix[row].slice(0, column).reverse(),
    right: matrix[row].slice(column + 1),
    up: matrix
      .slice(0, row)
      .map((row) => row[column])
      .reverse(),
    down: matrix.slice(row + 1).map((row) => row[column])
  };
};

const isVisible = (matrix: number[][], row: number, column: number): boolean => {
  const { left, right, up, down } = getTreeLines(matrix, row, column);
  return matrix[row][column] > Math.min(left.max(), right.max(), up.max(), down.max());
};

// part1
let visible = 0;
for (let row in treeline) {
  for (let column in treeline[row]) {
    if (isVisible(treeline, Number(row), Number(column))) {
      visible++;
    }
  }
}
console.log(visible);

// part2
let scenicScores = [];
for (let row in treeline) {
  for (let column in treeline[row]) {
    scenicScores.push(getScenicScore(treeline, Number(row), Number(column)));
  }
}
console.log(scenicScores.max());
