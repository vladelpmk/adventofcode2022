import { PathOrFileDescriptor, readFileSync } from 'fs';

export const readFile = (fileName: string): string => readFileSync(fileName as PathOrFileDescriptor).toString('utf-8');

export const readLines = (fileName: string): string[] => readFile(fileName).split('\n');

export const readMatrix = (fileName: string): string[][] => readLines(fileName).map((i) => i.split(''));

export const readNumberMatrix = (fileName: string): number[][] =>
  readMatrix(fileName).map((row) => row.map((i) => Number(i)));
