"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = require("./Deck");
const deck = new Deck_1.Deck(1, 4);
console.log(deck.toString());
deck.shuffle();
console.log(deck.toString());
const king = new Deck_1.Card(Deck_1.Suite.Heart, Deck_1.Card.KING_VALUE);
const three = new Deck_1.Card(Deck_1.Suite.Spade, 3);
const ace = new Deck_1.Card(Deck_1.Suite.Diamond, 1);
const emptyDeck = new Deck_1.Deck(0);
console.log('Empty Deck');
console.log(emptyDeck.toString());
emptyDeck.add(king);
emptyDeck.addCards([three]);
console.log(emptyDeck.toString());
emptyDeck.addDeck(deck);
console.log(emptyDeck.toString());
//# sourceMappingURL=index.js.map