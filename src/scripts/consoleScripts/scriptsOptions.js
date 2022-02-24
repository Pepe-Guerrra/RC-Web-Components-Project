import { Command } from 'commander/esm.mjs';
import { version } from "../../../package.json";
import { isValid } from "../webCommponentScripts/validationsName.js";

const verb = version
const program = new Command();

export async function scriptsOption(){
  program.version(verb).description('A command line to create vanilla webComponents');

  // Change text in color red
  function errorColor(str) {
    let resp = str.includes('missing required argument')
    /*
      Add ANSI escape codes
      30m Black
      31m Red
      32m Green
      33m Yellow
      34m Blue
      35m Magenta
      36m Cyan
      37m White
      90m Bright Black (Gray)	
      91m Bright Red
      92m Bright Green
      93m Bright Yellow
      94m Bright Blue
      95m Bright Magenta
      96m Bright Cyan
      97m Bright White
    */
    // Add ANSI escape codes to display text in red.
    if (resp) {
      return `\x1b[31m
        error: missing required argument 'componentName'
        written in camelcase format
        example:
                > webc c webComponent
                      or
                > webc component webComponent
      \x1b[0m`;
    }else{
      return `\t\x1b[31m${str}\x1b[0m`;
    }
  }

  program
  .command('c <componentName>')
  .description('Command to create the web component')
  .action((componentName)=>{
    isValid(componentName);
  })

  program
  .command('component <componentName>')
  .description('Command to create the web component')
  .action((componentName)=>{
    isValid(componentName);
  })

  program
  .configureOutput({
    // Visibly override write routines
    writeOut: (str) => process.stdout.write(`${str}`),
    writeErr: (str) => process.stdout.write(`${str}`),
    // Output errors in red.
    outputError: (str, write)=>{
      write(errorColor(str))
    }
  });

  program.parse(process.argv);
}