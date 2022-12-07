import '../utils/array';
import { readLines } from '../utils/file';

const lines = readLines('input.txt');

const isCommand = (line: string) => line.startsWith('$');

const isCd = (line: string) => line.startsWith('$ cd');

const isLs = (line: string) => line.startsWith('$ ls');

const isDir = (line: string) => line.startsWith('dir ');

const changeCurrentDir = (line: string, currentDir: string[]) => {
  const cd = [...currentDir];
  const goTo = line.split('$ cd ')[1];
  switch (goTo) {
    case '/':
      return [];
    case '..': {
      cd.pop();
      return cd;
    }
  }
  return [...cd, goTo];
};

let tree = [];
let currentDir = [];
let inLs = false;

for (let line of lines) {
  if (isCd(line)) {
    currentDir = changeCurrentDir(line, currentDir);
    continue;
  }

  if (isLs(line)) {
    inLs = true;
    continue;
  }

  if (inLs && isCommand(line)) {
    inLs = false;
    continue;
  }

  if (inLs) {
    if (isDir(line)) {
      const dir = {
        isDir: true,
        path: [...currentDir, line.split(' ')[1]].join('/')
      };
      tree.push(dir);
    } else {
      const dir = {
        isDir: false,
        path: [...currentDir].join('/'),
        pathArray: [...currentDir],
        file: line.split(' ')[1],
        size: Number(line.split(' ')[0])
      };
      tree.push(dir);
    }
  }
}

const folders = tree.map((i) => i.path).unique();

const getFolderSize = (folder: string): number =>
  tree
    .filter((treeItem) => treeItem.path.startsWith(folder) && !treeItem.isDir)
    .map((i) => i.size)
    .sum();

const folderSize = folders.map((folder) => getFolderSize(folder));
console.log(folderSize.filter((i) => i < 100000).sum());

const spaceNeeded = 30000000 - (70000000 - getFolderSize(''));
console.log(folderSize.sortNumbers('DSC').find((s) => s >= spaceNeeded));
