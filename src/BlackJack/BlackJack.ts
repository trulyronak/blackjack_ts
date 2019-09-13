/**
 * @fileoverview Contains the master game code for BlackJack
 */

import { Player } from './Player';
import { TerminalUI, UserInterface } from './Interface';
import * as InterfaceHelper from './Interface';
import { Deck, Card } from '../Deck';
import { Decision } from './Decision';
import * as DecisionHelper from './Decision';
import { delay } from './delay';

/**
 * A Class that manages a game of BlackJack
 */
export class BlackJack {
  static readonly PLAYER_DEFAULT_BANK = 800;
  static readonly DEALER_DEFAULT_BANK = 80000;
  static readonly WIN_NUMBER = 21;

  private player: Player;
  private dealer: Player;
  private deck: Deck;

  private ui: UserInterface;
  private bid = 0;
  private roundsPlayed = 0;

  /**
   * Makes the BlackJack game. Prompts the user about inteface settings on call.
   * All parameters optional (default values provided)
   * @param {number} playerBank - How much money the player starts off with
   * @param {number} dealerBank - How much money the dealer starts off with
   * @param {number} decksToUse - How many decks to use in the game
   */
  constructor(
    playerBank: number = BlackJack.PLAYER_DEFAULT_BANK,
    dealerBank: number = BlackJack.DEALER_DEFAULT_BANK,
    decksToUse = 4
  ) {
    this.player = new Player('Player', playerBank);
    this.dealer = new Player('Dealer', dealerBank);
    this.deck = new Deck(decksToUse);
    this.deck.shuffle();
    this.ui = new TerminalUI();
  }

  /**
   * Plays the game. Runs asynchronously to imitate dealer thought
   */
  async play() {
    this.ui.print('Welcome to Black Jack!');
    do {
      this.startRound();
      this.setup();

      await this.playerDecisions();
      await this.dealerDecisions();
      this.decideOutcome();
      if (this.player.balance <= 0) {
        this.endGame(true); // lost
        return;
      }
    } while (this.continuePlaying());
  }

  /**
   * Starts up the round by alerting the player, and resetting the decks (every 3 rounds)
   */
  private startRound() {
    if (this.roundsPlayed !== 0 && this.roundsPlayed % 3 === 0) {
      this.deck.resetDeck();
      this.deck.shuffle();
    }

    this.ui.print(`Your Balance: $${this.player.balance}`);
    this.ui.print('==========================================');
    this.roundsPlayed++;
  }

  /**
   * Gets the players bid and deals cards
   */
  private setup() {
    // get bid
    const bid = this.ui.promptData<number>(
      'How much would you like to bid?',
      (str: string): boolean => {
        if (InterfaceHelper.verifyNumber(str)) {
          // we know it is a number — check if it fits the requirements
          const requestedBid = InterfaceHelper.numberForString(str);
          if (requestedBid <= 0) {
            this.ui.print('Bid must be greater than $0');
          } else if (requestedBid > this.player.balance) {
            this.ui.print('Insufficient Funds');
            return false;
          } else {
            if (requestedBid > this.dealer.balance) {
              this.ui.print(
                'The Dealer Does Not Have Enough Funds To Support That Bid.'
              );
            }
            return true;
          }
        }
        return false;
      },
      InterfaceHelper.numberForString
    );

    // initiate bets
    this.player.bet(bid);
    this.dealer.bet(bid);

    this.ui.print(
      `Your Balance: $${this.player.balance} | Your Bid: $${this.player.bid}`
    );

    // reset hands
    this.player.reset();
    this.dealer.reset();

    // deal cards
    const distribution = this.deck.deal(2, 2);
    this.player.addDeck(distribution[0]);
    this.dealer.addDeck(distribution[1]);
  }

