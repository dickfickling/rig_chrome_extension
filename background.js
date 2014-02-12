function fillForm() {
  chrome.tabs.executeScript(null, {file: "fill_form.js"});
}

chrome.browserAction.onClicked.addListener(function(tab) { fillForm() });
