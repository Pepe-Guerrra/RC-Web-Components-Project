import fs from "fs";

export async function createComponent(componentName) {

  // takes the componentName, breaks it into parts, lowercases it, and adds a gion for this result(component-name)
  let compName = componentName.replace(/([A-Z])/g, " $1").replace(/^./, (str)=>{ return str; }).toLowerCase()
  let markupName = compName.replace(/ /g,"-");

  // Create the file if it doesn't exist
  let stream = fs.createWriteStream(`./src/components/${componentName}/${componentName}.js`);
  
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
      stream.write('  createCSS(){\n');
      stream.write('    // Apply external styles to the shadow dom\n');
      stream.write('    const linkElem = document.createElement(\'link\');\n');
      stream.write('    linkElem.setAttribute(\'rel\', \'stylesheet\');\n');
      stream.write(`    linkElem.setAttribute(\'href\', \'components/${componentName}/${componentName}.css\');\n`);
      stream.write('    return linkElem.outerHTML;\n');
      stream.write('  };\n');
      stream.write('\n');
      stream.write('  connectedCallback(){\n');
      stream.write('    this.render();\n');
      stream.write('  };\n');
      stream.write('\n');
      stream.write('  render(){\n');
      stream.write('    this.shadowRoot.innerHTML = /* HTML */`\n');
      stream.write('      ${this.createCSS()}\n');
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

    let streamCss = fs.createWriteStream(`./src/components/${componentName}/${componentName}.css`);
    streamCss.once('open', function(fd) {
      streamCss.write('\n');
      streamCss.write(':host{\n')
      streamCss.write('  \n');
      streamCss.write('}');
      streamCss.end();
    });

}





