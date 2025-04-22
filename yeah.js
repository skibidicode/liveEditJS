let cLog = [];

// Save the original console methods
const originalLog = console.log;
const originalInfo = console.info;
const originalWarn = console.warn;
const originalError = console.error;

// Override console.log
console.log = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push("[LOG]: ", message)
  originalLog.apply(console, args);
};

// Override console.info
console.info = function (...args) {
  const message = args.map(String).join(' ');
  alert(message);
  originalInfo.apply(console, args);
};

// Override console.warn
console.warn = function (...args) {
  const message = args.map(String).join(' ');
  alert(message);
  originalWarn.apply(console, args);
};

// Override console.error
console.error = function (...args) {
  const message = args.map(String).join(' ');
  alert(message);
  originalError.apply(console, args);
};
