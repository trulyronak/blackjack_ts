/**
 * Types of decisions a player can make
 * @enum {string}
 */
enum Decision {
  hit = 'h',
  stand = 's',
  split = 'sp',
}

/**
 * Makes sure a string matches a decision type
 * @param s the string to verify
 * @returns {boolean}
 */
export function verifyStringDecision(s: string): boolean {
  s = s.toLowerCase();
  return s === 'h' || s === 's' || s === 'p';
}

/**
 * Converts a string to a Decision enum. Assumes string was verified
 * @param s the verified string to convert
 * @returns {Decision}
 */
export function decisionForString(s: string): Decision {
  s = s.toLowerCase();
  if (s.charAt(0) === 'h') {
    return Decision.hit;
  } else if (s.charAt(0) === 'p') {
    return Decision.split;
  } else {
    return Decision.stand;
  }
}

export { Decision };
