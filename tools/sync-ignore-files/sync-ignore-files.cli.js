import fs from "fs";

import { getFileContent, getRelativeFilePath } from "../utility/utility.functions.js";

const GIT_IGNORE_FILE_NAME = ".gitignore";
const OTHER_IGNORE_FILE_NAMES = [".eslintignore", ".prettierignore", ".stylelintignore"];

try {
  const gitIgnoreFileContent = getFileContent(GIT_IGNORE_FILE_NAME);

  OTHER_IGNORE_FILE_NAMES.forEach((otherIgnoreFileName) => {
    fs.writeFileSync(getRelativeFilePath(otherIgnoreFileName), gitIgnoreFileContent);
  });

  console.log(`Successfully synced "${GIT_IGNORE_FILE_NAME}" with ${convertOtherIgnoreFileNamesToString()}.`);
} catch (error) {
  console.error(error);
}

function convertOtherIgnoreFileNamesToString() {
  return OTHER_IGNORE_FILE_NAMES.map((ignoreFileName) => `"${ignoreFileName}"`).join(", ");
}
