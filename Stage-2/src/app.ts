import express from "express";
import countryRoutes from "./routes/countryRoutes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "HNG Stage 2 API is running 🚀" });
});

app.use("/countries", countryRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
