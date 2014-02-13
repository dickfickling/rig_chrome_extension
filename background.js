chrome.browserAction.onClicked.addListener(function(tab) { chrome.tabs.executeScript(null, {file: "fill_form.js"}); });
