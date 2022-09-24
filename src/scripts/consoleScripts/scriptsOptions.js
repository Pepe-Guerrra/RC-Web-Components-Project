import arg from 'arg';
import { validationsProject } from "../projectScripts/validationsProject.js"
import { validationsComponent } from "../webCommponentScripts/validationsComponent.js";
import { helpInfo } from "./scriptHelpInfo.js";
import { version } from "../../../package.json";
import { color, logSymbols } from "../supportFeature/spin.js";

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
      console.log(color.green(`Version: ${ver}`));
      return;
    }
    console.log(`${color.yellow('The command')} ${color.red(rawArgs[2])} ${color.yellow('is not recognized')}`);
  } catch (err) {
    console.log(color.red(`${err.message}`));
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
  const { help, version, git, skipPrompts, commandName,...updateOpt } = options;
  return updateOpt;
} 