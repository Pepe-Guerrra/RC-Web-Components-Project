import fs from "fs";
import { color } from "../supportFeature/spin.js";

export async function importStatement(componentName,joint){
  let str;
  joint
  ? str = `import "./components/${componentName}.js";`
  : str = `import "./components/${componentName}/${componentName}.js";`
  
  fs.closeSync(fs.openSync('./src/components/components.js','a'))
  fs.readFile('./src/components/components.js',(err, data)=>{
    if (err) throw err;
    let text = data.toString().split("\n");
    text.splice(0, 0, str );
    let texto = text.join("\n");
    fs.writeFile('./src/components/components.js', texto,(err)=>{
      if (err) throw err;
      console.log(`${color.green('Component')} ${color.blue(componentName)} ${color.green('was imported to components.js Module')}`);
    });
  });

};
