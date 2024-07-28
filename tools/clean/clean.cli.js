import { execSync } from "child_process";

import { getFileContent } from "../utility/utility.functions.js";

const GIT_IGNORE_FILE_NAME = ".gitignore";

try {
  const gitIgnoreFileContent = getFileContent(GIT_IGNORE_FILE_NAME);
  const files = [];
  const globs = [];

  gitIgnoreFileContent
    .split("\n")
    .map((entry) => entry.replace("\r", ""))
    .map((entry) => entry.trim())
    .filter((entry) => !!entry)
    .filter((entry) => !entry.startsWith("#"))
    .map((entry) => (entry.startsWith("/") || entry.endsWith("/") ? `**/${entry.replace(/^\/|\/$/g, "")}` : entry))
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
  throw new Error(error);
}
