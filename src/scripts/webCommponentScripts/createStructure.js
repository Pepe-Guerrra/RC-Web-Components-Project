import fs from "fs";
import { createUnjointedComponent } from "./writeUnjointedComponent.js";
import { createJointComponent } from "./writeJointComponent.js";
import { importStatement } from "./importStatement.js";



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
    console.log(`\x1b[31m the web component already exists \x1b[0m`);
    return;
  };
  importStatement(name,true)
  .then(()=>{
  createJointComponent(name);
  })
  .then(()=>{
    console.log(`${name} component was created`);
  })
  .catch((err)=>{
    console.log(`\x1b[31m${err.message}\x1b[0m`);
  })
};

function unjointedComponent(name) {
  console.log('unjointedComponent '+name);
  if (fs.existsSync(`./src/components/${name}`)) {
    console.log(`\x1b[31m the web component already exists \x1b[0m`);
    return;
  };
  fs.promises.mkdir(`./src/components/${name}`, { recursive: true })
    .then(()=>{
      importStatement(name,false);
    })
    .then(()=>{
      createUnjointedComponent(name);
      console.log(`${name} component was created`);
    })
    .catch((err)=>{
      console.log(err.mssage);
    })
};

