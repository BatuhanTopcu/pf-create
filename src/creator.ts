import * as fs from "fs/promises";

import { Config, FileType, WithConfig } from "./types.js";
import * as utils from "./utils.js";

function checkConfig(file: FileType) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: WithConfig, ...args: any[]) {
      if (!this.config.selectedFiles.includes(file)) return;

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export class Creator implements WithConfig {
  config: Config;
  private path: string;
  private name: string;
  private isClient: boolean;

  constructor(config: Config) {
    this.config = config;
    this.path = this.getPath();
    this.isClient = this.config.componentType === "client";
    this.name = this.config.componentName;
  }

  private getPath = () => {
    const directory = process.cwd();
    return `${directory}/${this.name}`;
  };

  private check(file: FileType) {
    return this.config.selectedFiles.includes(file);
  }

  async createFolder() {
    await fs.mkdir(this.path);
  }

  async createComponentFile() {
    let content = this.isClient ? `"use client";\n\n` : "";

    // imports
    if (this.check("types")) {
      content += `import { ${this.name}Props } from "./${this.name}.types";\n`;
    }
    if (this.check("scss")) {
      content += `import styles from "./${this.name}.module.scss";\n`;
    }

    content += "\n";

    // component
    const componentProps = this.config.selectedFiles.includes("types")
      ? `{}: ${this.name}Props`
      : "";

    content += `export const ${this.name} = ${this.isClient ? " " : "async "}(${componentProps}) => {\n`;
    content += `  return <div${this.check("scss") ? ` className={styles.${utils.lowerCaseFirst(this.name)}}` : ""}>${this.name}</div>;\n`;
    content += `};\n`;

    content += await fs.appendFile(`${this.path}/${this.name}.tsx`, content);
  }

  async createIndexFile() {
    const content = `export * from "./${this.name}";`;

    await fs.appendFile(`${this.path}/index.ts`, content);
  }

  @checkConfig("test")
  async createTestFile() {
    await fs.appendFile(`${this.path}/${this.name}.test.tsx`, "");
  }

  @checkConfig("scss")
  async createStylesFile() {
    const content = `.${utils.lowerCaseFirst(this.name)} {\n\n}\n`;
    await fs.appendFile(`${this.path}/${this.name}.module.scss`, content);
  }

  @checkConfig("types")
  async createTypesFile() {
    const content = `export type ${this.name}Props = {\n\n};\n`;

    await fs.appendFile(`${this.path}/${this.name}.types.ts`, content);
  }

  @checkConfig("constants")
  async createConstantsFile() {
    await fs.appendFile(`${this.path}/${this.name}.constants.ts`, "");
  }

  @checkConfig("utils")
  async createUtilsFile() {
    await fs.appendFile(`${this.path}/${this.name}.utils.ts`, "");
  }

  @checkConfig("hooks")
  async createHooksFile() {
    await fs.appendFile(`${this.path}/${this.name}.hooks.ts`, "");
  }

  async createFiles() {
    await this.createFolder();
    await this.createIndexFile();
    await this.createComponentFile();
    await this.createTestFile();
    await this.createStylesFile();
    await this.createTypesFile();
    await this.createConstantsFile();
    await this.createUtilsFile();
    await this.createHooksFile();
  }
}
