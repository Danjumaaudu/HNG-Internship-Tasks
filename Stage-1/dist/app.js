"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const String_routes_1 = __importDefault(require("./routes/String_routes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
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
app.use("/string", String_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running in Port ${PORT}`);
});
//# sourceMappingURL=app.js.map