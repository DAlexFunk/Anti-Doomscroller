let reelsFirst = true; // tracks if this is the first reel shown to the user

function getVideo(site) {
  let short;
  if (site === "shorts") {
    // There are 2 video elements so we find the one with the src
    short = Array.from(document.querySelectorAll("video")).filter((video) => video.src)[0];
  } 
  else if (site === "reels") {
    // Many, many reels are loaded at a time so we find the currently playing one
    document.querySelectorAll("video").forEach((vid) => {
      if (!vid.paused) {
        short = vid;
      }
    });
  }

  return short;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "tabChange" && (request.url.includes("shorts") || request.url.includes("reels"))) {
    // Get the video on the page
    let short = getVideo(request.url.includes("shorts") ? "shorts" : "reels");

    // Create diaog
    const popup = document.createElement("dialog");
    popup.id = "popup";

    popup.style.backgroundImage = `url(${chrome.runtime.getURL("media/metalBackground.jpg")})`;
    // popup.style.backgroundSize = "100% 100%";

    // Create button and add the click event
    const button = document.createElement("button");
    button.id = "closePopup";
    button.onclick = () => {
      popup.close();
      if (short) {
        short.play();
      }
    };

    button.onfocus = () => {
      button.blur();
    };

    button.textContent = "X";

    // Put the button in a random position
    button.style.marginLeft = `${Math.random() * 100}%`;
    button.style.marginTop = `${Math.random() * 20}%`;

    // Hide the button
    button.style.display = "none";

    setTimeout(() => {
      button.style.display = "block"
    }, 3000);

    buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    buttonContainer.appendChild(button);

    popup.appendChild(buttonContainer);
    document.body.appendChild(popup);

    // Show the dialog
    if (request.url.includes("reels") && reelsFirst) { // This stops the pop from appearing twice on reels
      reelsFirst = false;
    } 
    else {
      popup.showModal();

      // Play the metallic sound
      new Audio(chrome.runtime.getURL("../media/metalhit.mp3")).play();
    }

    // Pause the video (if the short takes too long to load it may not be here so we check for it)
    if (short) {
      short.pause();
    }
  } 
  else {
    reelsFirst = true;
  }
});
