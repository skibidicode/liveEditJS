function startSeq() {
  // creates title text thing
  const startMsg = document.createElement("div");
  startMsg.id = "sMsg";
  startMsg.innerText = "LiveEdit";
  document.body.appendChild(startMsg);

  // create style thing to blur everything except text
  const style = document.createElement('style');
  style.textContent = `
    body > *:not(#sMsg) {
      filter: blur(7px);
      transition: filter 0.5s;
    }
    #sMsg {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 15px;
      font-weight: bold;
      background: none;
      box-shadow: none;
      font-family: 'Courier New', monospace;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }
  `;
  document.head.appendChild(style);

  // fadein trigger
  requestAnimationFrame(() => {
    startMsg.style.opacity = "1";
  });

  // delete after 2.5seconds
  setTimeout(() => {
    // msg fadeout
    startMsg.style.opacity = "0";

    // take off blur
    document.querySelectorAll("body > *:not(#sMsg)").forEach(el => {
      el.style.filter = "none";
    });

    // wait for fadeout to end vefore removing style and message
    setTimeout(() => {
      startMsg.remove();
      style.remove();
    }, 500); // matches the length of fade-out
  }, 2500);
}

startSeq();
