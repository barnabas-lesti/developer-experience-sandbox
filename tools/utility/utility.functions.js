import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export function getFileContent(filePath) {
  return fs.readFileSync(getRelativeFilePath(filePath), "utf8");
}

export function getRelativeFilePath(filePath) {
  return path.join(process.cwd(), filePath);
}

export function getCLIArgumentsMap() {
  const [, , ...argumentsArray] = process.argv;
  return argumentsArray.reduce((accumulator, argumentString) => {
    const argumentPair = argumentString.split("=");
    const key = argumentPair[0];
    const value = argumentPair[1] || true;

    if (accumulator[key]) {
      console.warn(`Argument "${key}" set multiple times, using first occurrence.`);
      return accumulator;
    }

    return { ...accumulator, ...{ [key]: value } };
  }, {});
}

export function runCLICommand(command) {
  try {
    console.log(command);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(error);
  }
}
