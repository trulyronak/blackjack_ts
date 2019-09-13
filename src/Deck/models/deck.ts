/**
 * @fileoverview Contains the Deck Class
 */

import { Card, Suite } from './card';
import { shuffle as shuffleArray } from './../utils/shuffle';

/**
 * A Class used to represent a Deck of cards
 */
export class Deck {
  static readonly DEFAULT_JOKERS_AMOUNT = 0;
  static readonly DEFAULT_DECKS_COUNT = 1;

  private decks: number;
  private jokers: number;
  private cards: Card[];

  /**
   * Creates a deck object (init with decks = 0 to create an empty deck)
   * @param {number} decks - the amount of 52 Card Decks to put into the deck. Defaults to 1
   * @param {number} jokers - the amount of jokers to include in each 52-Card Deck. Defaults to 0
   * @param {boolean} shuffle - whether to shuffle upon creation
   */
  constructor(decks?: number, jokers?: number) {
    if (decks === undefined) {
      decks = Deck.DEFAULT_DECKS_COUNT;
    }
    if (jokers === undefined) {
      jokers = Deck.DEFAULT_JOKERS_AMOUNT;
    }

    this.decks = decks;
    this.jokers = jokers;
    this.cards = [];

    this.resetDeck();
  }

  /**
   * Resets the deck to its initial settings
   */
  resetDeck(): void {
    this.cards = [];
    for (let d = 0; d < this.decks; d++) {
      for (let value = 1; value <= 13; value++) {
        this.cards.push(new Card(Suite.Clove, value));
        this.cards.push(new Card(Suite.Diamond, value));
        this.cards.push(new Card(Suite.Spade, value));
        this.cards.push(new Card(Suite.Heart, value));
      }
    }
    for (let j = 0; j < this.jokers; j++) {
      this.cards.push(new Card(Suite.Joker, Card.JOKER_VALUE));
    }
  }

  /**
   * Removes the top card of the deck
   * @returns {Card} The top card of the deck
   */
  draw(): Card {
    if (this.cards.length === 0) {
      return new Card(Suite.Unknown, 0);
    }
    return this.cards.pop() as Card;
  }

  /**
   * Shows the top card of the Deck
   * @returns {Card} The top card of the deck
   */
  peek(): Card {
    return this.cards[0];
  }

  /**
   * Shuffles the deck
   */
  shuffle(): void {
    this.cards = shuffleArray(this.cards);
  }

  /**
   * Returns the count of the number of cards in the deck
   * @returns {number} the number of cards in the deck
   */
  count(): number {
    return this.cards.length;
  }

  /**
   * Adds a card to the deck (to the bottom)
   * @param {Card} card - the card to add
   */
  add(card: Card): void {
    this.cards.push(card);
  }

  /**
   * Merges another array of cards into the Deck
   * @param {Card[]} cards The array of Cards
   */
  addCards(cards: Card[]): void {
    this.cards = this.cards.concat(cards);
  }

  /**
   * Adds a Deck of Cards to the current deck
   * @param {Deck} deck — the Deck to add
   */
  addDeck(deck: Deck): void {
    this.addCards(deck.show());
  }

  /**
   * Deals the deck based on the specified options (splits the deck)
   * @param players number - the amount of players to deal to (the amount of deck objects)
   * @param size number - how many cards to allocate per person (if too high, will return empty array).
   *                       If left unset, will distribute deck equally among participants (with some uneveness
   *                       depending on player count)
   * @returns {Deck[]} an array of decks (length == size) with the dealt cards
   */
  deal(players: number, size?: number): Deck[] {
    const decks: Deck[] = [];

    for (let p = 0; p < players; p++) {
      decks.push(new Deck(0)); // empty deck
    }

    let leftover = 0;
    if (size === undefined) {
      size = this.cards.length / players;
      leftover = this.cards.length % players;
    }

    for (let c = 0; c < size; c++) {
      for (let d = 0; d < decks.length; d++) {
        decks[d].add(this.draw());
      }
    }

    for (let r = 0; r < leftover; r++) {
      decks[r].add(this.draw());
    }

    return decks;
  }

  /**
   * Sorts the deck (A-K ordering)
   */
  sort(): void {
    this.cards.sort((a: Card, b: Card): number => {
      if (a.value < b.value) {
        return -1;
      } else if (a.value > b.value) {
        return 1;
      } else {
        return a.suite < b.suite ? -1 : 1;
      }
    });
  }

  /**
   * Returns the deck in array form
   * @returns {Card[]} all cards in the deck
   */
  show(): Card[] {
    return this.cards;
  }

  /**
   * Gives a string version of the deck (shows 4 cards per row)
   * @returns {string} Neatly drawn cards in the deck
   */
  toString(): string {
    let str = '';
    let rows: string[] = [];
    const lb = '\n';

    for (let j = 0; j < this.count(); j++) {
      if (j % 4 === 0 && j !== 0) {
        for (const rowIndex in rows) {
          if (rows.hasOwnProperty(rowIndex)) {
            str += rows[rowIndex] + lb;
          }
        }
        rows = [];
      }

      const card = this.cards[j];
      const cStrArr = card.toStringArray();
      for (let index = 0; index < cStrArr.length; index++) {
        if (!rows[index]) {
          rows[index] = '';
        }
        rows[index] += cStrArr[index];
      }
    }

    for (const rowIndex in rows) {
      if (rows.hasOwnProperty(rowIndex)) {
        str += rows[rowIndex] + lb;
      }
    }
    return str;
  }
}
