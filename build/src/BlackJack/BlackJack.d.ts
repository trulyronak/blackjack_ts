export declare class BlackJack {
    static readonly PLAYER_DEFAULT_BANK = 800;
    static readonly DEALER_DEFAULT_BANK = 80000;
    static readonly WIN_NUMBER = 21;
    private player;
    private dealer;
    private deck;
    private ui;
    private bid;
    private roundsPlayed;
    constructor(playerBank?: number, dealerBank?: number, decksToUse?: number);
    play(): Promise<void>;
    private startRound;
    private setup;
    private playerDecisions;
    /**
     * The Dealer "AI" (wikipedia rules on how to play) executes its decisions
     */
    private dealerDecisions;
    private decideOutcome;
    private endGame;
    private continuePlaying;
}
