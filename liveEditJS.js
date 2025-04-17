/* ------------------- ADD FULL JAVASCRIPT SOURCE ------------------- */
const scriptTags = document.querySelectorAll('script');
let combinedJS = '';

scriptTags.forEach(tag => {
  if (tag.src) {
    combinedJS += `// External Script: ${tag.src}\n[content not loaded]\n\n`;
  } else {
    combinedJS += tag.textContent + '\n\n';
  }
});

const jsView = `
  <pre style="white-space: pre-wrap; word-wrap: break-word;">
${combinedJS.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </pre>
`;

/* ------------------- ADD FULL CSS SOURCE ------------------- */
const styleTags = document.querySelectorAll('style, link[rel="stylesheet"]');
let combinedCSS = '';

styleTags.forEach(tag => {
  if (tag.tagName.toLowerCase() === 'style') {
    combinedCSS += tag.textContent + '\n\n';
  } else if (tag.tagName.toLowerCase() === 'link' && tag.href) {
    combinedCSS += `/* External Stylesheet: ${tag.href} */\n[content not loaded]\n\n`;
  }
});

const cssView = `
  <pre style="white-space: pre-wrap; word-wrap: break-word;">
${combinedCSS.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </pre>
`;

/* ------------------- HTML SNAPSHOT ------------------- */
function getHTMLSnapshotOnly() {
  const docClone = document.documentElement.cloneNode(true);
  const fullHTML = '<!DOCTYPE html>\n' + docClone.outerHTML;

  const htmlView = `
    <pre style="white-space: pre-wrap; word-wrap: break-word;">
${fullHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
    </pre>
  `;
  return htmlView;
}




/* ------------------- RUN BUTTON FUNCTIONALITY ------------------- */
window.runBtnFunctionality = function () {
liveEdit.document.getElementById('runBtn').onclick = () => {
  const html = liveEdit.document.getElementById('HTML-BLOCK').innerText;
  const css = liveEdit.document.getElementById('CSS-BLOCK').innerText;
  const js = liveEdit.document.getElementById('JS-BLOCK').innerText;

  const finalCode = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        <button onclick="window.opener.writeEdit()" style="
          position: fixed;
          top: 1em;
          right: 1em;
          padding: 0.5em 1em;
          background: #222;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1em;
          cursor: pointer;
          z-index: 9999;
        ">⬅ Back to Editor</button>
        ${html}
        <script>
          ${js}
        </script>
      </body>
    </html>
  `;

 
  liveEdit.document.open();
  liveEdit.document.write(finalCode);
  liveEdit.document.close();
  window.assignAll();
};
}
/* ------------------- OPEN NEW DOC ------------------- */
const liveEdit = window.open('', '_blank');
const doc = liveEdit.document;

const editorHTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>LiveEditJS</title>
      <style>
        body {
          font-family: sans-serif;
          margin: 2em;
        }
        a {
          color: #0066cc;
          text-decoration: none;
          font-weight: bold;
          margin-right: 1em;
        }
        a:hover {
          text-decoration: underline;
        }
        button {
          position: fixed;
          top: 1em;
          right: 1em;
          padding: 0.5em 1em;
          background: #222;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1em;
          cursor: pointer;
        }
        button:hover {
          background: #444;
        }
      </style>
    </head>
    <body>
<h1>Made by skibidicode on Github</h1><p></p>
      <div style="margin-bottom: 1em;">
        <a href="#HTML">⬇ Jump to HTML</a>
        <a href="#CSS">⬇ Jump to CSS</a>
        <a href="#JS">⬇ Jump to JavaScript</a>
      </div>

      <button id="runBtn", onclick="window.opener.runBtnFunctionality()">▶️ Run Code</button>

      <h1 id="HTML">HTML</h1>
      <blockquote contenteditable="true" id="HTML-BLOCK">
        <p>If you’re reading this, the page either has no HTML, or the code didn’t work.</p>
      </blockquote>

      <h1 id="CSS">CSS</h1>
      <blockquote contenteditable="true" id="CSS-BLOCK">
        <p>If you’re reading this, the page either has no CSS, or the code didn’t work.</p>
      </blockquote>

      <h1 id="JS">JavaScript</h1>
      <blockquote contenteditable="true" id="JS-BLOCK">
        <p>If you’re reading this, the page either has no JavaScript, or the code didn’t work.</p>
      </blockquote>
    </body>
  </html>
`;
window.assignAll = function () {
window.editorHTML = editorHTML;
window.cssView = cssView;
window.jsView = jsView;
window.getHTMLSnapshotOnly = getHTMLSnapshotOnly;
window.writeEdit = function () {
  liveEdit.document.open();
  liveEdit.document.write(window.editorHTML);
  liveEdit.document.close();

  const blockquoteH = liveEdit.document.getElementById('HTML-BLOCK');
  blockquoteH.innerHTML = window.getHTMLSnapshotOnly();

  const blockquoteC = liveEdit.document.getElementById("CSS-BLOCK");
  blockquoteC.innerHTML = window.cssView;

  const blockquoteJ = liveEdit.document.getElementById("JS-BLOCK");
  blockquoteJ.innerHTML = window.jsView;
};
}
window.assignAll();
liveEdit.document.open();
liveEdit.document.write(window.editorHTML);
liveEdit.document.close();
window.writeEdit();


