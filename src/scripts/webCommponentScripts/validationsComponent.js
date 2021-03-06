import { addFolder } from "./createStructure.js";
import inquirer from 'inquirer';
import { color } from "../supportFeature/spin.js";

export async function validationsComponent(options) {
  options = await promptForMissingOptions(options);
  let isValid = validComponentName(options.name);
  if (isValid) {
    addFolder(options)
  }
}

const errorMsg = color.red(`
  SYNTAX ERROR:

  the web component name must be in camelCase format
  example:
          =>  rc c componentName
                        or
          =>  rc component componentName
`);

async function promptForMissingOptions(options) {
  const question = [];

  if (!options.name) {
    question.push({
      type: 'input',
      name: 'componentName',
      message: "What's your component name",
      default:'myComponent',
    });
  };

  const answer = await inquirer.prompt(question);
  return {
    ...options,
    name: options.name || answer.componentName
  }
};

function validComponentName(name){
  let strgTest = /^([a-z]+)(([A-Z]([a-z]+))+)$/.test(name)
  if (!strgTest) {
    console.log(errorMsg);
    return false;
  };
  return true
};
