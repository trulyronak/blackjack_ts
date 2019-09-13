"use strict";
/**
 * @fileoverview Class handling UI interaction
 * @author ronakshah
 * @created 09/28/2018
 */
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
const Deck_1 = require("../Deck");
class Interface {
    /**
     * Creates a text-based interface
     * Sets up any configs
     */
    constructor() {
        this.shouldClear = false;
        if (readlineSync.keyInYN('Would you like to clear the console after each hit/stand?')) {
            this.shouldClear = true;
            this.clear();
        }
    }
    /**
     * Prompts the user for type of data. Will not exit until a valid response
     *
     * Fun Fact: I wrote this function before realizing readline-sync had Typescript support.
     * This function was initially used to validate all types, but now its just used to better
     * validate custom input
     * @param question - The question to prompt with
     * @param verify - The function to verify the data's integrity
     * @param format - The function to convert the string into the desired data type
     * @param charsAllowed - If you want key in mode, enter in the allowed keys for input (avoids 'enter')
     */
    promptData(question, verify, format, charsAllowed) {
        let response = '';
        while (!verify(response)) {
            if (charsAllowed !== undefined) {
                response = readlineSync.keyIn(question, { limit: charsAllowed });
            }
            else {
                response = readlineSync.question(question + '\n > ');
            }
        }
        return format(response);
    }
    /**
     * Prompts the user for a Yes or No. Will not quit until a valid response
     *
     * @param {string} question - The question to ask
     */
    promptYN(question) {
        return readlineSync.keyInYNStrict(question);
    }
    /**
     * Prompts the user for a number. Will not quit until a valid response
     *
     * @param {string} question - The question to ask
     */
    promptNumber(question) {
        return readlineSync.questionFloat(question);
    }
    /**
     * Prompts the user for a response. All input is requested on a newline initiated by a '> '
     * @param {string} text - The text to use when prompting the user
     */
    prompt(question) {
        return readlineSync.question(question);
    }
    /**
     * Outputs text to the user.
     * @param {string} text - The text to output to the user
     */
    print(text) {
        console.log(text);
    }
    /**
     * Clears the console to signify a break. Currently only using line seperators.
     */
    clear() {
        this.print('------------------------------');
        // still print this, as the user may scroll up to see what has happened and may find this a handy divider
        if (this.shouldClear) {
            console.clear();
        }
    }
    showCards(id, cards) {
        const deck = new Deck_1.Deck(0);
        deck.addCards(cards);
        this.print(`${id}'s cards`);
        this.print(deck.toString());
    }
    showHand(p, handIndex = 0) {
        const totals = p.totals(handIndex);
        if (p.hands.length > 1) {
            this.print(p.id + ` - Hand #${handIndex + 1}/${p.hands.length}'s cards:`);
        }
        else {
            this.print(`${p.id}'s cards:`);
        }
        this.print(`Adds up to ${totals.join(' OR ')}`);
        this.print(p.hands[handIndex].toString());
    }
}
exports.Interface = Interface;
/**
 * Verifies whether a string is either yes(y) or no(n)
 * @param s The string to verify
 */
function verifyYN(s) {
    s = s.toLowerCase();
    return s === 'y' || s === 'n' || s === 'yes' || s === 'no';
}
/**
 * Converts yes(y) / no(n) responses to booleans
 * @param s  The string to convert
 */
function boolForYNStr(s) {
    s = s.toLowerCase();
    return s === 'y' || s === 'yes';
}
/**
 * Verifies whether a string is a number
 * @param s The string to verify
 */
function verifyNumber(s) {
    return !isNaN(Number(s));
}
exports.verifyNumber = verifyNumber;
/**
 * Converts yes(y) / no(n) responses to booleans
 * @param s  The string to convert
 */
function numberForString(s) {
    return Number(s);
}
exports.numberForString = numberForString;
//# sourceMappingURL=Interface.js.map