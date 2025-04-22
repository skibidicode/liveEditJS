let cLog = [];

// Save original console methods
const originalLog = console.log;
const originalInfo = console.info;
const originalWarn = console.warn;
const originalError = console.error;

console.log = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push({type: "log", message:"[LOG]: " + message});
  originalLog.apply(console, args);
};
console.info = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push({type: "info", message:"[INFO]: " + message});
  originalInfo.apply(console, args);
};
console.warn = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push({type: "warn", message:"[WARN]: " + message});
  originalWarn.apply(console, args);
};
console.error = function (...args) {
  const message = args.map(String).join(' ');
  cLog.push({type: "error", message:"[ERROR]: " + message});
  originalError.apply(console, args);
};

function updateConsole() {
  const consoleText = document.getElementById("consoleText");
  consoleText.innerHTML = ""; // clear previous output

  cLog.forEach(entry => {
    const div = document.createElement("div");
    div.className = entry.type;  // e.g. "log", "warn"
    div.innerText = entry.message;
    consoleText.appendChild(div);
  });
}


// Repeated updater
function runRepeatedly() {
  updateConsole();
  setTimeout(runRepeatedly, 50);
}
runRepeatedly();

// Evaluate user input
document.getElementById("consoleInputSubmit").addEventListener("click", () => {
  const input = document.getElementById("consoleInputText").value;
  try {
    const result = eval(input);
    if (result !== undefined) console.log(result);
  } catch (e) {
    console.error(e);
  }
});
