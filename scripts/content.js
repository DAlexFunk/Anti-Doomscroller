chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "tabChange" && request.url.includes("shorts")) {
    // Get the short on the page
    // There are multiple video elements but only the short has an src so we filter for that
    const short = Array.from(document.querySelectorAll("video")).filter((video) => video.src)[0];

    // Create diaog and style
    const newP = document.createElement("dialog");
    newP.textContent = "STOP SCROLLING";
    newP.style.fontSize = "24px";
    newP.style.height = "50vh";
    newP.style.width = "50vw";
    newP.style.background = "red";
    newP.style.zIndex = 1000;

    // Create button, style, and add the click event
    const button = document.createElement("button");
    button.onclick = () => {
      newP.close();
      if (short) short.play() // TODO: maybe remove this, it would be more annoying if you had to unpuase each time
                              //       which could lead to less shorts time
    };
    button.textContent = "Fine you can scroll";
    newP.appendChild(button);

    document.body.appendChild(newP);
    
    // Show the dialog
    newP.showModal();

    // Pause the short (if the short takes too long to load it may not be here so we check for it)
    if (short) {
      short.pause();
    }

  }
});
