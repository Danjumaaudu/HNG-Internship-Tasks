import express, { Request, Response } from "express";
import merouter from "./routes/me";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { swaggerspec } from "./docs/swagger-documentation";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
//rate-limting
const limiter = rateLimit({ windowMs: 60 * 1000, max: 15 });

app.use(cors());

//logging for debuugging
app.use(morgan("dev"));

app.use(limiter);
app.get("/", (req, res) => {
  res.send("Getting credentials and fact checks");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerspec)
)

app.use("/me", merouter);

app.listen(PORT, () => {
  console.log(`Server running in Port ${PORT}`);
});
