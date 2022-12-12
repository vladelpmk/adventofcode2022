import '../utils/array';
import { readFile } from '../utils/file';
import { Monkey } from './monkey';

const monkeyInputs = readFile('input.txt').split('\n\n');

const calculateMonkeyBusiness = (monkeyInputs: string[], rounds = 20, relief = true) => {
  const monkeys: Monkey[] = [];
  for (const monkeyInput of monkeyInputs) {
    monkeys.push(new Monkey(monkeyInput));
  }

  const denominator = monkeys
    .map((monkey) => monkey.devisableBy)
    .unique()
    .reduce((a, b) => a * b, 1);

  let round = 1;

  while (round < rounds + 1) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        let worryLevel = monkey.inspectItemWorryLevel(item);
        if (relief) {
          worryLevel = monkey.afterInspectWorryLevel(worryLevel);
        }
        worryLevel = worryLevel % denominator; // no information lost here.... as we are only interested in the mod of monkey.devisableBy
        const throwTo = monkey.trowTo(worryLevel);
        monkey.items = monkey.items.filter((i) => i !== item);
        monkeys.find((i) => i.id === throwTo).items.push(worryLevel);
      }
    }
    round++;
  }

  monkeys.sort((a, b) => b.numberOfInspections - a.numberOfInspections);

  return monkeys[0].numberOfInspections * monkeys[1].numberOfInspections;
};

console.log(`monkey business 1 = ${calculateMonkeyBusiness(monkeyInputs)}`);
console.log(`monkey business 2 = ${calculateMonkeyBusiness(monkeyInputs, 10000, false)}`);
