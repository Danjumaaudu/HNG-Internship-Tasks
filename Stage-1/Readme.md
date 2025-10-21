.

🧩 String Analyzer REST API

A RESTful API service for analyzing and managing string properties — designed to compute detailed statistics about any string, support filtering (including natural language queries), and handle full CRUD operations.
Developed as part of a backend development task using Node.js + Express.

🚀 Features

Create & Analyze Strings: Automatically compute detailed properties for any string.

Retrieve Specific Strings: Fetch any previously analyzed string by its value.

Filter Strings: Query based on conditions like palindrome, length, word count, or character inclusion.

Natural Language Querying: Use simple English-like queries (e.g., “all single word palindromic strings”).

Delete Strings: Remove strings from the database.

Detailed Error Handling: Follows proper HTTP status codes and JSON response structures.

🧠 Computed String Properties
Property	Description
length	Total number of characters (including spaces and punctuation).
is_palindrome	Boolean; true if the string reads the same forwards and backwards (case-insensitive).
unique_characters	Count of distinct characters.
word_count	Number of words (split by whitespace).
sha256_hash	SHA-256 hash of the string (used as a unique ID).
character_frequency_map	Object mapping each character to its occurrence count.
📦 API Endpoints
1️⃣ Create / Analyze String

POST /strings

{
  "value": "string to analyze"
}


Response (201 Created):

{
  "id": "sha256_hash_value",
  "value": "string to analyze",
  "properties": {
    "length": 16,
    "is_palindrome": false,
    "unique_characters": 12,
    "word_count": 3,
    "sha256_hash": "abc123...",
    "character_frequency_map": { "s": 2, "t": 3 }
  },
  "created_at": "2025-08-27T10:00:00Z"
}

2️⃣ Get Specific String

GET /strings/{string_value}
Response (200 OK):

{
  "id": "hash_value",
  "value": "requested string",
  "properties": { /* ... */ },
  "created_at": "2025-08-27T10:00:00Z"
}

3️⃣ Get All Strings (with Filters)

GET /strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a
Response (200 OK):

{
  "data": [ /* list of matching strings */ ],
  "count": 15,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 5,
    "max_length": 20,
    "word_count": 2,
    "contains_character": "a"
  }
}

4️⃣ Natural Language Filtering

GET /strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings
Response (200 OK):

{
  "data": [ /* matching strings */ ],
  "count": 3,
  "interpreted_query": {
    "original": "all single word palindromic strings",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true
    }
  }
}

5️⃣ Delete String

DELETE /strings/{string_value}
Response (204 No Content)

Returns empty body if successfully deleted.

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

2. Install Dependencies
npm install

3. Create an Environment File

Create a .env file in the root directory:

PORT=8080
NODE_ENV=development

4. Run the Server
npm run dev


Server starts on:
👉 http://localhost:8080

🌐 Deployment

The API is hosted on PXXL App

Base URL: https://your-app-name.pxxl.app

🧪 Example Testing

You can test using Postman, cURL, or HTTPie.

Example cURL:

curl -X POST https://your-app-name.pxxl.app/strings \
-H "Content-Type: application/json" \
-d '{"value": "hello world"}'

⚠️ Error Handling
Status Code	Meaning	Example
400	Bad Request	Missing or invalid fields
404	Not Found	String does not exist
409	Conflict	Duplicate string value
422	Unprocessable Entity	Invalid data type
204	No Content	Successful deletion
🧰 Tech Stack

Runtime: Node.js (v18+)

Framework: Express.js

Language: JavaScript / TypeScript (depending on your setup)

Hashing: crypto (built-in Node.js module)

Database: In-memory / optional persistence (JSON or DB)