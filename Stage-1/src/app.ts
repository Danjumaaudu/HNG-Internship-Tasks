import express, { Request, Response } from "express";
import String_router from "./routes/String_routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "String Analysis API",
    version: "1.0.0",
    endpoints: {
      "POST /strings": "Create a new string analysis",
      "GET /strings/{string_value}": "Retrieve a specific string",
      "GET /strings": "List all strings with optional filters",
      "GET /strings/filter-by-natural-language": "Filter strings using natural language",
      "DELETE /strings/{string_value}": "Delete a string",
      "GET /docs": "API documentation"
    }
  });
});


app.use("/strings",String_router )


app.listen(PORT, () => {
  console.log(`Server running in Port ${PORT}`);
});
