import { PathOrFileDescriptor, readFileSync } from 'fs';

export const readFile = (fileName: string): string => readFileSync(fileName as PathOrFileDescriptor).toString('utf-8');

export const readLines = (fileName: string): Array<string> => readFile(fileName).split('\n');
