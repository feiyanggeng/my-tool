/**
 * GenFileConfig
 * generator folder path and fileName;
 *
 */
const fs = require('fs');
const chalk = require("chalk");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());

module.exports = name => {
  if (!/^\w/.test(name)) {
    console.warn(chalk.green("module name must start with letter"));
    process.exit(1);
  }
  let app = "",
    targetDir = "",
    absoluteTargetDir = "",
    targetModule = name;
  if (/^(admin\/)|(portal\/)|(idp\/)/.test(name)) {
    if (name.indexOf(app + "/modules") < 0 || !/\/(\w+)$/.test(name)) {
      console.warn(
        chalk.green(
          'if you want to generate file system in idaas-web project, please enter target directory path like "admin/modules/test" \n'
        )
      );
      process.exit(1);
    }
    app = name.match(/^(admin|portal|idp)/)[1];
    targetModule = name.match(/\/(\w+)$/)[1];
    targetDir = name.match(/^\w+\/(.+)\/\w+$/)[1];
    absoluteTargetDir = path.join(appDirectory,"packages/operations", "src", app, targetDir || "");
  }
  const ModuleName = targetModule.replace(
    /^\w/,
    targetModule.charAt(0).toUpperCase()
  );
  return {
    fileName: {
      base: app === 'admin' ? 'base' : app + "Base",
      actionTypes: ModuleName + "ActionsTypes",
      status: ModuleName + "Status",
      desc: ModuleName + "Description",
      types: ModuleName + "Types",
      actions: ModuleName + "Actions",
      store: ModuleName + "Store",
      reducer: ModuleName + "Reducer",
      container: ModuleName + "Container",
      rootView: ModuleName + "RootView",
      style: ModuleName
    },
    variableName: {
      state: targetModule + "State",
      style: ModuleName + "Less"
    },
    folderPath: {
      module: `./tempDist/${targetModule}`,
      constants: `./tempDist/${targetModule}/constants`,
      view: `./tempDist/${targetModule}/view`,
      style: `./tempDist/${targetModule}/style`
    },
    projectPath: {
      app: app,
      targetDir: targetDir,
      targetModule: targetModule,
      absoluteTargetDir: absoluteTargetDir
    }
  };
};
