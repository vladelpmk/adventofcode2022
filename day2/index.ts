import "../utils/array";
import { readFile } from "../utils/file"; 

const input = readFile("input.txt");

const gameScore1 = (game: String): number => {
    switch (game) {
      case "A X":
        return 4;
      case "A Y":
        return 8;
      case "A Z":
       return 3;
      case "B X":
        return 1;
      case "B Y":
        return 5;
      case "B Z":
       return 9;
      case "C X":
       return 7;
      case "C Y":
       return 2;
      case "C Z":
       return 6;
    }
    return 0;
};


const score1 = input.split("\n")
  .map((game) => gameScore1(game))
  .sum();

console.log(score1);

const gameScore2 = (game: String): number => {
    switch (game) {
      case "A X":
        return 3;
      case "B X":
        return 1;
      case "C X":
        return 2;
      case "A Y":
        return 4;
      case "B Y":
        return 5;
      case "C Y":
        return 6;
      case "A Z":
        return 8;
      case "B Z":
        return 9;
      case "C Z":
        return 7;
    }
  return 0;
};


const score2 = input.split("\n")
  .map((game) => gameScore2(game))
  .sum();

console.log(score2);