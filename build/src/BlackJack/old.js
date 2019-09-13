"use strict";
/*import Player from "./Player";
import Deck, { Card } from "./../Deck";
import { Suite } from "../Deck/models/card";
import Interface, * as InterfaceHelper from "./Interface";
import Decision, {verifyStringDecision, decisionForString} from "./Decision";
import delay from "./delay";

export default async function game()  {
  // create the player
  const player = new Player(900)
  const dealer = new Player(20000) // added so it is possible to bankrupt the dealer, easter egg sort of thing

  // setup card deck
  let deck = new Deck(4) // we want to use 4 decks of cards
  deck.shuffle();

  // game model is setup, let's create the interface
  const ui = new Interface()
  ui.print("Welcome to Black Jack!")
  // loop this next part forever
  let gameOver = false
  let gamesPlayed = 0

  while(!gameOver) {
    ui.print(`Your Balance: $${player.balance}`)
    ui.print("============================")

    const bid = ui.promptData<number>("How much would you like to bid?",
      (str: string) : Boolean => {
        if (InterfaceHelper.verifyNumber(str) ) {
          const b = InterfaceHelper.numberForString(str)
          if (b > player.balance) {
            ui.print("Insufficient Funds");
            return false;
          } else {
            if (b > dealer.balance) {
              ui.print("The Dealer Does Not Have Enough Funds To Support That Bid.");
            }
            return true;
          }
        }
        return false;
      },
      InterfaceHelper.numberForString
    );

    player.balance -= bid;
    dealer.balance -= bid;
    player.bid = bid;


    ui.print(`Your Balance: $${player.balance} | Your Bid: $${player.bid}`)

    // now round begins
    let roundOver = false

    // deal cards
    const distribution = deck.deal(2, 2);
    dealer.hand = distribution[0]
    player.hand = distribution[1]

    while (!roundOver) {
      ui.clear() // maybe
      ui.showCards("Dealer", [dealer.hand.peek(), new Card(Suite.Unknown, 0)]) // returning a fake other card
      ui.showDeck("Player", player.hand) // render all
      ui.print(`Your Balance: $${player.balance} | Your Bid: $${player.bid}`)

      const decision: Decision = ui.promptData<Decision>(`Would you like to hit(h) or stand(s) ${(player.canSplit()) ? " or split (sp)?" : "?"}`,
        verifyStringDecision, decisionForString)

      switch(decision) {
        case Decision.hit: {
          player.hand.add(deck.draw())
          if (player.total() > 21) {
            ui.clear()
            ui.showDeck("Dealer", dealer.hand) // show all dealer cards
            ui.showDeck("Player", player.hand)

            ui.print("You went over :(")
            ui.print("You lose!")
            dealer.balance += player.bid * 2
            roundOver = true
          } else {
            // quips
            if (player.total() === 21) {
            ui.print("dayum, blackjack!")
            ui.print("i'd stand if I was you!")
          } else {
            const quips = ["darn, you're still alive!", "lucky you!", "lets see how long your luck holds out..."] // add more later
            ui.print(quips[Math.floor(Math.random()*quips.length)]) // random quip
            }
          }
          break;
        }
        case Decision.split: {
          ui.print("Unsupported Operation")
          break;
        }
        case Decision.stand: {
        // stand code
        ui.clear()
        ui.showDeck("Dealer", dealer.hand) // show all dealer cards
        ui.showDeck("Player", player.hand)

        if (dealer.total() > 21) {
          ui.print("Dealer Bust! You Win!")
          player.balance += (player.bid * 2)
        } else if (dealer.total() > player.total()) { // if dealer is closer to 21 than you
          ui.print("Dealer Wins!")
          dealer.balance += player.bid * 2
          } else { // you were closer to 21 than dealer -> dealer needs to hit
          // write dealer hitting code here
            while(dealer.total() < 17 || dealer.softHand()) {
            ui.print("Dealer hits!")
            dealer.hand.add(deck.draw()); // dealer draws
            ui.showDeck("Dealer", dealer.hand); // show all dealer cards
            ui.showDeck("Player", player.hand);
            if (dealer.total() > 21) {
              ui.print("Dealer Bust! You Win!")
              player.balance += (player.bid * 2);
              roundOver = true;
              break;
            } else {
              ui.print('----------------------------');
              await delay(1000); // pause between dealer hits
            }
          }

          if (!roundOver) {
            ui.print(`Dealer decides to stay at ${dealer.total()}!`);
            if (dealer.total() > player.total()) { // if dealer is closer to 21 than you
              ui.print("Dealer Wins!");
              dealer.balance += player.bid * 2;
              roundOver = true;
            } else if (dealer.total() === player.total()) {
              ui.print("Tie!")
              player.balance += player.bid;
              dealer.balance += player.bid;
            } else {
              ui.print("You Win!");
              player.balance += (player.bid * 2);
            }
          }
        }
        roundOver = true;
        break;
        }
      }
    }

    player.bid = 0;
    gamesPlayed++;

    if (!ui.promptYN("Continue Playing?")) {
      ui.print("Thanks for playing!");
      ui.print(`Final Balance: $${player.balance} Dealer Balance: $${dealer.balance}`);
      ui.print("See you next time!");
      process.exit(0);
    }

    if (gamesPlayed % 3 === 0) { // every 3 rounds we reset the deck. no card counting!
      ui.print("Resetting and reshuffling the deck")
      deck = new Deck(4);
      deck.shuffle();
    }

    if (player.balance <= 0) {
      ui.print(`Your Balance: $${player.balance} | Your Bid: $${player.bid}`)

      ui.print("You've been bankrupted!")
      ui.print("Exiting with failure :(")
      process.exit(1) // if you lose the program exits with a failure
    }
  }
}*/
//# sourceMappingURL=old.js.map