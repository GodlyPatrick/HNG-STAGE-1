import crypto from 'crypto';

export const analyzeString = (value) => {
  const cleaned = value.trim();
  const length = cleaned.length;
  const is_palindrome = cleaned.toLowerCase() === cleaned.toLowerCase().split('').reverse().join('');
  const unique_characters = new Set(cleaned).size;
  const word_count = cleaned.split(/\s+/).filter(Boolean).length;

  // Create frequency map
  const character_frequency_map = {};
  for (const char of cleaned) {
    character_frequency_map[char] = (character_frequency_map[char] || 0) + 1;
  }

  // Hash value
  const sha256_hash = crypto.createHash('sha256').update(cleaned).digest('hex');

  return {
    length,
    is_palindrome,
    unique_characters,
    word_count,
    sha256_hash,
    character_frequency_map,
  };
};
