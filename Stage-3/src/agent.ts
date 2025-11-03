import {Agent} from "@mastra/core/agent"
import {Emailgenerator} from "./Geminiai";


export const EmailAgent = new Agent({
  name: "ai_email_agent",
   instructions: "Generates professional emails based on topic and tone",
   model: "gemini-2.5-flash"
});

