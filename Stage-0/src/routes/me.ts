import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const merouter = Router();

merouter.get("/", async (req: Request, res: Response) => {
  try {
    const fact = await axios.get(process.env.CAT_API_URL!);
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
      fact: "Testing deployment — no API call yet,",
    };
    console.log("Fact: ", catFact);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetch Facts", err);
    res
      .status(500)
      .json({ status: "error", message: "Unable to fecth cat from url" });
  }
});

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

export default merouter;
