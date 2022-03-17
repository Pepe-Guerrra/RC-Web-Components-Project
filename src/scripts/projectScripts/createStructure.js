import fs from "fs";

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
      writePakageJson(streamPakageJson, options);
      writeViteConfig(streamViteConfig);
      //.eslintrc.json ??????
    })
    .catch((err)=>{
      console.log(err);
    })
  }

}

function KeysArray(keysStrin) {
  const splitArray = keysStrin.split(",")
  let trimArray = [];
  splitArray.forEach((element) => { trimArray.push(element.trim()) });
  return trimArray
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

function writePakageJson(streamPakageJson, options){
  streamPakageJson.once('open', function(fd) {
    const keywords = KeysArray(options.keywords);
    const gitRepository = options.gitRepository.replace('.git','');

    streamPakageJson.write('{\n');
    streamPakageJson.write(`  "name": "${options.packageName}",\n`);
    streamPakageJson.write('  "private": true,\n');
    streamPakageJson.write(`  "version": "${options.version}",\n`);
    streamPakageJson.write(`  "description": "${options.description}",\n`);
    streamPakageJson.write(`  "main": "${options.entryPoint}",\n`);
    streamPakageJson.write('  "type": "module",\n');
    streamPakageJson.write('  "scripts": {\n');
    streamPakageJson.write('    "dev": "vite",\n');
    streamPakageJson.write('    "build": "vite build",\n');
    streamPakageJson.write('    "preview": "vite preview",\n');
    streamPakageJson.write(`    "test": ${options.testCommand}\n`);
    streamPakageJson.write('  },\n');
    streamPakageJson.write('  "keywords": [\n');
    keywords.forEach((element,index) => {
      if (index == (keywords.length - 1)) {
        streamPakageJson.write(`    "${element}"\n`);
        return;
      }
      streamPakageJson.write(`    "${element}",\n`);
    });
    streamPakageJson.write('  ],\n');
    streamPakageJson.write('  "engines": {\n');
    streamPakageJson.write('    "node": ">=8"\n');
    streamPakageJson.write('  },\n');
    streamPakageJson.write(`  "author": "${options.author}",\n`);
    streamPakageJson.write(`  "license": "${options.license}",\n`);
    streamPakageJson.write('  "repository": {\n');
    streamPakageJson.write('    "type": "git",\n');
    streamPakageJson.write(`    "url": "${options.gitRepository}"\n`);
    streamPakageJson.write('  },\n');
    streamPakageJson.write('  "bugs": {\n');
    streamPakageJson.write(`    "url": "${gitRepository}/issues"\n`);
    streamPakageJson.write('  },\n');
    streamPakageJson.write(`  "homepage": "${gitRepository}",\n`);
    streamPakageJson.write('  "files": [\n');
    streamPakageJson.write('    "src",\n');
    streamPakageJson.write('    "asset",\n');
    streamPakageJson.write('    "public",\n');
    streamPakageJson.write('    "package.json",\n');
    streamPakageJson.write('    "README.md"\n');
    streamPakageJson.write('  ],\n');
    streamPakageJson.write('  "devDependencies": {\n');
    streamPakageJson.write('    "vite": "^2.8.0"\n');
    streamPakageJson.write('  }\n');
    streamPakageJson.write('}\n');
    streamPakageJson.end();
  });
};

function writeViteConfig(streamViteConfig){
  streamViteConfig.once('open', function(fd) {
    streamViteConfig.write('module.exports = {\n');
    streamViteConfig.write('  root: "src",    \n');
    streamViteConfig.write('  build: {\n');
    streamViteConfig.write('    outDir: "../dist"\n');
    streamViteConfig.write('  }\n');
    streamViteConfig.write('}\n');
    streamViteConfig.end();
  });
};