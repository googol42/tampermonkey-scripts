// ==UserScript==
// @name     Bikerouter - Prozentangaben bei der Wegbeschaffenheit anzeigen
// @version  1
// @grant    none
// @include  https://brouter.de/brouter-web/*
// @include  https://bikerouter.de/*
// @run-at   document-idle
// ==/UserScript==

function getDistance(element) {
  return element.replace(" km", "").replace(",", ".");
}

function insertPercent(element) {
  if (element.textContent.includes("%")) {
      console.log("return");
      return;
  }
  let totalDistance = getDistance(document.getElementById("distance").title);

  let distance = getDistance(element.textContent);
  let percentage = (distance / totalDistance * 100).toFixed(2);
  let formattedPercentage = percentage + " %";
  console.log(formattedPercentage);
  element.textContent = element.textContent + " - " + formattedPercentage;

}


function update() {
  console.log("update");
  console.log(document.getElementsByClassName("track-analysis-distance"));
  Array.from(document.getElementsByClassName("track-analysis-distance")).forEach(insertPercent);
}

function installObserver() {
  const targetNode = document.getElementById("track_statistics");
  console.log("install obsver");

  // Options for the observer (which mutations to observe)
  const config = { childList: true, subtree: true, characterData: true };

  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
              console.log('A child node has been added or removed.');
              update();
          }
          if (mutation.type === 'characterData') {
            console.log('Character data has changed.');
            update();
          }
      }
  };

  // Create an instance of MutationObserver with the callback
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}


function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100); // Check every 100ms
}

// Usage
waitForElement('#track_statistics', (element) => {
    installObserver();
});
