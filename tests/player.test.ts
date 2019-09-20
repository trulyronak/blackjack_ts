import {expect} from "chai";
import {Player} from "../src/BlackJack/Player";
import { Card, Deck, Suite } from "../src/Deck";

describe("Player Class Tests", () => {

  it("should bet/tie/win properly", () => {
    let p = new Player("player", 1000);
    expect(p.balance).to.eql(1000);
    p.bet(30);
    expect(p.balance).to.eql(1000-30);
    p.tie();
    expect(p.balance).to.eql(1000);
    p.bet(30);
    expect(p.balance).to.eql(1000-30);
    p.win();
    expect(p.balance).to.eql(1000+30);
  })

  it("should win properly for bust hands", () => {
    let p = new Player("player", 1000);
    p.bet(30);
    p.add(new Card(Suite.Diamond, 4));
    let bustDeck = new Deck(1); // any deck with 52 cards is a bust deck
    p.addDeck(bustDeck, 1);
    p.winAll();
    expect(p.balance).to.eql(1000+30); // only one victory

  })
  
  it("should total cards with aces properly", () => {
    debugger
    let p = new Player("player", 1000);
    let card5 = new Card(Suite.Clove, 5);
    let card10 = new Card(Suite.Clove, 10);
    let ace = new Card(Suite.Spade, 1);

    p.add(card5);
    expect(p.total()).to.eql(5);

    p.add(ace);
    expect(p.total()).to.eql(16);
    let totals = p.totals();
    expect(totals.length).to.eql(2);
    expect(totals[0]).to.eql(6);
    expect(totals[1]).to.eql(16);

    p.add(card10);
    totals = p.totals();
    expect(totals.length).to.eql(2);
    expect(totals[0]).to.eql(16);
    expect(totals[1]).to.eql(26);
    expect(p.total()).to.eql(16);
  })

  it("should determine the proper best score", () => {
    let deckBad = new Deck(1);
    let deckGood = new Deck(0);
    deckGood.addCards([new Card(Suite.Diamond, 10), new Card(Suite.Spade, 1)]);
    let p = new Player("player", 1000);
    p.add(new Card(Suite.Clove, 10), 0);
    expect(p.bestScoreOverall()).to.eql(10);

    p.addDeck(deckGood, 1);
    expect(p.bestScoreOverall()).to.eql(21);

    p.addDeck(deckBad, 2);
    expect(p.bestScoreOverall()).to.eql(21);

    p.add(new Card(Suite.Diamond, 10), 1);
    p.add(new Card(Suite.Clove, 10), 1); // ruin the bad deck
    expect(p.bestScoreOverall()).to.eql(10); // the new best score

    // ruin the last ok deck
    p.add(new Card(Suite.Heart, 10), 0);
    p.add(new Card(Suite.Spade, 10), 0);
    expect(p.bestScoreOverall()).to.eql(30); // the lowest score 
  })
})