import { Router, Request, Response } from "express";
import { analyzeString } from "../helper";

const String_router = Router();

const analyzeStrings = new Map<string, any>();
// post /string endpoint 
String_router.post("/", (req: Request, res: Response) => {
  const { value } = req.body;

  if (!value) {
    return res.status(400).json({ error: "missing 'value' field" });
  }
  if (typeof value !== "string") {
    return res.status(422).json({ error: "not a string" });
  }
  if (analyzeStrings.has(value)) {
    return res.status(409).json({ error: "value already exist" });
  }

  const properties = analyzeString(value);
  const response = {
    id: properties.sha256_hash,
    value,
    properties,
    created_at: new Date().toISOString(),
  };

  analyzeStrings.set(value, response);
  res.status(201).json(response);
});
//get /string/:value
String_router.get("/:value", (req: Request, res: Response) => {
  const { value } = req.body;
  if (!analyzeStrings.has(value)) {
    return res.status(404).json({ error: "Values does not exist" });
  }

  const record = analyzeStrings.get(value);

  return res.status(200).json(record);
});

//get /string with filtered words
String_router.get("/", (req: Request, res: Response) => {
  const {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character,
  } = req.query;

  let results = Array.from(analyzeStrings.values());

  if (is_palindrome !== undefined) {
    const boolValue = is_palindrome === "true";
    results = results.filter(
      (item) => item.properties.is_palindrome === boolValue
    );
  }

  if (min_length) {
    const min = parseInt(min_length as string, 10);
    results = results.filter((item) => item.properties.Length >= min);
  }

  if (max_length) {
    const max = parseInt(max_length as string, 10);
    results = results.filter((item) => item.properties.Length <= max);
  }

  if (word_count) {
    const count = parseInt(word_count as string, 10);
    results = results.filter((item) => item.properties.word_count === count);
  }

  if (contains_character) {
    const char = contains_character as string;
    results = results.filter((item) => item.value.includes(char));
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
export default String_router;
