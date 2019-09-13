declare enum Decision {
    hit = "h",
    stand = "s",
    split = "sp"
}
export declare function verifyStringDecision(s: string): boolean;
export declare function decisionForString(s: string): Decision;
export { Decision };
