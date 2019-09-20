/**
 * @fileoverview Contains the master game code for BlackJack
 */
/**
 * A Class that manages a game of BlackJack
 */
export declare class BlackJack {
    static readonly PLAYER_DEFAULT_BANK = 800;
    static readonly DEALER_DEFAULT_BANK = 80000;
    static readonly WIN_NUMBER = 21;
    private player;
    private dealer;
    private deck;
    private ui;
    private roundsPlayed;
    /**
     * Makes the BlackJack game. Prompts the user about inteface settings on call.
     * All parameters optional (default values provided)
     * @param {number} playerBank - How much money the player starts off with
     * @param {number} dealerBank - How much money the dealer starts off with
     * @param {number} decksToUse - How many decks to use in the game
     */
    constructor(playerBank?: number, dealerBank?: number, decksToUse?: number);
    /**
     * Plays the game. Runs asynchronously to imitate dealer thought
     */
    play(): Promise<void>;
    /**
     * Starts up the round by alerting the player, and resetting the decks (every 3 rounds)
     */
    private startRound;
    /**
     * Gets the players bid and deals cards
     */
    private setup;
    /**
     * Prompts the user for decisions and runs logic behind them
     * @param handIndex Which hand of the user's to make decisions for. Defaults to 0 (initial)
     */
    private playerDecisions;
    /**
     * The Dealer "AI" (wikipedia rules on how to play) executes its decisions
     */
    private dealerDecisions;
    /**
     * Determines who won the round of BlackJack
     */
    private decideOutcome;
    /**
     * Prints end game (loss) stats
     * @param {boolean} lost - Whether or not the player lost
     */
    private endGame;
    /**
     * Checks if the player wants to still play, ends the game if they're done
     */
    private continuePlaying;
}
