import fs from "fs";
import { createUnjointedComponent } from "./writeUnjointedComponent.js";
import { createJointComponent } from "./writeJointComponent.js";
import { importStatement } from "./importStatement.js";
import { color, logSymbols } from "../supportFeature/spin.js";



// create the folder structure for the Web Component if it does NOT exist
export async function addFolder(options){
  const joint = options.joint
  const name = options.name
  joint
  ? jointComponent(name)
  : unjointedComponent(name)
}

function jointComponent(name) {
  console.log('jointComponent '+name);
  if (fs.existsSync(`./src/components/${name}.js`)) {
    console.log(`${logSymbols.error} - ${color.red('the web component already exists')}`);
    return;
  };
  importStatement(name,true)
  .then(()=>{
  createJointComponent(name);
  })
  .then(()=>{
    console.log(`${logSymbols.success} - ${color.blue(name)} ${color.green('component was created')}`);
  })
  .catch((err)=>{
    console.log(`${color.red(err.message)}`);
  })
};

function unjointedComponent(name) {
  console.log('unjointedComponent '+name);
  if (fs.existsSync(`./src/components/${name}`)) {
    console.log(`${logSymbols.error} - ${color.red('the web component already exists')}`);
    return;
  };
  fs.promises.mkdir(`./src/components/${name}`, { recursive: true })
    .then(()=>{
      importStatement(name,false);
    })
    .then(()=>{
      createUnjointedComponent(name);
    })
    .then(()=>{
      console.log(`${logSymbols.success} - ${color.blue(name)} ${color.green('component was created')}`);
    })
    .catch((err)=>{
      console.log(`${color.red(err.message)}`);
    })
};

