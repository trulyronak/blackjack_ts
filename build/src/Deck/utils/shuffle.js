"use strict";
/**
 * @fileoverview Holds all array-type utility functions
 * @author ronakshah
 * @created 09/28/2018
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Shuffles an array using the Fisher-Yates Shuffles
 * @param {array} a - the array to shuffle
 *
 * directly copied (with minor changes) from stack overflow. this is not my code
 * https://stackoverflow.com/a/6274398/4166655
 */
function shuffle(a) {
    const array = a.slice(0); // making a copy of original array (only change in code)
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        const temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
exports.shuffle = shuffle;
//# sourceMappingURL=shuffle.js.map