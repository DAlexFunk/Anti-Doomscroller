chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "tabChange" && request.url.includes("shorts")) {
    // Get the short on the page
    // There are multiple video elements but only the short has an src so we filter for that
    const short = Array.from(document.querySelectorAll("video")).filter(
      (video) => video.src
    )[0];

    // Create diaog and style
    const popup = document.createElement("dialog");
    popup.id = "popup";
    popup.textContent = "STOP SCROLLING";

    // Create button, style, and add the click event
    const button = document.createElement("button");
    button.id = "closePopup";
    button.onclick = () => {
      popup.close();
      console.log("test");
      if (short) short.play();
    };
    button.textContent = "X";

    // Put the button in a random position
    button.style.marginLeft = `${Math.random() * 100}%`;
    button.style.marginTop = `${Math.random() * 20}%`;

    buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    buttonContainer.appendChild(button);

    popup.appendChild(buttonContainer);
    document.body.appendChild(popup);

    // Show the dialog
    popup.showModal();

    // Pause the short (if the short takes too long to load it may not be here so we check for it)
    if (short) {
      short.pause();
    }
  }
});
