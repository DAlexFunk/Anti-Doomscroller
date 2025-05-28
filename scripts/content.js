chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === "tabChange") {
    console.log(request.message);
    const newP = document.createElement("dialog");
    newP.textContent = "STOP SCROLLING";
    newP.style.fontSize = "24px";
    newP.style.height = "50vh";
    newP.style.width = "50vw";
    newP.style.background = "red";
    newP.style.zIndex = 1000;

    const button = document.createElement("button");
    button.onclick = () => {
      newP.close();
    };
    button.textContent = "Fine you can scroll";
    newP.appendChild(button);

    document.body.appendChild(newP);
    newP.showModal();
  }
});
