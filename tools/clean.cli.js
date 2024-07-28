import { execSync } from "child_process";
import fs from "fs";

try {
  const files = [];
  const globs = [];

  fs.readFileSync(".clean", "utf8")
    .split("\n")
    .map((entry) => entry.replace("\r", ""))
    .filter((entry) => !!entry)
    .forEach((entry) => (entry.startsWith("**") ? globs : files).push(entry));

  const filesArgumentString = files.length > 0 ? " " + files.join(" ") : "";
  const globArgumentString = globs.length > 0 ? "--glob " + globs.join(" ") : "";

  if (!filesArgumentString && !globArgumentString) {
    throw new Error('No entries found in the ".clean" file.');
  }
  const cleanCommand = `pnpm dlx rimraf${filesArgumentString} ${globArgumentString}`;
  console.log(cleanCommand);

  execSync(cleanCommand, { stdio: "inherit" });
} catch (error) {
  throw new Error('".clean" file missing.');
}
