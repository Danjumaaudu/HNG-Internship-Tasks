"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDATA = readDATA;
exports.writeData = writeData;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DATA_FILE = path_1.default.join(__dirname, "data.json");
// 🧩 Read the JSON file safely
function readDATA() {
    try {
        if (!fs_1.default.existsSync(DATA_FILE))
            return {};
        const content = fs_1.default.readFileSync(DATA_FILE, "utf-8");
        return content ? JSON.parse(content) : {};
    }
    catch (err) {
        console.error("❌ Error reading data file:", err);
        return {};
    }
}
// 💾 Save new data safely (merge old + new)
function writeData(newData) {
    try {
        const existingData = readDATA();
        const mergedData = Object.assign(Object.assign({}, existingData), newData);
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(mergedData, null, 2), "utf-8");
        console.log("✅ Data saved successfully!");
    }
    catch (err) {
        console.error("❌ Error saving data file:", err);
    }
}
//# sourceMappingURL=storage.js.map