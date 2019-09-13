/**
 * @fileoverview holds player class
 */
import { Deck, Card } from '../Deck';
import { BlackJack } from './BlackJack';

/**
 * Class storing player data and holding some computational code 
 */
export class Player {
  id: string;
  balance: number;
  bid: number;
  hands: Deck[];
  smallTotal = 17;

  /**
   * Creates a player object.
   * @param {string} id - The id of the player
   * @param {number} balance - The amount of money that player initially has in their bank
   */
  constructor(id: string, balance: number) {
    this.id = id;
    this.balance = balance;
    this.bid = 0
    this.hands = [new Deck(0)];
  }

  /**
   * Bets an amount and subtracts from the bank accordingly
   * @param {number} bid the amount to bid
   */
  bet(bid: number) {
    this.balance -= bid;
    this.bid = bid;
  }

  /**
   * Returns bid back to player
   */
  tie() {
    this.balance += this.bid;
  }

  /**
   * Adds winnings to player's balance
   */
  win() {
    this.balance += this.bid * 2;
  }

  /**
   * Adds winnings for each hand the player made if the hand had not bust
   */
  winAll() {
    for (let handIndex = 0; handIndex < this.hands.length; handIndex++) {
      if (!this.hasBust(handIndex)) {
        // didn't bust
        this.win();
      }
    }
  }

  /**
   * Adds a card to the spcified hand
   * @param {Card} card - The card to add to the players hand
   * @param {number} handIndex - The hand to add the card to. Defaults to 0, the first hand
   */
  add(card: Card, handIndex : number = 0) {
    this.hands[handIndex].add(card);
  }

  /**
   * Adds cards to the spcified hand
   * @param {Deck} deck - The cards to add to the players hand
   * @param {number} handIndex - The hand to add the card to. Defaults to 0, the first hand
   */
  addDeck(deck: Deck, handIndex : number = 0) {
    this.hands[handIndex].addDeck(deck);
  }

  /**
   * Calculates the total sum of your cards. Will return the lowest value possible (if you have an ace)
   * @param {number} handIndex - the index of which hand to find the total for
   * @returns {number} the best total (closest to BlackJack)
   */
  total(handIndex : number= 0): number {
    const totals = this.totals(handIndex);
    let bestScoreIndex = 0;
    for (let totalIndex = 0; totalIndex < totals.length; totalIndex++) {
      const total = totals[totalIndex];
      if (total <= BlackJack.WIN_NUMBER && total > totals[bestScoreIndex]) {
        bestScoreIndex = totalIndex;
      }
    }

    // if there was a value before the best score (caused by aces), store it (used for dealer "AI")
    if (bestScoreIndex > 0) {
      this.smallTotal = totals[bestScoreIndex - 1];
    }

    return totals[bestScoreIndex];
  }

  /**
   * Returns all totals possible with your hand (sorted)
   *
   * @param {number} handIndex - the hand to check about
   * @returns {number[]} all possible totals based on the hand
   */
  totals(handIndex : number = 0): number[] {
    const totals: number[] = [0];
    const hand = this.hands[handIndex];

    const cards = hand.show();
    for (const cardIndex in cards) {
      if (cards.hasOwnProperty(cardIndex)) {
        const card = cards[cardIndex];

        for (const totalIndex in totals) {
          if (totals.hasOwnProperty(totalIndex)) {
            totals[totalIndex] += card.value > 10 ? 10 : card.value; // J=Q=K= value of 10
          }
        }

        if (card.value === 1) {
          totals.push(totals[totals.length - 1] + 10); // add new potential total for the ace that was added
        }
      }
    }

    return totals.sort();
  }

  /**
   * Returns the best score the player has (among all decks)
   * @returns the best score
   */
  bestScoreOverall(): number {
    let bestScore = 0;
    for (let handIndex = 0; handIndex < this.hands.length; handIndex++) {
      const total = this.total(handIndex);
      if (total <= BlackJack.WIN_NUMBER && total > bestScore) {
        bestScore = total;
      }
    }

    return bestScore;
  }

  /**
   * Returns whether the player bust or not
   * @param {number} - the hand to check
   * @returns {boolean} true if player bust, false if not
   */
  hasBust(handIndex = 0) : boolean {
    return this.total(handIndex) > BlackJack.WIN_NUMBER;
  }

  /**
   * Returns whether the player bust on all hands
   * @returns True if the player bust on all hands, false if there is are hand(s) that haven't bust
   */
  hasBustOverall(): boolean {
    for (let handIndex = 0; handIndex < this.hands.length; handIndex++) {
      if (!this.hasBust(handIndex)) {
        // if any hand is ok
        return false;
      }
    }
    return true;
  }

  /**
   * Determines if the player has a "soft" hand at 17 or higher (ie if they have an ace)
   * Used by Dealer exclusively
   * @returns {boolean} true if player had a soft hand
   */
  softHand(): boolean {
    // this method is called if the dealer has a hand of 17 or more;
    // if soft total is less than 17 you gotta hit. (https://www.blackjack.org/blackjack-rules/#rules-of-dealers)
    return this.smallTotal < 17;
  }

  /**
   * Splits the players deck - assumes that deck can be split already
   * @param {number} handIndex - the hand to split off of
   * @returns {[number, number]} - tuple containing the two new handIndices
   */
  split(handIndex: number): [number, number] {
    // money first
    this.bet(this.bid);

    const cards = this.hands[handIndex].show();
    // get cards to split by and remove old hand
    const card0 = cards[0];
    const card1 = cards[1];
    this.hands.splice(handIndex, 1);

    // make new decks
    const deck0 = new Deck(0);
    const deck1 = new Deck(0);
    deck0.add(card0);
    deck1.add(card1);

    // put new decks into hands
    const newIndices: [number, number] = [0, 0];
    newIndices[0] = this.hands.push(deck0) - 1;
    newIndices[1] = this.hands.push(deck1) - 1;

    return newIndices;
  }

  /**
   * Determines whether the player can 'split' (ie if they have 2 of the same card and only have 2 cards)
   * @param {number} handIndex - the hand to check
   * @returns {boolean} true if splittable, false if not
   */
  canSplit(handIndex: number): boolean {
    const cards = this.hands[handIndex].show();
    if (cards.length === 2) {
      const c0Val = cards[0].value > 10 ? 10 : cards[0].value;
      const c1Val = cards[1].value > 10 ? 10 : cards[1].value;
      return c0Val === c1Val;
    } else {
      return false;
    }
  }

  /**
   * Removes all hands from the player and leaves it with one empty hand
   */
  reset() {
    this.hands = [new Deck(0)];
  }
}
