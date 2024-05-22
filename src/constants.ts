import { colors } from "consola/utils";
import { ComponentTypeOpts, Config, FileType, SelectedFilesOpts } from "./types.js";

export const defaultConfig: Config = {
  componentName: "",
  componentType: "server",
  selectedFiles: [],
};

export const componentTypeOpts = [
  {
    label: "Server Component",
    value: "server",
  },
  {
    label: "Client Component",
    value: "client",
  },
] as const satisfies ComponentTypeOpts;

export const getFileOpts = (name: string): SelectedFilesOpts => [
  {
    label: `${name}.test.tsx`,
    value: "test",
  },

  {
    label: `${name}.module.scss`,
    value: "scss",
  },
  {
    label: `${name}.types.ts`,
    value: "types",
  },
  {
    label: `${name}.constants.ts`,
    value: "constants",
  },
  {
    label: `${name}.utils.ts`,
    value: "utils",
  },
  {
    label: `${name}.hooks.ts`,
    value: "hooks",
  },
];

export const logo = colors.bgMagenta(
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
);

export const recommendedFiles: FileType[] = ["types", "test", "scss"];
