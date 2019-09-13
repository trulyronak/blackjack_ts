/**
 * @fileoverview Used for to make sure Deck works. Manual check, didn't end up writing concrete automatable checks
 */
import { Deck, Card, Suite } from './';

const deck = new Deck(1, 4);
console.log(deck.toString());

deck.shuffle();

console.log(deck.toString());

const king = new Card(Suite.Heart, Card.KING_VALUE);
const three = new Card(Suite.Spade, 3);
const ace = new Card(Suite.Diamond, 1);
const emptyDeck = new Deck(0);
console.log('Empty Deck');
console.log(emptyDeck.toString());
emptyDeck.add(king);
emptyDeck.addCards([three, ace]);
console.log(emptyDeck.toString());
emptyDeck.addDeck(deck);
console.log(emptyDeck.toString());
