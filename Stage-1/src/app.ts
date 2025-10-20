import express, { Request, Response } from "express";
import String_router from "./routes/String_routes";

const app = express();
const PORT = 3000;

app.use(express.json());

/*app.get("/", (req, res) => {
  res.json({ message: "running server" });
});*/


app.use("/string",String_router )


app.listen(PORT, () => {
  console.log(`Server running in Port ${PORT}`);
});
