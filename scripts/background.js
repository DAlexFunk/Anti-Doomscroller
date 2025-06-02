const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);

chrome.runtime.onInstalled.addListener(() => {
  keepAlive();
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, {
        message: "tabChange",
        url: changeInfo.url,
      });
    }
  });
});
