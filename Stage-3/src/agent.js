"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAgent = void 0;
const agent_1 = require("@mastra/core/agent");
exports.EmailAgent = new agent_1.Agent({
    name: "ai_email_agent",
    instructions: "Generates professional emails based on topic and tone",
    model: "gemini-2.5-flash"
});
