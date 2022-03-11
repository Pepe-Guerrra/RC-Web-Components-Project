import inquirer from 'inquirer';
import { exec } from "child_process";
import { createStructureProject } from "../projectScripts/createStructure.js";

/*
  --skipPrompts
  --git: false,
  --runInstall: false,
  name: undefined,
  ------------------------------
  packageName: 'project Name',
  version: '1.0.0',
  description: 'description', 
  entryPoint: 'index.js',     
  testCommand: '',
  gitRepository: '',
  keywords: '',
  author: '',
  license: 'ISC'
*/

export async function validationsProject(options) {
  options = await promptForMissingOptions(options);
  if (options.git) {
    gitInit();
  }
  createStructureProject(options);
}

async function gitInit(){
  exec('git init',(error,stdout,stderr)=>{
    if (error) {
        console.log(error);
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Status:\n${stdout}`);
  })
};

async function promptForMissingOptions(options) {
  const now = Date.now(); //Devuelve el valor en milisegundos que representa el tiempo transcurrido desde el Epoch.
  const projectNameQuestion = [];// pregunta el nombre del proyecto en caso de no estar
  const questions = [];

  if (!options.name) {
    projectNameQuestion.push({
      type: 'input',
      name: 'projectName',
      message: "What's your project name",
      default:'myproject'+now,
    });
  }
  // espera la respuesta
  const projectNameAnswer = await inquirer.prompt(projectNameQuestion);
  options.name = projectNameAnswer.projectName;
  options.packageName = projectNameAnswer.projectName;

  // bandera --yes para no hacer mas preguntas
  if (options.skipPrompts) {
    return options;
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
    default: options.packageName,
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
    packageName: options.packageName || answers.packageName,
    version: options.version || answers.version,
    description: options.description || answers.description, 
    entryPoint: options.entryPoint || answers.entryPoint,     
    testCommand: options.testCommand || answers.testCommand,
    gitRepository: options.gitRepository || answers.gitRepository,
    keywords: options.keywords || answers.keywords,
    author: options.author || answers.author,
    license: options.license || answers.license,
  };
}
