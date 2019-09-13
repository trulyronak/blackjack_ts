/**
 * Types of Suites
 * @enum {string}
 */
export enum Suite {
  Clove = '♣',
  Diamond = '♦',
  Heart = '♥',
  Spade = '♠',
  /** For Joker Cards, the ? */
  Joker = '?',
  /** For Cards that you wish not to reveal */
  Unknown = '?',
}

/**
 * Gives the character that matches the card value
 * @param {number} value - the number to give the character for
 */
export function charForValue(value: number): string {
  if (value >= 2 && value <= 10) {
    return `${value}`;
  } else {
    const map: Record<number, string> = {
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

/**
 * A class used to represent a card
 */
export class Card {
  static readonly JOKER_VALUE = 14;
  static readonly MYSTERY_VALUE = 0;
  static readonly JACK_VALUE = 11;
  static readonly QUEEN_VALUE = 12;
  static readonly KING_VALUE = 13;
  static readonly MYSTERY: Card = new Card(Suite.Unknown, Card.MYSTERY_VALUE);

  suite: Suite;
  value: number;

  /**
   * Creates a Card object
   * @param {Suite} s - the suite of the card
   * @param {number} v - the card's value (ie 1, 2, 3, etc). Royal card values available as class constants
   */
  constructor(s: Suite, v: number) {
    this.suite = s;
    this.value = v;
  }

  /**
   * Returns a string version of the card in array form
   * @returns {string[]} where there are 5 items, each one being a row showing the card
   */
  toStringArray(): string[] {
    const str: string[] = [];
    str.push(` _____ `);
    str.push(`|${this.suite}    |`);
    str.push(
      `| ${this.value === 10 ? ` 10` : ` ${charForValue(this.value)} `} |`
    );
    str.push(`|    ${this.suite}|`);
    str.push(` ‾‾‾‾‾ `);
    return str;
  }

  /**
   * Returns the string version of the card
   * @returns {string} of the card
   */
  toString(): string {
    const arr = this.toStringArray();
    return arr.reduce((acc, next) => acc + next + '\n', '');
  }
}
