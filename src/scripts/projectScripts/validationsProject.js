import inquirer from 'inquirer';
import { exec } from "child_process";
import { createStructureProject } from "../projectScripts/createStructure.js";

export async function validationsProject(options) {

  const now = Date.now(); //Devuelve el valor en milisegundos que representa el tiempo transcurrido desde el Epoch.

  async function promptForMissingOptions(options) {

    // pregunta el nombre del proyecto en caso de no estar
    const projectNameQuestion = [];
    if (!options.name) {
      projectNameQuestion.push({
        type: 'input',
        name: 'projectName',
        message: "What's your project name",
        default:'myProject'+now,
      });
    }

    // espera la respuesta
    const projectNameAnswer = await inquirer.prompt(projectNameQuestion);
    // bandera --yes para no hacer mas preguntas
    if (options.skipPrompts) {
      return {
        ...options,
        name: options.name || projectNameAnswer.projectName,
      };
    }

    //Preguntas al usuario sobre la perzonalisacion del Proyecto
    const questions = [];
    if (!options.git) {
      questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: false,
      });
    }

    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      name: options.name || projectNameAnswer.projectName,
      git: options.git || answers.git,
    };

  }

  options = await promptForMissingOptions(options);
  if (options.git) {
    gitInit();
  }

  createStructureProject(options);
  
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

  console.log(options);
}