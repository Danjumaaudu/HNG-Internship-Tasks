"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emailgenerator = Emailgenerator;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.OPENAIGEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
function Emailgenerator(_a) {
    return __awaiter(this, arguments, void 0, function* ({ topic, tone, senderName, profession, about }) {
        const prompt = `
You are an AI email assistant that writes personalized, professional emails.

Context about the sender:
- Name: ${senderName || "User"}
- Profession or role: ${profession || "professional"}
- Extra details: ${about || "No extra context provided."}

Your task:
Write an email about "${topic}" in a ${tone} tone, making it sound natural and aligned with the sender's background.

Return only a JSON object:
{
  "subject": "...",
  "body": "..."
}
`;
        const result = yield model.generateContent(prompt);
        const message = result.response.text();
        try {
            const clean = message.replace(/```json|```/g, "").trim();
            return JSON.parse(clean);
        }
        catch (err) {
            console.error("Error parsing Gemini response:", err);
            return {
                subject: "Generated Email",
                body: message || "Could not parse Gemini output properly.",
            };
        }
    });
}
