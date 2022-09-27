import { scriptsOptions } from "./scripts/consoleScripts/scriptsOptions.js";

import * as url from 'url';
import { fileURLToPath } from 'url';
import fs from 'fs';


export function cli(args) {
  
  const __dirname = url.fileURLToPath(new URL('..', import.meta.url));
  const info = JSON.parse(fs.readFileSync(`${__dirname}package.json`, 'utf8')).version;
  
  scriptsOptions(args, info);
}