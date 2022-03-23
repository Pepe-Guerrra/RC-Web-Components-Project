import fs from "fs";

export async function createJointComponent(componentName) {

  // takes the componentName, breaks it into parts, lowercases it, and adds a gion for this result(component-name)
  let compName = componentName.replace(/([A-Z])/g, " $1").replace(/^./, (str)=>{ return str; }).toLowerCase()
  let markupName = compName.replace(/ /g,"-");

  // Create the file if it doesn't exist
  let stream = fs.createWriteStream(`./src/components/${componentName}.js`);
  
  // Create the text inside the file
  stream.once('open', function(fd) {
    stream.write('\n');
    stream.write('\n');
    stream.write(`class ${componentName} extends HTMLElement {\n`);
    stream.write('\n');
    stream.write('  constructor(){\n');
    stream.write('    super();\n');
    stream.write('    this.attachShadow({ mode: "open" });\n');
    stream.write('  };\n');
    stream.write('\n');
    stream.write('  static get styles(){\n');
    stream.write('    return /* CSS */`\n');
    stream.write('      host:{\n');
    stream.write('        \n');
    stream.write('      }\n');
    stream.write('    `;\n');
    stream.write('  };\n');
    stream.write('\n');
    stream.write('  connectedCallback(){\n');
    stream.write('    this.render();\n');
    stream.write('  };\n');
    stream.write('\n');
    stream.write('  render(){\n');
    stream.write('    this.shadowRoot.innerHTML = /* HTML */`\n');
    stream.write(`    <style>${componentName}.styles</style>\n`);
    stream.write('      <div>\n');
    stream.write('\n');        
    stream.write('      </div>\n');
    stream.write('    `;\n');
    stream.write('  };\n');
    stream.write('\n');
    stream.write('};\n');
    stream.write('\n');
    stream.write(`customElements.define("${markupName}", ${componentName});\n`);
    stream.end();
  });
}





