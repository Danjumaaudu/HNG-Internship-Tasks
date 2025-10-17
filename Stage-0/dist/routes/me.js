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
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const merouter = (0, express_1.Router)();
merouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fact = yield axios_1.default.get(process.env.CAT_API_URL);
        const catFact = fact.data.fact;
        const timestamp = new Date().toISOString();
        const data = {
            status: "success",
            user: {
                email: process.env.USER_EMAIL,
                name: process.env.USER_NAME,
                stack: process.env.USER_STACK,
            },
            timestamp: timestamp,
            fact: catFact,
        };
        console.log("Fact: ", catFact);
        res.status(200).json(data);
    }
    catch (err) {
        console.error("Error fetch Facts", err);
        res
            .status(500)
            .json({ status: "error", message: "Unable to fecth cat from url" });
    }
}));
/**
 * @swagger
 * /me:
 *   get:
 *     summary: Fetches user info and a random cat fact
 *     description: >
 *       Returns the developer's basic info along with a **random cat fact** fetched
 *       dynamically from the Cat Facts API each time this endpoint is called.
 *       <br><br>
 *       _Note: Example values shown below are for documentation only. Actual responses vary._
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@gmail.com"
 *                     name:
 *                       type: string
 *                       example: "Full Name"
 *                     stack:
 *                       type: string
 *                       example: "My Tech stack"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-10-15T18:30:00.000Z"
 *                 fact:
 *                   type: string
 *                   example: "Cats random facts"
 */
exports.default = merouter;
//# sourceMappingURL=me.js.map