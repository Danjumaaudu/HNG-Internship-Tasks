"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const me_1 = __importDefault(require("./routes/me"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//rate-limting
const limiter = (0, express_rate_limit_1.default)({ windowMs: 60 * 1000, max: 15 });
app.use((0, cors_1.default)());
//logging for debuugging
app.use((0, morgan_1.default)("dev"));
app.use(limiter);
app.get("/", (req, res) => {
    res.send("Getting credentials and fact checks");
});
app.use("/me", me_1.default);
app.listen(PORT, () => {
    console.log(`Server running in Port ${PORT}`);
});
//# sourceMappingURL=app.js.map