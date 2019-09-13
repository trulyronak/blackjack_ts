export declare enum Suite {
    Clove = "\u2663",
    Diamond = "\u2666",
    Heart = "\u2665",
    Spade = "\u2660",
    Joker = "?",
    Unknown = "?"
}
export declare class Card {
    static readonly JOKER_VALUE = 14;
    static readonly MYSTERY_VALUE = 0;
    static readonly JACK_VALUE = 11;
    static readonly QUEEN_VALUE = 12;
    static readonly KING_VALUE = 13;
    static readonly MYSTERY: Card;
    suite: Suite;
    value: number;
    constructor(s: Suite, v: number);
    toStringArray(): string[];
    toString(): string;
}
