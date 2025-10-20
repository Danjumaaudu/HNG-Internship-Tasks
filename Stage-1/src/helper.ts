import crypto from "crypto";

export interface Stringproperties {
  Length: number;
  is_palindrome: boolean;
  word_count: number;
  unique_characters: number;
  character_frequency: Record<string, number>;
  sha256_hash: string;
}

export function analyzeString(value: string): Stringproperties {
  const Length = value.length;
  const lower = value.toLowerCase();
  const is_palindrome = lower === lower.split("").reverse().join("");
  const unique_characters = new Set(value).size;
  const word_count = value.trim().split(/\s+/).length;

  const sha256_hash = crypto.createHash("sha256").update(value).digest("hex");
  const character_frequency: Record<string, number> = {};
  for (const char of value) {
    if (character_frequency[char]) {
      character_frequency[char] += 1;
    } else {
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
