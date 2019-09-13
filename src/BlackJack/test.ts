import * as readlineSync from 'readline-sync';

let resul = readlineSync.keyIn('Whats up', { limit: 'hsp' });
console.log(resul);
resul = readlineSync.keyIn('Whats up', { limit: 'hsp' });
console.log(resul);
resul = readlineSync.keyIn('Whats up', { limit: 'hsp' });
console.log(resul);

readlineSync.keyInYNStrict('yo?');
let res = readlineSync.questionFloat('woah');
console.log(res);
res = readlineSync.questionFloat('woah');
console.log(res);
res = readlineSync.questionFloat('woah');
console.log(res);
function promptData<DataType>(
  question: string,
  verify: (res: string) => boolean,
  format: (res: string) => DataType
): DataType {
  let response = '';

  while (!verify(response)) {
    response = readlineSync.question(question);
  }
  return format(response);
}

const result = promptData<string>(
  'Who is the dark lord',
  (res: string): boolean => {
    return res === 'Voldemort';
  },
  (res: string): string => {
    return res;
  }
);

console.log(result);

if (readlineSync.keyInYN('yes or no?')) {
  console.log('ye');
} else {
  console.log('no');
}
