import fs from "fs";
import { createComponent } from "./writeComponent.js";
import { importStatement } from "./importStatement.js";



// create the folder structure for the Web Component if it does NOT exist
export async function addFolder(componentName){

  if (fs.existsSync(`./src/components/${componentName}`)) {
    console.log('the web component already exists');
    return;
  }else{
    fs.promises.mkdir(`./src/components/${componentName}`, { recursive: true })
    .then(()=>{
      importStatement(componentName);
    })
    .then(()=>{
      createComponent(componentName);
      console.log(`${componentName} component was created`);
    })
    .catch((err)=>{
      console.log(err);
    })
  } 

}

