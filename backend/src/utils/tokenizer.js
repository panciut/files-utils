// backend/src/utils/tokenizer.js

const encoder = require("gpt-3-encoder");

/**
 * Function to count the number of tokens in a given text.
 * @param {string} text - The text to tokenize.
 * @returns {number} - The number of tokens.
 */
function countTokensGPT(text) {
  const tokens = encoder.encode(text);
  return tokens.length;
}

/**
 * Function to approximate the number of tokens in a given text.
 * @param {string} text - The text to tokenize.
 * @returns {number} - The approximate number of tokens.
 */
function countTokens(text) {
  // Split text by whitespace and common punctuation
  const tokens = text.split(/[\s,.;!?]+/);
  return tokens.filter(Boolean).length;
}

module.exports = { countTokensGPT, countTokens };
