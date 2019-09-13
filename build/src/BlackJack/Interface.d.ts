/**
 * @fileoverview Contains interface class and some number verification functions
 */
import { Card } from '../Deck';
import { Player } from './Player';
/**
 * Class handling UI interaction
 */
export declare class Interface {
    shouldClear: boolean;
    /**
     * Creates a text-based interface and prompts user if they like clearing
     */
    constructor();
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
    promptData<DataType>(question: string, verify: (res: string) => boolean, format: (res: string) => DataType, charsAllowed?: string): DataType;
    /**
     * Prompts the user for a Yes or No. Will not quit until a valid response
     * @param {string} question - The question to ask
     * @returns {boolean} true if yes, false if no
     */
    promptYN(question: string): boolean;
    /**
     * Prompts the user for a number. Will not quit until a valid response
     *
     * @param {string} question - The question to ask
     * @returns {number} number user entered
     */
    promptNumber(question: string): number;
    /**
     * Prompts the user for a response. All input is requested on a newline initiated by a '> '
     * @param {string} text - The text to use when prompting the user
     * @returns {string} user input
     */
    prompt(question: string): string;
    /**
     * Outputs text to the user.
     * @param {string} text - The text to output to the user
     */
    print(text: string): void;
    /**
     * Clears the console to signify a break. Currently only using line seperators.
     */
    clear(): void;
    /**
     * Prints the cards to the screen
     * @param id The user's id
     * @param cards The cards to show
     */
    showCards(id: string, cards: Card[]): void;
    /**
     * Prints the specified Player's cards and the total value of them
     * @param {Player} p - the player whose cards to print
     * @param {number} handIndex - the hand of the player to print
     */
    showHand(p: Player, handIndex?: number): void;
}
/**
 * Verifies whether a string is a number
 * @param s The string to verify
 * @returns {boolean} true if a number, false if not
 */
export declare function verifyNumber(s: string): boolean;
/**
 * Converts strings to booleans. Assumes the string has been verified
 * @param s  The string to convert
 * @returns {number} the number the string represented
 */
export declare function numberForString(s: string): number;
