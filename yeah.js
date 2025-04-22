let cLog = [];

// Save the original console methods
const originalLog = console.log;
const originalInfo = console.info;
const originalWarn = console.warn;
const originalError = console.error;

// Override console.log
console.log = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push("[LOG]: " + message + "\n");
  originalLog.apply(console, args);
};

// Override console.info
console.info = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push("[INFO]: " + message + "\n");
  originalInfo.apply(console, args);
};

// Override console.warn
console.warn = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push("[WARN]: " + message + "\n");
  originalWarn.apply(console, args);
};

// Override console.error
console.error = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push("[ERROR]: " + message + "\n");
  originalError.apply(console, args);
};
/*this adds all of the console things into the list 'cLog', i did it like this to make a reset button*/



