/**
 * Types of decisions a player can make
 * @enum {string}
 */
declare enum Decision {
    hit = "h",
    stand = "s",
    split = "sp"
}
/**
 * Makes sure a string matches a decision type
 * @param s the string to verify
 * @returns {boolean}
 */
export declare function verifyStringDecision(s: string): boolean;
/**
 * Converts a string to a Decision enum. Assumes string was verified
 * @param s the verified string to convert
 * @returns {Decision}
 */
export declare function decisionForString(s: string): Decision;
export { Decision };
