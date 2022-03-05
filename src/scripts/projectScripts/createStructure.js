import fs from "fs";

/*const options: {
    skipPrompts: boolean;
    git: boolean;
    commandName: string;
    name: string;
    runInstall: boolean;
}*/

export async function createStructureProject(options){
  
  if (fs.existsSync(`./${options.name}`)) {
    console.log(`The ${options.name} project already exists`);
    return;
  }else{
    await fs.promises.mkdir(`./${options.name}`, { recursive: true });
    await fs.promises.mkdir(`./${options.name}/src`, { recursive: true });
    await fs.promises.mkdir(`./${options.name}/asset`, { recursive: true });
    await fs.promises.mkdir(`./${options.name}/public`, { recursive: true })
    .then(()=>{
      // crear los archivos
      /*
      src/index.html
      src/main.js
      src/index.js 
      src/index.css 
      pakage.json 
      README.md 
      vite.config.js 
      .gitignore 
      .eslintrc.json ??????
      */
      console.log('las carpetas fueron creadas con Exito');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}