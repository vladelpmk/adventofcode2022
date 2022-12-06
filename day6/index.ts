import '../utils/array';
import { readFile } from '../utils/file';

const message = readFile('input.txt').split('');

// part 1
let packetMarker = 0
for (; packetMarker < message.length; packetMarker++) {
  if (message.slice(packetMarker, packetMarker + 4).unique().length === 4) {
    break;
  }
}

console.log(packetMarker + 4);


// part 2
let messageMarker = 0
for (; messageMarker < message.length; messageMarker++) {
  if (message.slice(messageMarker, messageMarker + 14).unique().length === 14) {
    break;
  }
}

console.log(messageMarker + 14);