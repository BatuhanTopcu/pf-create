#!/bin/env node

import consola from "consola";
import { colors } from "consola/utils";
import * as fs from "fs/promises";
import { ComponentTypeOpts, Config, SelectedFilesOpts } from "./types.js";
import { createFiles } from "./lib.js";

consola.log({
  message:
    "\n" +
    colors.bgMagenta(
      colors.white(
        `                                                                           
   ██████╗ ███████╗     ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗   
   ██╔══██╗██╔════╝    ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝   
   ██████╔╝█████╗█████╗██║     ██████╔╝█████╗  ███████║   ██║   █████╗     
   ██╔═══╝ ██╔══╝╚════╝██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝     
   ██║     ██║         ╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗   
   ╚═╝     ╚═╝          ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝   
`
      )
    ),
});

const config: Config = {
  componentName: "",
  componentType: "server",
  selectedFiles: [],
};

config.componentName = await consola.prompt(colors.bold("Enter component name:"), {
  type: "text",
  required: true,
});

config.componentType = (
  await consola.prompt(colors.bold("Select component type:"), {
    type: "select",
    options: [
      {
        label: "Server Component",
        value: "server",
      },
      {
        label: "Client Component",
        value: "client",
      },
    ] as const satisfies ComponentTypeOpts,
    required: true,
  })
).value;

config.selectedFiles = (
  await consola.prompt(colors.bold("Select additional file(s) to create:"), {
    type: "multiselect",
    options: [
      {
        label: `${config.componentName}.test.tsx`,
        value: "test",
      },

      {
        label: `${config.componentName}.module.scss`,
        value: "scss",
      },
      {
        label: `${config.componentName}.types.ts`,
        value: "types",
      },
      {
        label: `${config.componentName}.constants.ts`,
        value: "constants",
      },
      {
        label: `${config.componentName}.utils.ts`,
        value: "utils",
      },
      {
        label: `${config.componentName}.hooks.ts`,
        value: "hooks",
      },
    ] as const satisfies SelectedFilesOpts,
    initial: "test",
    required: true,
  })
).map((option) => option.value);

consola.start("Building component...");

await createFiles(config);

consola.success("Created component!");
