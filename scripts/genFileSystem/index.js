const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const readline = require("readline");
const genFileConfig = require("./GenFileConfig");

const processArgv = process.argv.slice(2);

if (!processArgv || processArgv.length < 1) {
  console.log(chalk.yellow("  😭  Must pass at least one argument! \n"));
  process.exit(1);
}

const moduleName = processArgv[0];

const { fileName, folderPath, projectPath, variableName } = genFileConfig(
  moduleName
);

const handleError = err => {
  if (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
};

try {
  fs.mkdirSync(folderPath.module);
  fs.mkdirSync(folderPath.constants);
  fs.mkdirSync(folderPath.view);
  fs.mkdirSync(folderPath.style);
} catch (e) {
  console.error(chalk.red(e));
  process.exit(1);
}

const replaceStr = sourceText => {
  const regs = [
    {
      reg: /\$base\$/g,
      str: fileName.base
    },
    {
      reg: /\$actions\$/g,
      str: fileName.actions
    },
    {
      reg: /\$store\$/g,
      str: fileName.store
    },
    {
      reg: /\$reducer\$/g,
      str: fileName.reducer
    },
    {
      reg: /\$rootView\$/g,
      str: fileName.rootView
    },
    {
      reg: /\$container\$/g,
      str: fileName.container
    },
    {
      reg: /\$actionTypes\$/g,
      str: fileName.actionTypes
    },
    {
      reg: /\$types\$/g,
      str: fileName.types
    },
    {
      reg: /\$status\$/g,
      str: fileName.status
    },
    {
      reg: /\$stateName\$/g,
      str: variableName.state
    },
    {
      reg: /\$style\$/g,
      str: `${fileName.style}.less`
    },
    {
      reg: /\$styleLess\$/g,
      str: variableName.style
    }
  ];

  for (let i = 0; i < regs.length; i++) {
    let regStr = regs[i];
    sourceText = sourceText.replace(regStr.reg, regStr.str);
  }

  return sourceText;
};

const writeFile = (templatePath, folderPath, file) => {
  if (!templatePath || !folderPath || !file) {
    return handleError(
      "  😭  Need templatePath, folderPath, file arguments to write file"
    );
  }
  let data = fs.readFileSync(`scripts/genFileSystem/${templatePath}`, "utf8");
  let str = replaceStr(data);
  fs.writeFileSync(`${folderPath}/${file}`, str);
};

writeFile(
  "./template/actionTypes.text",
  folderPath.constants,
  `${fileName.actionTypes}.ts`
);
writeFile(
  "./template/status.text",
  folderPath.constants,
  `${fileName.status}.ts`
);
writeFile(
  "./template/types.text",
  folderPath.constants,
  `${fileName.types}.ts`
);
writeFile(
  "./template/actions.text",
  folderPath.module,
  `${fileName.actions}.ts`
);
writeFile(
  "./template/reducer.text",
  folderPath.module,
  `${fileName.reducer}.ts`
);
writeFile(
  "./template/container.text",
  folderPath.view,
  `${fileName.container}.tsx`
);
writeFile(
  "./template/rootView.text",
  folderPath.view,
  `${fileName.rootView}.tsx`
);
writeFile("./template/style.text", folderPath.style, `${fileName.style}.less`);

// TODO: 这里是异步的，应该作为同步执行，并且需要判断输入的参数是否为一个路径

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question(
  chalk.yellow(`copy file to idass-web directory? yes or no? \n \n`),
  answer => {
    if (answer === "yes" || answer === "y") {
      shell.cp("-R", folderPath.module, projectPath.absoluteTargetDir);
    }
    console.log(
      chalk.yellow(figlet.textSync("SUCCESS", { horizontalLayout: "full" }))
    );
    rl.close();
  }
);
