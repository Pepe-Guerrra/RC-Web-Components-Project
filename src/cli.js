import { scriptsOptions } from "./scripts/consoleScripts/scriptsOptions.js";
import fs from "fs";

export function cli(args) {
  const info = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  scriptsOptions(args, info.version);
}