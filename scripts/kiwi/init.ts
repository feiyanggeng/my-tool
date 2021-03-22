/**
 * @author linhuiw
 * @desc 初始化 kiwi 项目的文件以及配置
 */

import * as _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { lookForFiles } from './utils';
import { PROJECT_CONFIG, KIWI_CONFIG_FILE } from './const';

function creteConfigFile(existDir?: string, productDir?: string) {
  if (
    !lookForFiles(path.resolve(process.cwd(), productDir), KIWI_CONFIG_FILE)
  ) {
    const existConfigFile = _.endsWith(existDir, "/")
      ? `${existDir}${KIWI_CONFIG_FILE}`
      : `${existDir}/${KIWI_CONFIG_FILE}`;
    if (
      existDir &&
      fs.existsSync(existDir) &&
      !fs.existsSync(existConfigFile)
    ) {
      const config = JSON.stringify(
        {
          ...PROJECT_CONFIG.defaultConfig,
          kiwiDir: existDir.replace(productDir, "."),
          configFile: existConfigFile.replace(productDir, "."),
        },
        null,
        2
      );
      fs.writeFile(existConfigFile, config, (err) => {
        if (err) {
          console.log(err);
        }
      });
    } else if (!fs.existsSync(PROJECT_CONFIG.configFile)) {
      const config = JSON.stringify(PROJECT_CONFIG.defaultConfig, null, 2);
      fs.writeFile(PROJECT_CONFIG.configFile, config, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}

function createCnFile(productDir: string) {
  const cnDir = `${productDir}/zh-CN`;
  if (!fs.existsSync(cnDir)) {
    fs.mkdirSync(cnDir);
    fs.writeFile(`${cnDir}/index.ts`, PROJECT_CONFIG.zhIndexFile, (err) => {
      if (err) {
        console.log(err);
      }
    });
    fs.writeFile(`${cnDir}/common.ts`, PROJECT_CONFIG.zhTestFile, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

function initProject(productDir?: string, existDir?: string) {
  /** 初始化配置文件夹 */
  const productKiwiDir = path.join(productDir, PROJECT_CONFIG.dir);
  if (existDir) {
    if (!fs.existsSync(existDir)) {
      console.log('输入的目录不存在，已为你生成默认文件夹');
      fs.mkdirSync(productKiwiDir);
    }
  } else if (!fs.existsSync(productKiwiDir)) {
    fs.mkdirSync(productKiwiDir);
  }
  creteConfigFile(productKiwiDir, productDir);
  if (!(existDir && fs.existsSync(existDir))) {
    createCnFile(path.join(productKiwiDir, existDir || ''));
  }
}

export { initProject };
