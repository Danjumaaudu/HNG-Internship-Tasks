import express ,{Request, Response} from "express";
import merouter from "./routes/me";



const app = express();
const PORT = 3000;

app.get("/",(req, res) => {
    res.send("Getting credentials and fact checks");
});

app.use("/me", merouter)

app.listen(PORT, () => {
   console.log((`Server running in http://localhost:${PORT}`));
});