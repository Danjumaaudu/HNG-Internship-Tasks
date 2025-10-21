import { Router, Request, Response } from "express";
import { analyzeString } from "../helper";
import { readDATA, writeData } from "../storage";
import path from "path";
import fs from "fs"

const String_router = Router();


// Load stored data from JSON
let analyzeStrings = readDATA();

// ✅ POST /string — Add new value
String_router.post("/", (req: Request, res: Response) => {
  const { value } = req.body;

  if (!value) return res.status(400).json({ error: "missing 'value' field" });
  if (typeof value !== "string")
    return res.status(422).json({ error: "not a string" });
  if (analyzeStrings[value])
    return res.status(409).json({ error: "value already exists" });

  const properties = analyzeString(value);
  const response = {
    id: properties.sha256_hash,
    value,
    properties,
    created_at: new Date().toISOString(),
  };

  analyzeStrings[value] = response; // save in memory
  writeData(analyzeStrings); // persist to file

  res.status(201).json(response);
});

// ✅ GET /string/filter_by_natural_language
String_router.get(
  "/filter_by_natural_language",
  (req: Request, res: Response) => {
    const queryParam = req.query.query;

    if (!queryParam || typeof queryParam !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'query' parameter" });
    }

    const query = queryParam.toLowerCase();
    const filter: any = {};

    if (query.includes("palindromic")) filter.is_palindrome = true;
    if (query.includes("single word")) filter.word_count = 1;

    const lengthMatch = query.match(/longer than (\d+)/);
    if (lengthMatch) filter.min_length = parseInt(lengthMatch[1]);

    const containMatch = query.match(/containing letter ([a-z])/);
    if (containMatch) filter.contains_character = containMatch[1];

    let results = Object.values(analyzeStrings);

    if (filter.is_palindrome !== undefined) {
      results = results.filter(
        (item: any) => item.properties.is_palindrome === filter.is_palindrome
      );
    }

    if (filter.word_count !== undefined) {
      results = results.filter(
        (item: any) => item.properties.word_count === filter.word_count
      );
    }

    if (filter.min_length !== undefined) {
      results = results.filter(
        (item: any) => item.properties.Length > filter.min_length
      );
    }

    if (filter.contains_character) {
      results = results.filter((item: any) =>
        item.value.includes(filter.contains_character)
      );
    }

    return res.status(200).json({
      data: results,
      count: results.length,
      interpreted_query: {
        original_query: query,
        parsed_filter: filter,
      },
    });
  }
);



// ✅ GET /string — Filtered list
String_router.get("/", (req: Request, res: Response) => {
  const {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character,
  } = req.query;

  let results = Object.values(analyzeStrings);

  if (is_palindrome !== undefined) {
    const boolValue = is_palindrome === "true";
    results = results.filter(
      (item: any) => item.properties.is_palindrome === boolValue
    );
  }

  if (min_length) {
    const min = parseInt(min_length as string, 10);
    results = results.filter((item: any) => item.properties.Length >= min);
  }

  if (max_length) {
    const max = parseInt(max_length as string, 10);
    results = results.filter((item: any) => item.properties.Length <= max);
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

  res.status(200).json({
    data: results,
    count: results.length,
    filters_length: {
      is_palindrome,
      min_length,
      max_length,
      word_count,
      contains_character,
    },
  });
});

String_router.delete("/:value", (req, res) => {
    const data = readDATA();
  const { value } = req.params;

  if (!data[value]) {
    return res.status(404).json({ error: "String not found" });
  }

  delete data[value];
  writeData(data);
  return res.status(204).send(); // Empty response body
});


// ✅ GET /string/:value — Retrieve one
String_router.get("/:value", (req: Request, res: Response) => {
  const { value } = req.params;
  if (!analyzeStrings[value])
    return res.status(404).json({ error: "Value does not exist" });

  return res.status(200).json(analyzeStrings[value]);
});

export default String_router;
