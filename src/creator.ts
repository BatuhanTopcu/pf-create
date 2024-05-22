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
  path: string;

  constructor(config: Config) {
    this.config = config;
    this.path = this.getPath();
  }

  private getPath = () => {
    const directory = process.cwd();
    return `${directory}/${this.config.componentName}`;
  };

  private check(file: FileType) {
    return this.config.selectedFiles.includes(file);
  }

  async createFolder() {
    await fs.mkdir(this.path);
  }

  async createComponentFile() {
    let content = this.config.componentType === "server" ? "" : `"use client";\n\n`;

    // imports
    if (this.check("types")) {
      content += `import { ${this.config.componentName}Props } from "./${this.config.componentName}.types";\n`;
    }
    if (this.check("scss")) {
      content += `import styles from "./${this.config.componentName}.module.scss";\n`;
    }

    content += "\n";

    // component
    const componentProps = this.config.selectedFiles.includes("types")
      ? `{}: ${this.config.componentName}Props`
      : "";

    content += `export const ${this.config.componentName} = ${this.config.componentType === "server" ? "async " : " "}(${componentProps}) => {\n`;
    content += `  return <div${this.check("scss") ? ` className={styles.${utils.lowerCaseFirst(this.config.componentName)}}` : ""}>${this.config.componentName}</div>;\n`;
    content += `};\n`;

    content += await fs.appendFile(`${this.path}/${this.config.componentName}.tsx`, content);
  }

  async createIndexFile() {
    const content = `export * from "./${this.config.componentName}";`;

    await fs.appendFile(`${this.path}/index.ts`, content);
  }

  @checkConfig("test")
  async createTestFile() {
    await fs.appendFile(`${this.path}/${this.config.componentName}.test.tsx`, "");
  }

  @checkConfig("scss")
  async createStylesFile() {
    const content = `.${utils.lowerCaseFirst(this.config.componentName)} {\n\n}\n`;
    await fs.appendFile(`${this.path}/${this.config.componentName}.module.scss`, content);
  }

  @checkConfig("types")
  async createTypesFile() {
    const content = `export type ${this.config.componentName}Props = {\n\n};\n`;

    await fs.appendFile(`${this.path}/${this.config.componentName}.types.ts`, content);
  }

  @checkConfig("constants")
  async createConstantsFile() {
    await fs.appendFile(`${this.path}/${this.config.componentName}.constants.ts`, "");
  }

  @checkConfig("utils")
  async createUtilsFile() {
    await fs.appendFile(`${this.path}/${this.config.componentName}.utils.ts`, "");
  }

  @checkConfig("hooks")
  async createHooksFile() {
    await fs.appendFile(`${this.path}/${this.config.componentName}.hooks.ts`, "");
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
