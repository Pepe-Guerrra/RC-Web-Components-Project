import inquirer from "inquirer";
import { exec } from "child_process";
import { createStructureProject } from "../projectScripts/createStructure.js";
import logUpdate from 'log-update';


export async function validationsProject(options) {
  const path0 = process.cwd();
  options = await promptForMissingOptions(options);
  createStructureProject(options)
  .then(()=>{
    if (options.git) {
      gitInit(options.name,path0);
    }
  })
  .then(()=>{
    console.log('las carpetas fueron creadas con Exito');
    if (options.runInstall) {
      runInstall(options.name,path0);
    }
  });
  
}

async function gitInit(projectName,path0){
  exec(`cd ${path0}\\${projectName} && git init`,(error,stdout,stderr)=>{
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

async function runInstall(projectName,path0){

  const interval = 80;
	const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0 ;

  const spiner = setInterval(()=>{
    const frame = frames[ i++ % frames.length ];
    logUpdate(frame + ' ==> Install dependencies')
  },interval);

  exec(`cd ${path0}\\${projectName} && npm install`,(error,stdout,stderr)=>{
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
  if (!options.runInstall) {
    questions.push({
      type: 'confirm',
      name: 'runInstall',
      message: 'Do you want the dependencies to be installed?',
      default: false,
    });
  };
  
  // espera la respuesta y los agrega a las opciones
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    git: options.git || answers.git,
    runInstall: options.runInstall || answers.runInstall,
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