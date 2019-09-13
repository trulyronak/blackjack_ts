/**
 * @fileoverview Contains the interface for communicating information and some number verification functions
 */

import * as readlineSync from 'readline-sync';
import { Deck, Card } from '../Deck';
import { Player } from './Player';

export interface UserInterface {
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
  promptData<DataType>(
    question: string,
    verify: (res: string) => boolean,
    format: (res: string) => DataType,
    charsAllowed?: string
  ): DataType;

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
   * Clears the screen to signify a break. Currently only using line seperators.
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
   * @param {number} handIndex? - the hand of the player to print (optional - should default to 0)
   */
  showHand(p: Player, handIndex?: number): void;
}

/**
 * Class handling UI interaction
 */
export class TerminalUI implements UserInterface {
  shouldClear = false;

  /**
   * Creates a text-based interface and prompts user if they like clearing
   */
  constructor() {
    if (
      readlineSync.keyInYN(
        'Would you like to clear the console after each hit/stand?'
      )
    ) {
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
  promptData<DataType>(
    question: string,
    verify: (res: string) => boolean,
    format: (res: string) => DataType,
    charsAllowed?: string
  ): DataType {
    let response = '';

    while (!verify(response)) {
      if (charsAllowed !== undefined) {
        response = readlineSync.keyIn(question, { limit: charsAllowed });
      } else {
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
  promptYN(question: string): boolean {
    return readlineSync.keyInYNStrict(question);
  }

  /**
   * Prompts the user for a number. Will not quit until a valid response
   *
   * @param {string} question - The question to ask
   * @returns {number} number user entered
   */
  promptNumber(question: string): number {
    return readlineSync.questionFloat(question);
  }

  /**
   * Prompts the user for a response. All input is requested on a newline initiated by a '> '
   * @param {string} text - The text to use when prompting the user
   * @returns {string} user input
   */
  prompt(question: string): string {
    return readlineSync.question(question);
  }

  /**
   * Outputs text to the user.
   * @param {string} text - The text to output to the user
   */
  print(text: string): void {
    console.log(text);
  }

  /**
   * Clears the console to signify a break. Currently only using line seperators.
   */
  clear(): void {
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
  showCards(id: string, cards: Card[]): void {
    const deck = new Deck(0);
    deck.addCards(cards);
    this.print(`${id}'s cards`);
    this.print(deck.toString());
  }

  /**
   * Prints the specified Player's cards and the total value of them
   * @param {Player} p - the player whose cards to print
   * @param {number} handIndex - the hand of the player to print
   */
  showHand(p: Player, handIndex = 0) {
    const totals = p.totals(handIndex);
    if (p.hands.length > 1) {
      this.print(p.id + ` - Hand #${handIndex + 1}/${p.hands.length}'s cards:`);
    } else {
      this.print(`${p.id}'s cards:`);
    }
    this.print(`Adds up to ${totals.join(' OR ')}`);
    this.print(p.hands[handIndex].toString());
  }
}

// relics of my old promptData - kept to show progress
/**
 * Verifies whether a string is either yes(y) or no(n)
 * @param s The string to verify
 * @returns {boolean} true if valid, false if not
 */
function verifyYN(s: string): boolean {
  s = s.toLowerCase();
  return s === 'y' || s === 'n' || s === 'yes' || s === 'no';
}

/**
 * Converts yes(y) / no(n) responses to booleans
 * @param s  The string to convert
 * @returns {boolean} true if yes, false if no
 */
function boolForYNStr(s: string): boolean {
  s = s.toLowerCase();
  return s === 'y' || s === 'yes';
}

/**
 * Verifies whether a string is a number
 * @param s The string to verify
 * @returns {boolean} true if a number, false if not
 */
export function verifyNumber(s: string): boolean {
  return !isNaN(Number(s));
}

/**
 * Converts strings to booleans. Assumes the string has been verified
 * @param s  The string to convert
 * @returns {number} the number the string represented
 */
export function numberForString(s: string): number {
  return Number(s) as number;
}
