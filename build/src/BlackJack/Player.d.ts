/**
 * @fileoverview holds player class
 */
import { Deck, Card } from '../Deck';
/**
 * Class storing player data and holding some computational code
 */
export declare class Player {
    id: string;
    balance: number;
    bid: number;
    hands: Deck[];
    smallTotal: number;
    /**
     * Creates a player object.
     * @param {string} id - The id of the player
     * @param {number} balance - The amount of money that player initially has in their bank
     */
    constructor(id: string, balance: number);
    /**
     * Bets an amount and subtracts from the bank accordingly
     * @param {number} bid the amount to bid
     */
    bet(bid: number): void;
    /**
     * Returns bid back to player
     */
    tie(): void;
    /**
     * Adds winnings to player's balance
     */
    win(): void;
    /**
     * Adds winnings for each hand the player made if the hand had not bust
     */
    winAll(): void;
    /**
     * Adds a card to the spcified hand
     * @param {Card} card - The card to add to the players hand
     * @param {number} handIndex - The hand to add the card to. Defaults to 0, the first hand
     */
    add(card: Card, handIndex?: number): void;
    /**
     * Adds cards to the spcified hand
     * @param {Deck} deck - The cards to add to the players hand
     * @param {number} handIndex - The hand to add the card to. Defaults to 0, the first hand
     */
    addDeck(deck: Deck, handIndex?: number): void;
    /**
     * Calculates the total sum of your cards. Will return the lowest value possible (if you have an ace)
     * @param {number} handIndex - the index of which hand to find the total for
     * @returns {number} the best total (closest to BlackJack)
     */
    total(handIndex?: number): number;
    /**
     * Returns all totals possible with your hand (sorted)
     *
     * @param {number} handIndex - the hand to check about
     * @returns {number[]} all possible totals based on the hand
     */
    totals(handIndex?: number): number[];
    /**
     * Returns the best score the player has (among all decks)
     * @returns the best score
     */
    bestScoreOverall(): number;
    /**
     * Returns whether the player bust or not
     * @param {number} - the hand to check
     * @returns {boolean} true if player bust, false if not
     */
    hasBust(handIndex?: number): boolean;
    /**
     * Returns whether the player bust on all hands
     * @returns True if the player bust on all hands, false if there is are hand(s) that haven't bust
     */
    hasBustOverall(): boolean;
    /**
     * Determines if the player has a "soft" hand at 17 or higher (ie if they have an ace)
     * Used by Dealer exclusively
     * @returns {boolean} true if player had a soft hand
     */
    softHand(): boolean;
    /**
     * Splits the players deck - assumes that deck can be split already
     * @param {number} handIndex - the hand to split off of
     * @returns {[number, number]} - tuple containing the two new handIndices
     */
    split(handIndex: number): [number, number];
    /**
     * Determines whether the player can 'split' (ie if they have 2 of the same card and only have 2 cards)
     * @param {number} handIndex - the hand to check
     * @returns {boolean} true if splittable, false if not
     */
    canSplit(handIndex: number): boolean;
    /**
     * Removes all hands from the player and leaves it with one empty hand
     */
    reset(): void;
}
