
let spiner;

class Spin{
  interval = 80;
  frames = [ "⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏" ];
  frameIndex = this.frames.length;
  i = 0;

  constructor(){};

  start(msg){
    spiner = setInterval(()=>{
      this.i = (this.i + 1) % this.frameIndex;
      process.stdout.write(`  ${color.yellow(this.frames[this.i])}  ==> ${logSymbols.info}${msg} \r`);  // write text
    }, this.interval);
  };
  end(msg){
    clearInterval(spiner);
    process.stdout.clearLine(0);
    process.stdout.write(`${logSymbols.success} - ${msg}\n`)
    return this;
  };
};
function spin() {
	return new Spin();
};

const logSymbols = {
  info: ('\x1B[1;34m ℹ \x1B[0m'), //Blue
  success: ('\x1B[1;32m ✔ \x1B[0m'), //Green
  warning: ('\x1B[1;33m ⚠ \x1B[0m'), //Yellow
  error: ('\x1B[1;31m X \x1B[0m'), //Red
};

const color = {
  black:(text)=>{ return (`\x1B[30m${text}\x1B[0m`) },
  red:(text)=>{ return (`\x1B[31m${text}\x1B[0m`) },
  green:(text)=>{ return (`\x1B[32m${text}\x1B[0m`) },
  yellow:(text)=>{ return (`\x1B[33m${text}\x1B[0m`) },
  blue:(text)=>{ return (`\x1B[34m${text}\x1B[0m`) },
  magenta:(text)=>{ return (`\x1B[35m${text}\x1B[0m`) },
  cyan:(text)=>{ return (`\x1B[36m${text}\x1B[0m`) },
  white:(text)=>{ return (`\x1B[37m${text}\x1B[0m`) } 
};

export { spin, color, logSymbols  }
