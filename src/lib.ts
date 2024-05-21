import * as fs from "fs/promises";

import { Config, CreaterFunction } from "./types.js";

const getPath = (config: Config) => {
  const directory = process.cwd();
  return `${directory}/${config.componentName}`;
};

const createBase: CreaterFunction = async (config) => {
  const path = getPath(config);
  await fs.mkdir(path);

  await fs.appendFile(`${path}/index.ts`, "");
  await fs.appendFile(`${path}/${config.componentName}.tsx`, "");
};

const createComponent: CreaterFunction = async (config) => {};

const createTestFile: CreaterFunction = async (config) => {};

const createStylesFile: CreaterFunction = async (config) => {};

const createTypesFile: CreaterFunction = async (config) => {};

const createConstantsFile: CreaterFunction = async (config) => {};

const createUtilsFile: CreaterFunction = async (config) => {};

const createHooksFile: CreaterFunction = async (config) => {};

export const createFiles: CreaterFunction = async (config) => {
  await createBase(config);

  await createComponent(config);
  await createTestFile(config);
  await createStylesFile(config);
  await createTypesFile(config);
  await createConstantsFile(config);
  await createUtilsFile(config);
  await createHooksFile(config);
};
