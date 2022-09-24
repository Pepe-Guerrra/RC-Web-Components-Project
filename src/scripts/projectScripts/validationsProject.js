import inquirer from "inquirer";
import fs from "fs";
import { exec } from "child_process";
import { createStructureProject } from "../projectScripts/createStructure.js";
import { spin, color, logSymbols } from "../supportFeature/spin.js";

export async function validationsProject(options) {

  const so = process.platform
  const path0 = process.cwd();

  options = await promptForMissingOptions(options);
  if (fs.existsSync(`./${options.name}`)) {
    console.log(`${color.yellow('The ')}${color.red(options.name)}${color.yellow(' project already exists')}`);
    return;
  }
  console.log(so);
  createStructureProject(options)
  .then(()=>{
    if (options.git) {
      gitInit(options.name,path0);
    }
  })
  .then(()=>{
      runInstall(options.name,path0);
  });
  
}

async function gitInit(projectName,path0){
  exec(`cd ${path0}\\${projectName} && git init`,(error,stdout,stderr)=>{
    if (error) {
      process.stdout.clearLine(0);
      process.stdout.write(`${logSymbols.error} - ${color.red(error)}\n`)
    }
    if (stderr) {
      process.stdout.clearLine(0);
      process.stdout.write(`${logSymbols.error} - ${color.red(stderr)}\n`)
      return;
    }
    process.stdout.write(color.green(`${logSymbols.success} - ${color.green(stdout)}`));
  })
};

async function runInstall(projectName,path0){
  spin().start('installing dependencies, please wait...');
  exec(`cd ${path0}\\${projectName} && npm install vite@latest`,(error,stdout,stderr)=>{
    if (error) {
      process.stdout.clearLine(0);
      process.stdout.write(` npm error ${logSymbols.error} - ${color.red(error)}\n`)
    }
    if (stderr) {
      process.stdout.clearLine(0);
      process.stdout.write(`${logSymbols.error} - ${color.red(stderr)}\n`)
      return;
    }
    spin().end(color.green('Dependencies were installed successfully'))
    process.stdout.write(color.blue(`Status:\n${stdout}`));
    process.stdout.write(color.yellow(`
      Done. Now run:

      cd ${projectName}
      npm run dev
    `))
  })

};

// create the necessary questions to build the project
async function promptForMissingOptions(options) {
  const now = Date.now(); //Returns the number of milliseconds since 00:00:00 UTC on January 1, 1970.
  const projectNameQuestion = [];// ask the name of the project in case it is not
  const questions = [];

  if (!options.name) {
    projectNameQuestion.push({
      type: 'input',
      name: 'projectName',
      message: "What's your project name",
      default:'myproject'+now,
    });
  }

  const projectNameAnswer = await inquirer.prompt(projectNameQuestion);
  // bandera --yes para no hacer mas preguntas
  if (options.skipPrompts) {
    return {
      ...options,
      name: options.name || projectNameAnswer.projectName,
      packageName: options.name || projectNameAnswer.projectName,
    };
  }


  //Preguntas al usuario sobre la perzonalisacion del Proyecto
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  };
  questions.push({
    name: 'packageName',
    message: 'Enter your Package Name',
    default: options.name || projectNameAnswer.projectName,
  },{
    name: 'version',
    message: 'Enter the version of your package',
    default: '1.0.0',
  },{
    name: 'description',
    message: 'Enter the Description',
    default: 'Without description',
  },{
    name: 'entryPoint',
    message: 'Enter the entryPoint',
    default: 'index.js',
  },{
    name: 'testCommand',
    message: 'Enter your Tests Commands',
    default:'"echo \\"Error: no test specified\\" && exit 1"',
  },{
    name: 'gitRepository',
    message: 'Enter your Git Repository',
    default: 'https://github.com/User-Name/repositoryName.git'
  },{
    name: 'keywords',
    message: 'Keywords ?',
    default:'NOKeywords',    
  },{
    name: 'author',
    message: 'Author ?', 
  },{
    name: 'license',
    message: 'License ?',
    default: 'ISC',   
  });
  
  // espera la respuesta y los agrega a las opciones
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    git: options.git || answers.git,
    name: options.name || projectNameAnswer.projectName,
    packageName: options.name || projectNameAnswer.projectName,
    version: options.version || answers.version,
    description: options.description || answers.description, 
    entryPoint: options.entryPoint || answers.entryPoint,     
    testCommand: options.testCommand || answers.testCommand,
    gitRepository: options.gitRepository || answers.gitRepository,
    keywords: options.keywords || answers.keywords,
    author: options.author || answers.author,
    license: options.license || answers.license,
  };
};