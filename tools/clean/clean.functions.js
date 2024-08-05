import { CONFIG_FILE_NAME, DEFAULT_RUNNER, RUNNER_ARGUMENT } from "./clean.const.js";
import { getCLIArgumentsMap, getFileContent, log, runCLICommand } from "../utility/utility.functions.js";

/**
 * Cleans the project by running using a remote runner and provided configuration file.
 */
export function clean() {
  const command = getCleanCommand();
  if (!command) {
    log("Nothing to clean, exiting command.");
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
  const runnerArgument = getCLIArgumentsMap()[RUNNER_ARGUMENT];
  return typeof runnerArgument === "string" ? runnerArgument : DEFAULT_RUNNER;
}

function getFilesAndGlobs() {
  const files = [];
  const globs = [];

  getConfigFileContent()
    .split("\n")
    .map((entry) => entry.replace("\r", ""))
    .map((entry) => entry.trim())
    .filter((entry) => !!entry)
    .filter((entry) => !entry.startsWith("#"))
    .map((entry) => (entry.startsWith("/") || entry.endsWith("/") ? `**/${entry.replace(/^\/|\/$/g, "")}` : entry))
    .forEach((entry) => (entry.startsWith("**") ? globs : files).push(entry));

  return { files, globs };
}

function getConfigFileContent() {
  try {
    return getFileContent(CONFIG_FILE_NAME);
  } catch (error) {
    /** @type {{ message: string }} */
    const { message } = error;
    const isFileNotFoundError = message.includes("ENOENT");

    if (isFileNotFoundError) {
      throw new Error(`"${CONFIG_FILE_NAME}" file not found in the root directory, please create one to use the tool.`);
    }

    throw error;
  }
}
