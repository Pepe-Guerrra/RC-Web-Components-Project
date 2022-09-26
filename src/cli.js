import { scriptsOptions } from "./scripts/consoleScripts/scriptsOptions.js";
import fs from "fs";

export function cli(args) {
  const info = '0.17.7' //JSON.parse(fs.readFileSync('package.json', 'utf8'));
  scriptsOptions(args, info.version);
}