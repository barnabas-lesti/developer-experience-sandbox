import fs from "fs";

import { GIT_IGNORE_FILE_NAME } from "./sync-ignore-files.config.js";
import {
  convertStringArrayToLogString,
  getCLIArgumentsMap,
  getFileContent,
  getRelativeFilePath,
} from "../utility/index.js";

export function syncIgnoreFiles() {
  try {
    const gitIgnoreFileContent = getFileContent(GIT_IGNORE_FILE_NAME);
    const otherIgnoreFileNames = getOtherIgnoreFileNames();

    if (!otherIgnoreFileNames.length) {
      console.log("No other ignore files provided, exiting command.");
    }

    otherIgnoreFileNames.forEach((otherIgnoreFileName) => {
      fs.writeFileSync(getRelativeFilePath(otherIgnoreFileName), gitIgnoreFileContent);
    });

    console.log(
      `Successfully synced "${GIT_IGNORE_FILE_NAME}" with ${convertStringArrayToLogString(otherIgnoreFileNames)}.`,
    );
  } catch (error) {
    console.error(error);
  }
}

function getOtherIgnoreFileNames() {
  return Object.keys(getCLIArgumentsMap());
}
