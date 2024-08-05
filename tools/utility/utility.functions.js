import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Logs messages to the terminal with given options.
 * @param {(string | Object | Array<*>)} payload - The message(s) to log, can be a string or an array of any type.
 * @param {Object} [options] - Optional configuration object.
 * @param {"info" | "warn" | "error" | "debug"} [options.level="info"] - The log level.
 * @returns {void}
 */
export function log(payload, options = {}) {
  const { level = "info" } = options;

  // eslint-disable-next-line no-console
  console[level](...(Array.isArray(payload) ? payload : [payload]));
}

/**
 * Runs the given command in the terminal.
 * @param {string} command - Command to execute.
 * @returns {void}
 */
export function runCLICommand(command) {
  try {
    log(command);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    log(error, { level: "error" });
  }
}

/**
 * Parses command line arguments into a key-value map.
 * Arguments should be in the form `key=value`.
 * If an argument is provided without an `=` sign, it will be set to `true`.
 * If the same key is specified multiple times, only the first occurrence will be used.
 * @returns {Object<string, string | boolean>} A map of command line arguments.
 */
export function getCLIArgumentsMap() {
  const [, , ...argumentsArray] = process.argv;
  return argumentsArray.reduce((accumulator, argumentString) => {
    const argumentPair = argumentString.split("=");
    const key = argumentPair[0];
    const value = argumentPair[1] || true;

    if (accumulator[key]) {
      log(`Argument "${key}" set multiple times, using first occurrence.`, { level: "warn" });
      return accumulator;
    }

    return { ...accumulator, ...{ [key]: value } };
  }, {});
}

/**
 * Reads the content of a file and returns it as a string.
 * This function reads the file specified by `filePath` and returns its content as a UTF-8 string.
 * @param {string} filePath - The path to the file to be read.
 * @returns {string} The content of the file as a UTF-8 string.
 * @throws {Error} If the file cannot be read, an error will be thrown.
 */
export function getFileContent(filePath) {
  return fs.readFileSync(getRelativeFilePath(filePath), "utf8");
}

function getRelativeFilePath(filePath) {
  return path.join(process.cwd(), filePath);
}
