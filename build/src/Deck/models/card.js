"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Suite;
(function (Suite) {
    Suite["Clove"] = "\u2663";
    Suite["Diamond"] = "\u2666";
    Suite["Heart"] = "\u2665";
    Suite["Spade"] = "\u2660";
    Suite["Joker"] = "?";
    Suite["Unknown"] = "?";
})(Suite = exports.Suite || (exports.Suite = {}));
function charForValue(value) {
    if (value >= 2 && value <= 10) {
        return `${value}`;
    }
    else {
        const map = {
            0: '?',
            14: 'J',
            1: 'A',
            11: 'J',
            12: 'Q',
            13: 'K',
        };
        return map[value];
    }
}
class Card {
    constructor(s, v) {
        this.suite = s;
        this.value = v;
    }
    toStringArray() {
        const str = [];
        str.push(` _____ `);
        str.push(`|${this.suite}    |`);
        str.push(`| ${this.value === 10 ? ` 10` : ` ${charForValue(this.value)} `} |`);
        str.push(`|    ${this.suite}|`);
        str.push(` ‾‾‾‾‾ `);
        return str;
    }
    toString() {
        const arr = this.toStringArray;
        let str = '';
        for (const row in arr) {
            if (arr.hasOwnProperty(row)) {
                str += row + '\n';
            }
        }
        return str;
    }
}
Card.JOKER_VALUE = 14;
Card.MYSTERY_VALUE = 0;
Card.JACK_VALUE = 11;
Card.QUEEN_VALUE = 12;
Card.KING_VALUE = 13;
Card.MYSTERY = new Card(Suite.Unknown, Card.MYSTERY_VALUE);
exports.Card = Card;
//# sourceMappingURL=card.js.map