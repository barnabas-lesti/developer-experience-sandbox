// import { execSync } from "child_process";

import { ALLOWED_ARGUMENTS, GIT_IGNORE_FILE_NAME, RUNNER_ARGUMENT } from "./clean.config.js";
import { getFileContent } from "../utility/utility.functions.js";

function getCLIArgumentsMap() {
  const [, , ...argumentsArray] = process.argv;
  return argumentsArray.reduce((accumulator, argumentString) => {
    const argumentPair = argumentString.split("=");
    const key = argumentPair[0];
    const value = argumentPair[1] || true;

    if (!ALLOWED_ARGUMENTS.includes(key)) {
      console.warn(`Argument "${key}" is unknown for the tool, will not be used.`);
      return accumulator;
    }

    if (accumulator[key]) {
      console.warn(`Argument "${key}" set multiple times, using first occurrence.`);
      return accumulator;
    }

    return { ...accumulator, ...{ [key]: value } };
  }, {});
}

export function clean() {
  try {
    const cleanCommand = getCleanCommand();
    if (!cleanCommand) {
      console.error('No entries found in the ".clean" file.');
      return;
    }

    console.log(cleanCommand);
    // execSync(cleanCommand, { stdio: "inherit" });
  } catch (error) {
    console.error(error);
  }
}

function getCleanCommand() {
  const runner = getCLIArgumentsMap()[RUNNER_ARGUMENT];

  if (!runner) {
    console.error(`${RUNNER_ARGUMENT} not set, exiting command.`);
  }

  const { files, globs } = getFilesAndGlobs();
  const filesArgumentString = files.length > 0 ? " " + files.join(" ") : "";
  const globArgumentString = globs.length > 0 ? "--glob " + globs.join(" ") : "";

  if (!filesArgumentString && !globArgumentString) {
    return "";
  }

  return `${runner} rimraf${filesArgumentString} ${globArgumentString}`;
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
