import { Router, Request, Response } from "express";
import axios from "axios";

const merouter = Router();

merouter.get("/", async (req: Request, res: Response) => {
  try {
    const fact = await axios.get("https://catfact.ninja/fact");
    const catFact = fact.data.fact

    const  timestamp = new Date().toISOString();

    const data = {
        status : "success",
        user :  {
            email : "muh.audu@gmail.com",
            name : "Audu Mohammed Danjuma",
            stack : "Node.js/express.js/typescript/mongodb/postgresql"
        },

        timestamp : timestamp,
        fact: catFact
    }
    console.log("Fact: ", catFact)
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetch Facts", err);
    res.status(500).json({status: "error", message: "Unable to fecth cat from url" });
  }
});


export default merouter