import { Card } from './card';
export declare class Deck {
    static readonly DEFAULT_JOKERS_AMOUNT = 0;
    static readonly DEFAULT_DECKS_COUNT = 1;
    private decks;
    private jokers;
    private cards;
    /**
     * Creates a deck object (init with decks = 0 to create an empty deck)
     * @param {number} decks - the amount of 52 Card Decks to put into the deck. Defaults to 1
     * @param {number} jokers - the amount of jokers to include in each 52-Card Deck. Defaults to 0
     * @param {boolean} shuffle - whether to shuffle upon creation
     */
    constructor(decks?: number, jokers?: number);
    /**
     * Create Deck
     */
    resetDeck(): void;
    /**
     * Removes the top card of the deck
     */
    draw(): Card;
    /**
     * Shows the top card of the Deck
     */
    peek(): Card;
    /**
     * Shuffles the deck
     */
    shuffle(): void;
    /**
     * Returns the count of the number of cards in the deck
     */
    count(): number;
    /**
     * Adds a card to the deck (to the bottom)
     * @param {Card} card - the card to add
     */
    add(card: Card): void;
    /**
     * Merges another array of cards into the Deck
     *
     * @param {Card[]} cards The array of Cards
     */
    addCards(cards: Card[]): void;
    /**
     * Adds a Deck of Cards to the current deck
     * @param {Deck} deck — the Deck to add
     */
    addDeck(deck: Deck): void;
    /**
     * Deals the deck based on the specified options (splits the deck)
     *
     * @param players number - the amount of players to deal to (the amount of deck objects)
     * @param size number - how many cards to allocate per person (if too high, will return empty array).
     *                       If left unset, will distribute deck equally among participants (with some uneveness
     *                       depending on player count)
     */
    deal(players: number, size?: number): Deck[];
    /**
     * Sorts the deck (A-K)
     */
    sort(): void;
    /**
     * Returns the deck in array form
     */
    show(): Card[];
    /**
     * Gives a string version of the deck (shows 4 cards per row)
     */
    toString(): string;
}
