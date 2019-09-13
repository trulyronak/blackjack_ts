"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Types of decisions a player can make
 * @enum {string}
 */
var Decision;
(function (Decision) {
    Decision["hit"] = "h";
    Decision["stand"] = "s";
    Decision["split"] = "sp";
})(Decision || (Decision = {}));
exports.Decision = Decision;
/**
 * Makes sure a string matches a decision type
 * @param s the string to verify
 * @returns {boolean}
 */
function verifyStringDecision(s) {
    s = s.toLowerCase();
    return (s === 'h' ||
        s === 's' ||
        s === 'p');
}
exports.verifyStringDecision = verifyStringDecision;
/**
 * Converts a string to a Decision enum. Assumes string was verified
 * @param s the verified string to convert
 * @returns {Decision}
 */
function decisionForString(s) {
    s = s.toLowerCase();
    if (s.charAt(0) === 'h') {
        return Decision.hit;
    }
    else if (s.charAt(0) === 'p') {
        return Decision.split;
    }
    else {
        return Decision.stand;
    }
}
exports.decisionForString = decisionForString;
//# sourceMappingURL=Decision.js.map