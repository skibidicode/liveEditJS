const CSS = `
    #consoleContainer {
      all: unset;
      position:absolute;
      cursor:move;
      background: #363636; 
      padding: 5px; 
      border-radius: 5px;
      zIndex: 999999999;
    }
    #consoleInputContainer {
    all: unset;
      display: flex;
      padding: 5px;
      height: 30%
      
    }
    #consoleInputText {
    all: unset;
      width: 70%;
      background: #757575; 
      padding: 5%; 
      border-radius: 5px;
      color: white;
    }
    #consoleInputSubmit {
    all: unset;
      flex: 1;
      background: #757575; 
      padding: 5px; 
      border-radius: 5px;
      color: white;
    }
    #consoleInputText::placeholder {
    all: unset;
      color: #ccc;
    }
    .info {all: unset; color: lightblue; }
    .log {all: unset; color: white; }
    .warn {all: unset; color: yellow;}
    .error {all: unset; color: red;}
    `;
const HTML = `

<div id="consoleContainer"> <div id="consoleContainerheader" style="color:gray;">Click Here to Drag</div>
  <div id="consoleText" style="background: #757575; padding: 5%; border-radius: 5px; height: 70%;">
    outputs go here
  </div>
  <div id="consoleInputContainer">
    <input type="text" id="consoleInputText" placeholder="Input to the console..."/>
    <button type="button" id="consoleInputSubmit">Run</button>
  </div>
</div>
`;
// Insert CSS at the end of the <style> tag in <head>
document.head.insertAdjacentHTML('beforeend', `<style>${CSS}</style>`);

// Insert HTML at the beginning of the <body> tag
document.body.insertAdjacentHTML('afterbegin', HTML);


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

dragElement(document.getElementById("consoleContainer"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

