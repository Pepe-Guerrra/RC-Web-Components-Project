import arg from 'arg';
import { validationsProject } from "../projectScripts/validationsProject.js"
import { validationsComponent } from "../webCommponentScripts/validationsComponent.js";
import { helpInfo } from "./scriptHelpInfo.js";
import { version } from "../../../package.json";

const ver = version

export async function scriptsOptions(rawArgs){
  try {
    const options = generalOptions(rawArgs);
    if (options.commandName == 'n' || options.commandName == 'new') {
      const newProject = projecOption(options);
      validationsProject(newProject);
      return;
    }
    if (options.commandName == 'c' || options.commandName == 'component') {
      const newComponent = componentOptions(options);
      validationsComponent(newComponent);
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
    console.log(`\x1b[32m No se reconoce el comando \x1b[31m"${rawArgs[2]}"\x1b[0m`);
  } catch (err) {
    console.log(`\x1b[31m${err.message}\x1b[0m`);
  }
}

function generalOptions(rawArgs){
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
    'version': "1.0.0",
    'description': "description",
    'entryPoint': "index.js",
    'testCommand': '"echo \\"Error: no test specified\\" && exit 1"',
    'gitRepository': "https://github.com/User-Name/repositoryName.git",
    'keywords': "",
    'author': "",
    'license': ("ISC"),
  });
}

function componentOptions(options) {
  const { help, version, git, skipPrompts, runInstall, commandName,...updateOpt } = options;
  return updateOpt;
} 