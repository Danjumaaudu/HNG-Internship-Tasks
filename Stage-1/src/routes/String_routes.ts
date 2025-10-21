import { Router, Request, Response } from "express";
import { analyzeString } from "../helper";
import { readDATA, writeData } from "../storage";

const String_router = Router();

// 🔄 Reload data before each request
let analyzeStrings = readDATA();

// ✅ POST /strings — Create and analyze a new string
String_router.post("/", (req: Request, res: Response) => {
  const { value } = req.body;

  // Validation
  if (value === undefined)
    return res.status(400).json({ error: "Missing 'value' field" });
  if (typeof value !== "string")
    return res.status(422).json({ error: "'value' must be a string" });

  analyzeStrings = readDATA();
  if (analyzeStrings[value])
    return res.status(409).json({ error: "String already exists" });

  const properties = analyzeString(value);
  const response = {
    id: properties.sha256_hash,
    value,
    properties,
    created_at: new Date().toISOString(),
  };

  analyzeStrings[value] = response;
  writeData(analyzeStrings);

  return res.status(201).json(response);
});

// ✅ GET /strings — Retrieve all strings (with optional filters)
String_router.get("/", (req: Request, res: Response) => {
  analyzeStrings = readDATA();

  const {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character,
  } = req.query;

  let results = Object.values(analyzeStrings);

  if (is_palindrome !== undefined) {
    const boolVal = is_palindrome === "true";
    results = results.filter(
      (item: any) => item.properties.is_palindrome === boolVal
    );
  }

  if (min_length) {
    const min = parseInt(min_length as string, 10);
    results = results.filter((item: any) => item.properties.length >= min);
  }

  if (max_length) {
    const max = parseInt(max_length as string, 10);
    results = results.filter((item: any) => item.properties.length <= max);
  }

  if (word_count) {
    const count = parseInt(word_count as string, 10);
    results = results.filter(
      (item: any) => item.properties.word_count === count
    );
  }

  if (contains_character) {
    const char = contains_character as string;
    results = results.filter((item: any) => item.value.includes(char));
  }

  return res.status(200).json({
    data: results,
    count: results.length,
    filters_applied: {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    },
  });
});




// ✅ GET /strings/filter-by-natural-language — Basic NL filtering
String_router.get(
  "/filter-by-natural-language",
  (req: Request, res: Response) => {
    analyzeStrings = readDATA();
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'query' parameter" });
    }

    const q = query.toLowerCase();
    const filters: any = {};

    // Keyword matching
    if (q.includes("palindromic")) filters.is_palindrome = true;
    if (q.includes("single word")) filters.word_count = 1;

    const lengthMatch = q.match(/longer than (\d+)/);
    if (lengthMatch) filters.min_length = parseInt(lengthMatch[1], 10);

    const charMatch = q.match(/containing the letter ([a-z])/);
    if (charMatch) filters.contains_character = charMatch[1];

    let results = Object.values(analyzeStrings);

    if (filters.is_palindrome !== undefined) {
      results = results.filter(
        (item: any) => item.properties.is_palindrome === filters.is_palindrome
      );
    }

    if (filters.word_count !== undefined) {
      results = results.filter(
        (item: any) => item.properties.word_count === filters.word_count
      );
    }

    if (filters.min_length !== undefined) {
      results = results.filter(
        (item: any) => item.properties.length > filters.min_length
      );
    }

    if (filters.contains_character) {
      results = results.filter((item: any) =>
        item.value.includes(filters.contains_character)
      );
    }

    return res.status(200).json({
      data: results,
      count: results.length,
      interpreted_query: {
        original: query,
        parsed_filters: filters,
      },
    });
  }
);


// ✅ DELETE /strings/:value — Delete a specific string
String_router.delete("/:value", (req: Request, res: Response) => {
  analyzeStrings = readDATA();
  const { value } = req.params;

  if (!analyzeStrings[value])
    return res.status(404).json({ error: "String not found" });

  delete analyzeStrings[value];
  writeData(analyzeStrings);

  return res.status(204).send(); // Empty response body
});
// ✅ GET /strings/:value — Retrieve a specific string
String_router.get("/:value", (req: Request, res: Response) => {
  analyzeStrings = readDATA();
  const { value } = req.params;

  if (!analyzeStrings[value])
    return res.status(404).json({ error: "String does not exist" });

  return res.status(200).json(analyzeStrings[value]);
});
export default String_router;
