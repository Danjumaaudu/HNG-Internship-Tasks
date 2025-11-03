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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Geminiai_1 = require("./Geminiai");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/a2a/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic, tone, senderName, profession, about } = req.body;
    if (!topic || !tone) {
        return res.status(400).json({ error: "Please provide a topic and tone." });
    }
    try {
        const email = yield (0, Geminiai_1.Emailgenerator)({ topic, tone, senderName, profession, about });
        res.json(email);
    }
    catch (err) {
        console.error("Error generating email:", err);
        res.status(500).json({ error: "Failed to generate email." });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
