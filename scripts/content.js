let reelsFirst = true; // tracks if this is the first reel shown to the user
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "tabChange" && (request.url.includes("shorts") || request.url.includes("reels"))) {
    // Get the video on the page
    let short = getVideo(request.url.includes("shorts") ? "shorts" : "reels");

    const dialog = createDialog(short);
    document.body.appendChild(dialog);

    // Show the dialog
    if (request.url.includes("reels") && reelsFirst) {
      // This stops the dialog from appearing twice on reels
      reelsFirst = false;
    } 
    else {
      dialog.showModal();

      // Play the metallic sound
      new Audio(chrome.runtime.getURL("../media/metalhit.mp3")).play();
    }

    // Pause the video (if the short takes too long to load it may not be here so we check for it)
    if (short) {
      short.pause();
    } 
    else if (message !== "buttonClicked ") {
      // Resets the first reel if we left the reels page
      reelsFirst = true;
    }

    if (request.message === "buttonClicked") {
      console.log("clicked");
    }
  }
});

function createDialog(short) {
  // Create diaog
  const dialog = document.createElement("dialog");
  dialog.id = "popup";
  dialog.style.backgroundImage = `url(${chrome.runtime.getURL("media/metalBackground.jpg")})`;

  // Create button and add the click event
  const button = document.createElement("button");
  button.id = "closePopup";
  button.onclick = () => {
    if (short) {
      short.play();
    }
    dialog.remove(); // Prevents the dialogs from polluting the dom with many hidden dialog boxes
  };
  // Defocus the button to prevent the user from just pressing enter
  button.onfocus = () => {
    button.blur();
  };
  button.textContent = "X";

  // Put the button in a random position
  button.style.marginLeft = `${Math.random() * 100}%`;
  button.style.marginTop = `${Math.random() * 20}%`;

  // Hide the button and show the button later
  button.style.display = "none";
  setTimeout(() => {
    button.style.display = "block";
  }, 3000);

  dialog.appendChild(button);

  return dialog;
}

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
