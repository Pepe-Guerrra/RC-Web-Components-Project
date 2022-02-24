import { addFolder } from "./createStructure.js";

export async function isValid(componetName) {

  if (componetName == undefined) {
    console.log(`\x1b[31m
      Incorrect syntax !!!!!!
      The correct syntax must be in camel case format
      example:
              > webc c webComponent
                    or
              > webc component webComponent
    \x1b[0m`);
    return;
  }

  let compName = componetName.replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str)=>{ return str; })
                              .toLowerCase()
                              .indexOf(" ");
  const r = /^[A-Z]+$/i;
  const validTest = r.test(componetName);
  const errorMsg = (`\x1b[31m
    *************************************************************************
    *                                                                       *
    *   The name of the Web Component does not meet the HTML5               *
    *   standard for component names.                                       *
    *   The correct syntax must be in camel case format                     *
    *   example:                                                            *
    *           > webc c webComponent                                       *
    *                  or                                                   *
    *           > webc component webComponent                               *
    *                                                                       *
    *************************************************************************
  \x1b[0m`)

  if ( !validTest  ) {
    console.log(errorMsg);
    return
  }
  if ( compName == -1  ) {
    console.log(errorMsg);
    return
  }

  addFolder(componetName);

}