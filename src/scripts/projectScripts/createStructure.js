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
    await fs.promises.mkdir(`./${options.name}/src/components`, { recursive: true });
    await fs.promises.mkdir(`./${options.name}/asset`, { recursive: true });
    await fs.promises.mkdir(`./${options.name}/public`, { recursive: true })
    .then(()=>{
      // crear los archivos
      fs.createWriteStream(`./${options.name}/src/index.css`);
      fs.createWriteStream(`./${options.name}/src/index.js`);
      fs.createWriteStream(`./${options.name}/src/components/components.js`);
      fs.createWriteStream(`./${options.name}/README.md`);
      fs.createWriteStream(`./${options.name}/.gitignore`);
      let streamHtml = fs.createWriteStream(`./${options.name}/src/index.html`);
      let streamPakageJson = fs.createWriteStream(`./${options.name}/package.json`);
      let streamViteConfig = fs.createWriteStream(`./${options.name}/vite.config.js`);
      writeHtml(streamHtml, options);
      //writePakageJson(streamPakageJson, options);
      writeViteConfig(streamViteConfig, options);
      //.eslintrc.json ??????
      console.log('las carpetas fueron creadas con Exito');
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}

function writeHtml(streamHtml, options) {
  streamHtml.once('open', function(fd) {
    streamHtml.write('<!DOCTYPE html>\n');
    streamHtml.write('<html lang="en">\n');
    streamHtml.write('  <head>\n');
    streamHtml.write('    <meta charset="UTF-8">\n');
    streamHtml.write('    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n');
    streamHtml.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    streamHtml.write('    <link rel="stylesheet" href="index.css">\n');
    streamHtml.write(`    <title>${options.name}</title>\n`);
    streamHtml.write('  </head>\n');
    streamHtml.write('  <body>\n');
    streamHtml.write('    \n');
    streamHtml.write('    <script type="module" src="/index.js"></script>\n');
    streamHtml.write('    <script type="module" src="components/components.js"></script>\n');
    streamHtml.write('  </body>\n');
    streamHtml.write('</html>\n');
    streamHtml.end();
  });
};

/* function writePakageJson(streamPakageJson, opciones){
  streamPakageJson.once('open', function(fd) {
    streamPakageJson.write(''),
  }); */
  /*
  {
    "name": "proyecto-pruebas",
    "private": true,
    "version": "1.0.0",
    "description": "CLI to generate vanilla javascript web components projects",
    "main": "bin/index.js",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "keywords": [],
    "engines": {
      "node": ">=8"
    },
    "author": "RFCM",
    "license": "MIT",
    "repository": {
      "type": "git",
      "url": ""
    },
    "bugs": {
      "url": ""
    },
    "homepage": "",
    "files": [
      "src",
      "asset",
      "public",
      "package.json",
      "README.md"
    ],
    "devDependencies": {
      "vite": "^2.8.0"
    }
  }
  */
//};

function writeViteConfig(streamViteConfig, opciones){
  streamViteConfig.once('open', function(fd) {
    streamViteConfig.write('module.exports = {\n');
    streamViteConfig.write('  root: "src",    \n');
    streamViteConfig.write('  build: {\n');
    streamViteConfig.write('    outDir: "../dist"\n');
    streamViteConfig.write('  }\n');
    streamViteConfig.write('}\n');
  });
};