"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const String_routes_1 = __importDefault(require("./routes/String_routes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
/*app.get("/", (req, res) => {
  res.json({ message: "running server" });
});*/
app.use("/string", String_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running in Port ${PORT}`);
});
//# sourceMappingURL=app.js.map