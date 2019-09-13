"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const deck = new _1.Deck(1, 4);
console.log(deck.toString());
deck.shuffle();
console.log(deck.toString());
const king = new _1.Card(_1.Suite.Heart, _1.Card.KING_VALUE);
const three = new _1.Card(_1.Suite.Spade, 3);
const ace = new _1.Card(_1.Suite.Diamond, 1);
const emptyDeck = new _1.Deck(0);
console.log('Empty Deck');
console.log(emptyDeck.toString());
emptyDeck.add(king);
emptyDeck.addCards([three, ace]);
console.log(emptyDeck.toString());
emptyDeck.addDeck(deck);
console.log(emptyDeck.toString());
//# sourceMappingURL=test.js.map