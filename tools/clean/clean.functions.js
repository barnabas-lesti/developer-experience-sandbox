import { execSync } from "child_process";

import { GIT_IGNORE_FILE_NAME, REMOTE_COMMAND_RUNNER } from "./clean.config.js";
import { getFileContent } from "../utility/utility.functions.js";

export function clean() {
  try {
    const cleanCommand = getCleanCommand();
    if (!cleanCommand) {
      console.error('No entries found in the ".clean" file.');
      return;
    }

    console.log(cleanCommand);
    execSync(cleanCommand, { stdio: "inherit" });
  } catch (error) {
    console.error(error);
  }
}

function getCleanCommand() {
  const { files, globs } = getFilesAndGlobs();
  const filesArgumentString = files.length > 0 ? " " + files.join(" ") : "";
  const globArgumentString = globs.length > 0 ? "--glob " + globs.join(" ") : "";

  if (!filesArgumentString && !globArgumentString) {
    return "";
  }

  return `${REMOTE_COMMAND_RUNNER} rimraf${filesArgumentString} ${globArgumentString}`;
}

function getFilesAndGlobs() {
  const files = [];
  const globs = [];

  getGitIgnoreFileContent()
    .split("\n")
    .map((entry) => entry.replace("\r", ""))
    .map((entry) => entry.trim())
    .filter((entry) => !!entry)
    .filter((entry) => !entry.startsWith("#"))
    .map((entry) => (entry.startsWith("/") || entry.endsWith("/") ? `**/${entry.replace(/^\/|\/$/g, "")}` : entry))
    .forEach((entry) => (entry.startsWith("**") ? globs : files).push(entry));

  return { files, globs };
}

function getGitIgnoreFileContent() {
  return getFileContent(GIT_IGNORE_FILE_NAME);
}
