"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Decision;
(function (Decision) {
    Decision["hit"] = "h";
    Decision["stand"] = "s";
    Decision["split"] = "sp";
})(Decision || (Decision = {}));
exports.Decision = Decision;
function verifyStringDecision(s) {
    s = s.toLowerCase();
    return (s === 'h' ||
        s === 'hit' ||
        s === 's' ||
        s === 'stand' ||
        s === 'p' ||
        s === 'split');
}
exports.verifyStringDecision = verifyStringDecision;
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