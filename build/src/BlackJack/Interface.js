"use strict";
/**
 * @fileoverview Contains the interface for communicating information and some number verification functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = require("readline-sync");
const Deck_1 = require("../Deck");
/**
 * Class handling UI interaction
 */
class TerminalUI {
    /**
     * Creates a text-based interface and prompts user if they like clearing
     */
    constructor() {
        this.shouldClear = false;
        if (readlineSync.keyInYNStrict('Would you like to clear the console after each hit/stand?')) {
            this.shouldClear = true;
            this.clear();
        }
    }
    /**
     * Prompts the user for type of data. Will not exit until a valid response
     *
     * Fun Fact: I wrote this function before realizing readline-sync had Typescript support.
     * This function was initially used to validate all types, but now its just used to better
     * validate custom input. I left my old validate code at the bottom
     * @param question - The question to prompt with
     * @param verify - The function to verify the data's integrity
     * @param format - The function to convert the string into the desired data type
     * @param charsAllowed - If you want key in mode, enter in the allowed keys for input (avoids 'enter')
     * @returns {DataType} DataType of the form the caller requested
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
     * @param {string} question - The question to ask
     * @returns {boolean} true if yes, false if no
     */
    promptYN(question) {
        return readlineSync.keyInYNStrict(question);
    }
    /**
     * Prompts the user for a number. Will not quit until a valid response
     *
     * @param {string} question - The question to ask
     * @returns {number} number user entered
     */
    promptNumber(question) {
        return readlineSync.questionFloat(question);
    }
    /**
     * Prompts the user for a response. All input is requested on a newline initiated by a '> '
     * @param {string} text - The text to use when prompting the user
     * @returns {string} user input
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
    /**
     * Prints the cards to the screen
     * @param id The user's id
     * @param cards The cards to show
     */
    showCards(id, cards) {
        const deck = new Deck_1.Deck(0);
        deck.addCards(cards);
        this.print(`${id}'s cards`);
        this.print(deck.toString());
    }
    /**
     * Prints the specified Player's cards and the total value of them
     * @param {Player} p - the player whose cards to print
     * @param {number} handIndex - the hand of the player to print
     */
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
exports.TerminalUI = TerminalUI;
// relics of my old promptData - kept to show progress
/**
 * Verifies whether a string is either yes(y) or no(n)
 * @param s The string to verify
 * @returns {boolean} true if valid, false if not
 */
function verifyYN(s) {
    s = s.toLowerCase();
    return s === 'y' || s === 'n' || s === 'yes' || s === 'no';
}
/**
 * Converts yes(y) / no(n) responses to booleans
 * @param s  The string to convert
 * @returns {boolean} true if yes, false if no
 */
function boolForYNStr(s) {
    s = s.toLowerCase();
    return s === 'y' || s === 'yes';
}
/**
 * Verifies whether a string is a number
 * @param s The string to verify
 * @returns {boolean} true if a number, false if not
 */
function verifyNumber(s) {
    return !isNaN(Number(s));
}
exports.verifyNumber = verifyNumber;
/**
 * Converts strings to booleans. Assumes the string has been verified
 * @param s  The string to convert
 * @returns {number} the number the string represented
 */
function numberForString(s) {
    return Number(s);
}
exports.numberForString = numberForString;
//# sourceMappingURL=Interface.js.map