"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeString = analyzeString;
const crypto_1 = __importDefault(require("crypto"));
function analyzeString(value) {
    const Length = value.length;
    const lower = value.toLowerCase();
    const is_palindrome = lower === lower.split("").reverse().join("");
    const unique_characters = new Set(value).size;
    const word_count = value.trim().split(/\s+/).length;
    const sha256_hash = crypto_1.default.createHash("sha256").update(value).digest("hex");
    const character_frequency = {};
    for (const char of value) {
        if (character_frequency[char]) {
            character_frequency[char] += 1;
        }
        else {
            character_frequency[char] = 1;
        }
    }
    return {
        Length,
        is_palindrome,
        unique_characters,
        word_count,
        sha256_hash,
        character_frequency,
    };
}
//console.log(analyzestring("mama"));
//# sourceMappingURL=helper.js.map