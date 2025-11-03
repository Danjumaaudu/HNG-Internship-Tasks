import express from "express";
import dotenv from "dotenv";
import { Emailgenerator } from "./Geminiai";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/a2a/email", async (req, res) => {
  const { topic, tone, senderName, profession, about } = req.body;

  if (!topic || !tone) {
    return res.status(400).json({ error: "Please provide a topic and tone." });
  }

  try {
    const email = await Emailgenerator({ topic, tone, senderName, profession, about });
    res.json(email);
  } catch (err) {
    console.error("Error generating email:", err);
    res.status(500).json({ error: "Failed to generate email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
