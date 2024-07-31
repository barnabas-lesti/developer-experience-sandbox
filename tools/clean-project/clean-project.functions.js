import { DEFAULT_RUNNER, GIT_IGNORE_FILE_NAME, RUNNER_ARGUMENT } from "./clean-project.config.js";
import { getCLIArgumentsMap, getFileContent, runCLICommand } from "../utility/index.js";

export function cleanProject() {
  const command = getCleanCommand();
  if (!command) {
    console.log("Nothing to clean, exiting command.");
    return;
  }

  runCLICommand(command);
}

function getCleanCommand() {
  const runner = getRunner();
  const { files, globs } = getFilesAndGlobs();
  const filesArgumentString = files.length > 0 ? " " + files.join(" ") : "";
  const globArgumentString = globs.length > 0 ? "--glob " + globs.join(" ") : "";

  if (!filesArgumentString && !globArgumentString) {
    return;
  }

  return `${runner} rimraf${filesArgumentString} ${globArgumentString}`;
}

function getRunner() {
  return getCLIArgumentsMap()[RUNNER_ARGUMENT] || DEFAULT_RUNNER;
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
