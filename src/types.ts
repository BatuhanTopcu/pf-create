export type ComponentType = "server" | "client";

export type FileType = "test" | "scss" | "types" | "constants" | "utils" | "hooks";

export type Config = {
  componentName: string;
  componentType: ComponentType;
  selectedFiles: Array<FileType>;
};

export type ComponentTypeOpts = Array<{
  label: string;
  value: ComponentType;
}>;

export type SelectedFilesOpts = Array<{
  label: string;
  value: FileType;
}>;

export interface WithConfig {
  config: Config;
}
