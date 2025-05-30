chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, {
        message: "tabChange",
        url: changeInfo.url,
      });
    }
  });
});
