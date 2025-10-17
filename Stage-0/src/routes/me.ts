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
      fact: catFact
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


export default merouter;
