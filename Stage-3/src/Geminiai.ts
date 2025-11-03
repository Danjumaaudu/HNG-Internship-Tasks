import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
import { EmailRequest,EmailResponse } from "./types";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.OPENAIGEMINI_API_KEY!);
const model = genAI.getGenerativeModel({model : "gemini-2.5-flash"});

export async function Emailgenerator ({topic, tone, senderName, profession,about} : EmailRequest) :Promise<EmailResponse>{
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
  const result = await model.generateContent(prompt);
  const message = result.response.text();


  try{
     const clean = message.replace(/```json|```/g,"").trim();
     return JSON.parse(clean);
  }catch(err) {
 console.error("Error parsing Gemini response:", err);
    return {
      subject: "Generated Email",
      body: message || "Could not parse Gemini output properly.",
    };
  }
}