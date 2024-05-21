#!/bin/env node

import consola from "consola";
import { colors } from "consola/utils";
import * as fs from "fs/promises";

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

const componentName = await consola.prompt(colors.bold("Enter component name:"), {
  type: "text",
  required: true,
});

// await consola.prompt(colors.bold("Select file(s) to create:"), {
//   type: "multiselect",
//   options: [],
//   required: true,
// });

consola.start("Building component...");

const directory = process.cwd();

await fs.mkdir(`${directory}/${componentName}`);

await fs.appendFile(`${directory}/${componentName}/index.ts`, "");
await fs.appendFile(`${directory}/${componentName}/${componentName}.tsx`, "");
await fs.appendFile(`${directory}/${componentName}/${componentName}.module.scss`, "");
await fs.appendFile(`${directory}/${componentName}/${componentName}.types.ts`, "");
await fs.appendFile(`${directory}/${componentName}/${componentName}.constants.ts`, "");

consola.success("Created component!");
