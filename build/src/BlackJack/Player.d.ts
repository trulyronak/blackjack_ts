import { Deck, Card } from '../Deck';
/**
 * @fileoverview class storing player data and holding some computational code (for cleanness)
 * @author ronakshah
 * @created 09/28/2018
 */
export declare class Player {
    id: string;
    balance: number;
    bid: number;
    hands: Deck[];
    smallTotal: number;
    /**
     * Create a player object.
     * @param {number} balance - The amount of money that player initially has in their bank
     */
    constructor(id: string, balance: number, bid?: number, hands?: Deck[]);
    bet(bid: number): void;
    tie(): void;
    win(): void;
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
     * Calculate the total sum of your cards. Will return the lowest value possible (if you have an ace)
     *
     * @param {number} handIndex - the index of which hand to find the total for
     */
    total(handIndex?: number): number;
    /**
     * Returns all totals possible with your hand (sorted)
     *
     * @param {number} handIndex - the hand to check about
     */
    totals(handIndex?: number): number[];
    /**
     * Returns the best score the player has (among all decks)
     */
    bestScoreOverall(): number;
    /**
     * Returns whether the player bust or not
     *
     * @param {number} - the hand to check
     */
    hasBust(handIndex?: number): boolean;
    /**
     * Returns whether the player bust
     *
     * @returns True if the player bust on all hands, false if there is are hand(s) that haven't bust
     */
    hasBustOverall(): boolean;
    /**
     * Determines if the player has a "soft" hand at 17 or higher (ie if they have an ace)
     */
    softHand(): boolean;
    /**
     * Splits the players deck - assumes that deck can be split already
     *
     * @param {number} handIndex - the hand to split off of
     * @return {[number, number]} - tuple containing the two new handIndices
     */
    split(handIndex: number): [number, number];
    /**
     * Determines whether the player can 'split' (ie if they have 2 of the same card and only have 2 cards)
     *
     * @param {number} handIndex - the hand to check
     */
    canSplit(handIndex: number): boolean;
    reset(): void;
}
