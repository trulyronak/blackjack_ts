import {Card, Suite, charForValue} from "../src/Deck"
import {expect} from "chai"

describe("card class tests", () => {
  it("should return proper char for value", () => {
    let ace = new Card(Suite.Clove, 1);
    let jack = new Card(Suite.Clove, Card.JACK_VALUE);
    let queen = new Card(Suite.Clove, Card.QUEEN_VALUE);
    let king = new Card(Suite.Clove, Card.KING_VALUE);
    let joker = new Card(Suite.Clove, Card.JOKER_VALUE);
    let mystery = Card.MYSTERY;

    expect(charForValue(ace.value)).to.eql("A");
    expect(charForValue(jack.value)).to.eql("J");
    expect(charForValue(queen.value)).to.eql("Q");
    expect(charForValue(king.value)).to.eql("K");
    expect(charForValue(joker.value)).to.eql("J");
    expect(charForValue(mystery.value)).to.eql("?");

  })

  it("should return an array of size 5 on Card.toString()", () => {
    let c = Card.MYSTERY;
    expect(c.toStringArray().length).to.eql(5);
  })
})