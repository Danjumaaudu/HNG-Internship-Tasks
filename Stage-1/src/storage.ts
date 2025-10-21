import fs from "fs";
import path from "path";

const DATA_FILE = path.join(__dirname, "data.json");

// 🧩 Read the JSON file safely
export function readDATA() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return content ? JSON.parse(content) : {};
  } catch (err) {
    console.error("❌ Error reading data file:", err);
    return {};
  }
}

// 💾 Save new data safely (merge old + new)
export function writeData(newData: any) {
  try {
    const existingData = readDATA();
    const mergedData = { ...existingData, ...newData };
    fs.writeFileSync(DATA_FILE, JSON.stringify(mergedData, null, 2), "utf-8");
    console.log("✅ Data saved successfully!");
  } catch (err) {
    console.error("❌ Error saving data file:", err);
  }
}
