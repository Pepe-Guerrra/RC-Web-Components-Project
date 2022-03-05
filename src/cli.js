import { scriptsOption } from "./scripts/consoleScripts/scriptsOptions.js";
import { scriptsQuestions } from "./scripts/consoleScripts/scriptsQuestions";

export function cli(args) {
  //scriptsOption();
  scriptsQuestions(args);
}