let modeSelect = document.querySelector("#modeSelect");
document.querySelector("button").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    chrome.tabs.sendMessage(tab.id, {
      message: "buttonClicked",
      mode: modeSelect.value !== "" ? modeSelect.value : "button" // Set a default mode of "button"
    });
  }

  window.close();
});
