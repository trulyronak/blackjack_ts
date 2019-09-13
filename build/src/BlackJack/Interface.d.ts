/**
 * @fileoverview Class handling UI interaction
 * @author ronakshah
 * @created 09/28/2018
 */
import { Card } from '../Deck';
import { Player } from './Player';
export declare class Interface {
    shouldClear: boolean;
    /**
     * Creates a text-based interface
     * Sets up any configs
     */
    constructor();
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
    promptData<DataType>(question: string, verify: (res: string) => boolean, format: (res: string) => DataType, charsAllowed?: string): DataType;
    /**
     * Prompts the user for a Yes or No. Will not quit until a valid response
     *
     * @param {string} question - The question to ask
     */
    promptYN(question: string): boolean;
    /**
     * Prompts the user for a number. Will not quit until a valid response
     *
     * @param {string} question - The question to ask
     */
    promptNumber(question: string): number;
    /**
     * Prompts the user for a response. All input is requested on a newline initiated by a '> '
     * @param {string} text - The text to use when prompting the user
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
    showCards(id: string, cards: Card[]): void;
    showHand(p: Player, handIndex?: number): void;
}
/**
 * Verifies whether a string is a number
 * @param s The string to verify
 */
export declare function verifyNumber(s: string): boolean;
/**
 * Converts yes(y) / no(n) responses to booleans
 * @param s  The string to convert
 */
export declare function numberForString(s: string): number;
