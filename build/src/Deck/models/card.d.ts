/**
 * Types of Suites
 * @enum {string}
 */
export declare enum Suite {
    Clove = "\u2663",
    Diamond = "\u2666",
    Heart = "\u2665",
    Spade = "\u2660",
    /** For Joker Cards, the ? */
    Joker = "?",
    /** For Cards that you wish not to reveal */
    Unknown = "?"
}
/**
 * A class used to represent a card
 */
export declare class Card {
    static readonly JOKER_VALUE = 14;
    static readonly MYSTERY_VALUE = 0;
    static readonly JACK_VALUE = 11;
    static readonly QUEEN_VALUE = 12;
    static readonly KING_VALUE = 13;
    static readonly MYSTERY: Card;
    suite: Suite;
    value: number;
    /**
     * Creates a Card object
     * @param {Suite} s - the suite of the card
     * @param {number} v - the card's value (ie 1, 2, 3, etc). Royal card values available as class constants
     */
    constructor(s: Suite, v: number);
    /**
     * Returns a string version of the card in array form
     * @returns {string[]} where there are 5 items, each one being a row showing the card
     */
    toStringArray(): string[];
    /**
     * Returns the string version of the card
     * @returns {string} of the card
     */
    toString(): string;
}
