"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./card");
const shuffle_1 = require("./../utils/shuffle");
class Deck {
    /**
     * Creates a deck object (init with decks = 0 to create an empty deck)
     * @param {number} decks - the amount of 52 Card Decks to put into the deck. Defaults to 1
     * @param {number} jokers - the amount of jokers to include in each 52-Card Deck. Defaults to 0
     * @param {boolean} shuffle - whether to shuffle upon creation
     */
    constructor(decks, jokers) {
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
     * Create Deck
     */
    resetDeck() {
        this.cards = [];
        for (let d = 0; d < this.decks; d++) {
            for (let value = 1; value <= 13; value++) {
                this.cards.push(new card_1.Card(card_1.Suite.Clove, value));
                this.cards.push(new card_1.Card(card_1.Suite.Diamond, value));
                this.cards.push(new card_1.Card(card_1.Suite.Spade, value));
                this.cards.push(new card_1.Card(card_1.Suite.Heart, value));
            }
        }
        for (let j = 0; j < this.jokers; j++) {
            this.cards.push(new card_1.Card(card_1.Suite.Joker, card_1.Card.JOKER_VALUE));
        }
    }
    /**
     * Removes the top card of the deck
     */
    draw() {
        return this.cards.pop();
    }
    /**
     * Shows the top card of the Deck
     */
    peek() {
        return this.cards[0];
    }
    /**
     * Shuffles the deck
     */
    shuffle() {
        this.cards = shuffle_1.shuffle(this.cards);
    }
    /**
     * Returns the count of the number of cards in the deck
     */
    count() {
        return this.cards.length;
    }
    /**
     * Adds a card to the deck (to the bottom)
     * @param {Card} card - the card to add
     */
    add(card) {
        this.cards.push(card);
    }
    /**
     * Merges another array of cards into the Deck
     *
     * @param {Card[]} cards The array of Cards
     */
    addCards(cards) {
        this.cards = this.cards.concat(cards);
    }
    /**
     * Adds a Deck of Cards to the current deck
     * @param {Deck} deck — the Deck to add
     */
    addDeck(deck) {
        this.addCards(deck.show());
    }
    /**
     * Deals the deck based on the specified options (splits the deck)
     *
     * @param players number - the amount of players to deal to (the amount of deck objects)
     * @param size number - how many cards to allocate per person (if too high, will return empty array).
     *                       If left unset, will distribute deck equally among participants (with some uneveness
     *                       depending on player count)
     */
    deal(players, size) {
        const decks = [];
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
     * Sorts the deck (A-K)
     */
    sort() {
        this.cards.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            }
            else if (a.value > b.value) {
                return 1;
            }
            else {
                return a.suite < b.suite ? -1 : 1;
            }
        });
    }
    /**
     * Returns the deck in array form
     */
    show() {
        return this.cards;
    }
    /**
     * Gives a string version of the deck (shows 4 cards per row)
     */
    toString() {
        let str = '';
        let rows = [];
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
Deck.DEFAULT_JOKERS_AMOUNT = 0;
Deck.DEFAULT_DECKS_COUNT = 1;
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map