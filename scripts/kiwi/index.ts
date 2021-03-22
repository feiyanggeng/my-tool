#!/usr/bin/env node

import * as path from "path";
import * as yargs from "yargs";
import * as inquirer from 'inquirer';
import { initProject } from './init';
import { sync } from './sync';
import { exportMessages } from './export';
import { importMessages } from './import';
import { findUnUsed } from './unused';
import { mockLangs } from './mock';
import { extractAll } from './extract/extract';
import * as ora from 'ora';
import { singleArgvData } from "./utils";

/**
 * 进度条加载
 * @param text
 * @param callback
 */
function spining(text, callback) {
  const spinner = ora(`${text}中...`).start();
  if (callback) {
    callback();
  }
  spinner.succeed(`${text}成功`);
}

const argv = yargs.options({
  init: {
    type: "string",
    default: "",
  },
  import: {
    type: "string",
    default: "",
  },
  export: {
    type: "string",
    default: "",
  },
  language: {
    type: "string",
    default: "",
  },
  sync: {},
  mock: {},
  unused: {},
  extract: {
    type: "string",
    default: ""
  },
}).argv;

console.log(argv);

if (argv.init) {
  (async () => {
    const result = await inquirer.prompt({
      type: 'confirm',
      name: 'confirm',
      default: true,
      message: '项目中是否已存在kiwi相关目录？'
    });

    if (!result.confirm) {
      spining('初始化项目', async () => {
        initProject(argv.init);
      });
    } else {
      const value = await inquirer.prompt({
        type: 'input',
        name: 'dir',
        message: '请输入相关目录：'
      });
      spining('初始化项目', async () => {
        initProject(argv.init, value.dir);
      });
    }
  })();
}

if (argv.import) {
  spining("导入翻译文案", () => {
    if (!argv.import || !argv.language) {
      console.log("请按格式输入：--import [file] --language [lang]");
    } else {
      importMessages(argv.import, argv.language);
    }
  });
}

if (argv.export) {
  spining("导出未翻译的文案", () => {
    if (!argv.export && !argv.language) {
      exportMessages();
    } else {
      exportMessages(argv.export, argv.language);
    }
  });
}

if (argv.sync) {
  spining('文案同步', () => {
    sync();
  });
}

if (argv.unused) {
  spining('导出未使用的文案', () => {
    findUnUsed();
  });
}

// if (commander.mock) {
//   const spinner = ora('使用 Google 翻译中...').start();
//   sync(async () => {
//     if (commander.mock === true && commander.args.length === 0) {
//       await mockLangs();
//     } else {
//       await mockLangs(commander.mock, commander.args[0]);
//     }
  
//     spinner.succeed('使用 Google 翻译成功');
//   });
// }

if (argv.extract) {
  singleArgvData.setProductDir(argv.extract);
  (async () => {
    const value = await inquirer.prompt({
      type: "input",
      name: "dir",
      message: "请输入需要翻译的目录：",
    });    
    if (!value.dir) {
      extractAll();
    } else {
      const fullPath = path.join(argv.extract, value.dir)
      extractAll(fullPath, "AIzaSyBh_WgFVOydUL01i62smDJ_4cyO0OixlEY");
    }
   })();
}
