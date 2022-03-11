import arg from 'arg';
import { version } from "../../../package.json";
import { validationsProject } from "../projectScripts/validationsProject.js"
import { helpInfo } from "./scriptHelpInfo.js";

const ver = version

export async function scriptsQuestions(rawArgs){

  const options = createOptions(rawArgs);
  if (options.commandName == 'n' || options.commandName == 'new') {
    const newProject = projecOption(options);
    validationsProject(newProject);
    return;
  }
  if (options.commandName == 'c' || options.commandName == 'component') {
    const newComponent = componentOptions(options);
    return;
  }
  if (options.help) {
    helpInfo();
    return;
  }
  if (options.version) {
    console.log(`\x1b[32m Version:${ver} \x1b[0m`);
    return;
  }

  console.log(`\x1b[32m No se reconoce el comando \x1b[31m"${options.commandName}"\x1b[0m \x1b[0m`);

}

function createOptions(rawArgs){
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--joint': Boolean,
      '--help': Boolean,
      '--version':Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      '-j': '--joint',
      '-h': '--help',
      '-v': '--version'
    },
    { argv: rawArgs.slice(2)  }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    joint: args['--joint'] || false,
    help: args['--help'] || false,
    version: args['--version'] || false,
    runInstall: args['--install'] || false,
    commandName: args._[0],
    name: args._[1],
  };
}

function projecOption(options){
  const { help, version, joint, commandName,...updateOpt } = options;
  return Object.assign(updateOpt, {
    'packageName':"",
    'version': "0.0.0",
    'description': "description",
    'entryPoint': "index.js",
    'testCommand': "",
    'gitRepository': "",
    'keywords': "",
    'author': "",
    'license': ("ISC"),
  });
}

function componentOptions(options) {
  const { help, version, git, skipPrompts, runInstall, commandName,...updateOpt } = options;
  console.log(updateOpt);
  console.log('este es un nuevo Componente');
} 