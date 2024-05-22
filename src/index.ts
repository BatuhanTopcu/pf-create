#!/bin/env node

import consola from "consola";
import { colors } from "consola/utils";
import { ComponentType, Config, FileType } from "./types.js";
import { Creator } from "./creator.js";
import {
  componentTypeOpts,
  defaultConfig,
  getFileOpts,
  logo,
  recommendedFiles,
} from "./constants.js";

consola.log({
  message: logo,
});

const config: Config = defaultConfig;

config.componentName = await consola.prompt(colors.bold("Enter component name:"), {
  type: "text",
  required: true,
});

config.componentType = (await consola.prompt(colors.bold("Select component type:"), {
  type: "select",
  options: componentTypeOpts,
  required: true,
})) as any as ComponentType;

const useRecommendedFiles = await consola.prompt(
  colors.bold("Use recommended files? " + colors.dim("(Module SCSS, Types and Test)")),
  {
    type: "confirm",
    initial: true,
  }
);

if (useRecommendedFiles) {
  config.selectedFiles = recommendedFiles;
} else {
  config.selectedFiles = (await consola.prompt(
    colors.bold("Select additional file(s) to create:"),
    {
      type: "multiselect",
      options: getFileOpts(config.componentName),
    }
  )) as any as Array<FileType>;
}

consola.start("Building component...");

const creator = new Creator(config);
await creator.createFiles();

consola.success("Created component!");
