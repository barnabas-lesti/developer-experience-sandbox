import fs from "fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";

const GIT_IGNORE_FILE_NAME = ".gitignore";
const OTHER_IGNORE_FILE_NAMES = [".eslintignore", ".prettierignore", ".stylelintignore"];

try {
  const gitIgnoreFileContent = fs.readFileSync(getIgnoreFilePath(GIT_IGNORE_FILE_NAME), "utf8");

  OTHER_IGNORE_FILE_NAMES.forEach((otherIgnoreFileName) => {
    fs.writeFileSync(getIgnoreFilePath(otherIgnoreFileName), gitIgnoreFileContent);
  });

  console.log(`Successfully synced "${GIT_IGNORE_FILE_NAME}" with ${convertOtherIgnoreFileNamesToString()}.`);
} catch (error) {
  console.error(error);
}

function getIgnoreFilePath(ignoreFileName) {
  const executionPath = dirname(fileURLToPath(import.meta.url));
  const projectRootPath = path.join(executionPath, "..");
  return path.join(projectRootPath, ignoreFileName);
}

function convertOtherIgnoreFileNamesToString() {
  return OTHER_IGNORE_FILE_NAMES.map((ignoreFileName) => `"${ignoreFileName}"`).join(", ");
}
