"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
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
function promptData(question, verify, format) {
    let response = '';
    while (!verify(response)) {
        response = readlineSync.question(question);
    }
    return format(response);
}
const result = promptData('Who is the dark lord', (res) => {
    return res === 'Voldemort';
}, (res) => {
    return res;
});
console.log(result);
if (readlineSync.keyInYN('yes or no?')) {
    console.log('ye');
}
else {
    console.log('no');
}
//# sourceMappingURL=test.js.map