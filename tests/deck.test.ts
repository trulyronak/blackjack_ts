import {Deck, Card, Suite} from "../src/Deck"
import {expect} from "chai"

describe("deck class tests", () => {

  it("should reset propery", () => {
    let deck = new Deck(3,4);
    let sameDeck = new Deck(3,4);
    expect(deck).to.eql(sameDeck);
    deck.shuffle();
    expect(deck).not.to.eql(sameDeck);
    deck.resetDeck();
    expect(deck).to.eql(sameDeck);
  })

  it("should add and draw cards properly", () => {
    let deck = new Deck(0);
    let emptyCard = new Card(Suite.Unknown, 0);
    expect(deck.draw()).to.eql(emptyCard);
    let card1 = new Card(Suite.Heart, 7);
    deck.add(card1);
    expect(deck.count()).to.eql(1);
    expect(deck.peek()).to.eql(card1);
    let card2 = new Card(Suite.Diamond, 7);
    deck.add(card2);
    expect(deck.count()).to.eql(2);
    expect(deck.draw()).to.eql(card2);
    expect(deck.count()).to.eql(1);
    expect(deck.draw()).to.eql(card1);
    expect(deck.count()).to.eql(0);

    let cardArr = [card1, card2]
    deck.addCards(cardArr);
    expect(deck.count()).to.eql(2);
    expect(deck.show()).to.eql(cardArr);
  })

  it("should be able to add decks", () => {
    let deck1 = new Deck(1);
    expect(deck1.count()).to.eql(52); // no jokers, standard deck
    let deck2 = new Deck(1,4);
    expect(deck2.count()).to.eql(56); // 4 jokers + standard deck
    deck1.addDeck(deck2);
    expect(deck1.count()).to.eql(52+56);
  })
  
  it("should be able to deal cards", () => {
    let baseDeck = new Deck(1);
    let splitDecks = baseDeck.deal(4);
    for (let deckIndex in splitDecks) {
      if (splitDecks.hasOwnProperty(deckIndex)) {
        expect(splitDecks[deckIndex].count()).to.eql(52/4);
      }
    }
  })
})