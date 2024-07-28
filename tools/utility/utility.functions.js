import fs from "fs";
import path from "path";

export function getFileContent(filePath) {
  return fs.readFileSync(getRelativeFilePath(filePath), "utf8");
}

export function getRelativeFilePath(filePath) {
  return path.join(process.cwd(), filePath);
}
