import arg from 'arg';
import { version } from "../../../package.json";
import { validationsProject } from "../projectScripts/validationsProject.js"

//const ver = version

//joint o join para que el CSS y el JS esten juntos

export async function scriptsQuestions(rawArgs){

  const options = createOptions(rawArgs);
  const questions = {
    'new': ()=>{  validationsProject(options); },
    'n': ()=>{  validationsProject(options); },
    'component': ()=>{ newComponent() },
    'c': ()=>{ newComponent() },
  };
  const answers = questions[options.commandName]();

  function createOptions(rawArgs){
    const args = arg(
      {
        '--git': Boolean,
        '--yes': Boolean,
        '--install': Boolean,
        '-g': '--git',
        '-y': '--yes',
        '-i': '--install',
      },
      { argv: rawArgs.slice(2)  }
    );
    return {
      skipPrompts: args['--yes'] || false,
      git: args['--git'] || false,
      commandName: args._[0],
      name: args._[1],
      runInstall: args['--install'] || false,
    };
  }

  function newComponent() {
    console.log('este es un nuevo Componente');
  } 

};