  /**
   * Prompts the user for decisions and runs logic behind them
   * @param handIndex Which hand of the user's to make decisions for. Defaults to 0 (initial)
   */
  private async playerDecisions(handIndex = 0) {
    let playerDecisionsExhausted = false;
    while (!playerDecisionsExhausted) {
      // provide information
      this.ui.clear();
      this.ui.showCards('Dealer', [this.dealer.hands[0].peek(), Card.MYSTERY]); // returning a fake other card
      this.ui.showHand(this.player, handIndex);
      this.ui.print(
        `> Your Balance: $${this.player.balance} | Your Bid: $${this.player.bid} <`
      );

      // get player decision
      const decision: Decision = this.ui.promptData<Decision>(
        `Would you like to hit(h) or stand(s) ${
          this.player.canSplit(handIndex) ? ' or split (p)?' : '?\n> '
        }`,
        DecisionHelper.verifyStringDecision,
        DecisionHelper.decisionForString,
        `hs${
          this.player.canSplit(handIndex) ? 'p' : ''
        }` /* allow "p" (split) if an option */
      );

      switch (decision) {
        case Decision.stand: {
          // base case - prompts loop end
          // stand code
          this.ui.clear();
          this.ui.showHand(this.dealer);
          this.ui.showHand(this.player, handIndex);

          playerDecisionsExhausted = true;
          break;
        }
        case Decision.hit: {
          // prompts reloop
          this.player.add(this.deck.draw(), handIndex);
          if (this.player.hasBust(handIndex)) {
            // bust
            this.dealer.win();

            this.ui.clear();

            this.ui.showHand(this.dealer);
            this.ui.showHand(this.player, handIndex);
            this.ui.print('Bust! You went over!');
            playerDecisionsExhausted = true;
          }
          break;
        }
        case Decision.split: {
          // prompts 2 new playerDecision() calls
          if (this.player.balance < this.player.bid) {
            // splitting needs additional $$
            this.ui.print('Insufficient Funds to Split! How Humiliating!');
          } else {
            this.ui.clear();
            this.ui.print('Splitting!');
            const newHandIndicies = this.player.split(handIndex);
            this.playerDecisions(newHandIndicies[0]);
            this.playerDecisions(newHandIndicies[1]);
            playerDecisionsExhausted = true;
          }
          break;
        }
        default: {
          /* unreachable */
        }
      }
    }
    await delay(1000); // pause before dealer begins
  }

  /**
   * The Dealer "AI" (wikipedia rules on how to play) executes its decisions
   */
  private async dealerDecisions() {
    while (
      !this.player.hasBustOverall() /* Player hasn't bust (on any hand) (ie player still can win) */ &&
      this.dealer.total() <
        this.player.bestScoreOverall() /* Dealer hasn't beat the player yet */ &&
      (this.dealer.total() < 17 || this.dealer.softHand())
    ) {
      /* Dealer Hasn't Reached a High Enough Value */

      this.ui.clear();

      this.ui.print('Dealer hits!');
      this.dealer.add(this.deck.draw());
      this.ui.showHand(this.dealer);

      if (this.dealer.hasBust()) {
        return; // dealer can do nothing further, no need to mention they "stay" (they cannot stay)
      }
      await delay(1000); // pause while dealer thinks
    }

    this.ui.print(`Dealer decides to stay at ${this.dealer.total()}!`);
  }

  /**
   * Determines who won the round of BlackJack
   */
  private decideOutcome() {
    this.ui.clear();
    this.ui.showHand(this.dealer);
    if (this.dealer.hasBust()) {
      this.ui.print('Dealer Bust! Player Wins!');

      this.player.winAll(); // handles all cases where player busted first
      return; // no need to check any hands now
    }
    const dealerTotal = this.dealer.total();
    // loop over each hand the player had
    for (let handIndex = 0; handIndex < this.player.hands.length; handIndex++) {
      const handTotal = this.player.total(handIndex);
      this.ui.showHand(this.player, handIndex);
      if (this.player.hasBust(handIndex)) {
        this.ui.print('Player Bust — Dealer Wins!');
        this.dealer.win();
      } else if (dealerTotal > handTotal) {
        if (this.dealer.total() === BlackJack.WIN_NUMBER) {
          this.ui.print('Dealer got BlackJack! You Did Not! They Win!');
        } else {
          this.ui.print('Dealer was closer to BlackJack — Dealer Wins!');
        }

        this.dealer.win();
      } else if (dealerTotal < handTotal) {
        if (this.dealer.total() === BlackJack.WIN_NUMBER) {
          this.ui.print('Player got BlackJack! Dealer Did Not! You Win!');
        } else {
          this.ui.print('Player was closer to BlackJack — Player Wins!');
        }
        this.player.win();
      } else {
        this.ui.print('Tie!');
        this.player.tie();
        this.dealer.tie();
      }
    }
  }

  /**
   * Prints end game (loss) stats
   * @param {boolean} lost - Whether or not the player lost
   */
  private endGame(lost: boolean) {
    this.ui.print(
      `Final Balance: $${this.player.balance} Dealer Balance: $${this.dealer.balance}`
    );

    if (lost) {
      this.ui.print("You've been bankrupted!");
      this.ui.print('You can no longer play in this process :(');
    } else {
      this.ui.print('Thanks for playing!'); // surviors get thanks :(
      this.ui.print('See you next time!');
    }
  }

  /**
   * Checks if the player wants to still play, ends the game if they're done
   */
  private continuePlaying(): boolean {
    this.player.bid = 0;
    this.roundsPlayed++;
    this.ui.print(
      `Your Balance: $${this.player.balance} | Your Bid: $${this.player.bid}`
    );

    if (!this.ui.promptYN('Continue Playing?')) {
      this.endGame(false); // player didn't lose
      return false;
    }
    this.ui.clear();
    return true;
  }
}
