"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Types of Suites
 * @enum {string}
 */
var Suite;
(function (Suite) {
    Suite["Clove"] = "\u2663";
    Suite["Diamond"] = "\u2666";
    Suite["Heart"] = "\u2665";
    Suite["Spade"] = "\u2660";
    /** For Joker Cards, the ? */
    Suite["Joker"] = "?";
    /** For Cards that you wish not to reveal */
    Suite["Unknown"] = "?";
})(Suite = exports.Suite || (exports.Suite = {}));
/**
 * Gives the character that matches the card value
 * @param {number} value - the number to give the character for
 */
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
exports.charForValue = charForValue;
/**
 * A class used to represent a card
 */
class Card {
    /**
     * Creates a Card object
     * @param {Suite} s - the suite of the card
     * @param {number} v - the card's value (ie 1, 2, 3, etc). Royal card values available as class constants
     */
    constructor(s, v) {
        this.suite = s;
        this.value = v;
    }
    /**
     * Returns a string version of the card in array form
     * @returns {string[]} where there are 5 items, each one being a row showing the card
     */
    toStringArray() {
        const str = [];
        str.push(` _____ `);
        str.push(`|${this.suite}    |`);
        str.push(`| ${this.value === 10 ? ` 10` : ` ${charForValue(this.value)} `} |`);
        str.push(`|    ${this.suite}|`);
        str.push(` ‾‾‾‾‾ `);
        return str;
    }
    /**
     * Returns the string version of the card
     * @returns {string} of the card
     */
    toString() {
        const arr = this.toStringArray();
        return arr.reduce((acc, next) => acc + next + '\n', '');
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