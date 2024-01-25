var activeWindows = [];
var activeWindow = null;
var clickaudio = new Audio('assets/mouse-click.flac');

function setActiveWindow(element) {
  // Reset styles of the previous active window, if it exists
  if (activeWindow) {
    activeWindow.style.zIndex = "10"; 
    var previousTestElemen = activeWindow.querySelector('.overlay');
    if (previousTestElemen) {
      previousTestElemen.style.display = "block"; // Reset background of previous test element
    }
  }

  // Update the active window
  activeWindow = element;

  // Add the new active window to the activeWindows array if it's not already there
  if (!activeWindows.includes(element)) {
    activeWindows.push(element);
  }
  
  // Apply styles to the new active window
  if (activeWindow) {
    activeWindow.style.zIndex = "1000"; 
    var testElemen = activeWindow.querySelector('.overlay');
    if (testElemen) {
      testElemen.style.display = "none";
    }
  }
}

function closeWindow(button) {
  clickaudio.play();
  var windowElement = button.closest(".window");
  console.log("windowElement: ", windowElement);
  console.log("activeWindow: ", activeWindow);

  if (windowElement === activeWindow) {
    setActiveWindow(activeWindows[activeWindows.length - 2]);
    console.log("Updated active windows array after close: ", activeWindows[activeWindows.length - 2]);
}
    windowElement.style.display = "none";
    console.log("Window closed: ", windowElement, activeWindow, activeWindows);
    console.log("Window array: ", activeWindows);

    bodyScroll.classList.remove("stop-scrolling");

    
} 

var originalWidth, originalHeight, originalTop, originalLeft;

/////////////////



function maxWindow(button) {
  var bodyScroll = document.body;
  bodyScroll.classList.add("stop-scrolling");

  var windowElement = button.closest(".window");
  var windowBody = windowElement.getElementsByClassName("window-body")[0];///
  windowBody.style.display = "contents";///

  if (windowElement) {
    originalWidth = windowElement.style.width;
    originalHeight = windowElement.style.height;
    originalTop = windowElement.style.top;
    originalLeft = windowElement.style.left;

    windowElement.style.width = "100%";
    windowElement.style.height = "100vh";
    windowElement.style.top = "0";
    windowElement.style.left = "0";
    windowElement.style.zIndex = "1000"; // You can adjust this value as needed
    windowElement.style.position = "fixed";

    // Find the resizeWindow button and update its attributes
    var resizeButton = windowElement.querySelector('.resizeWindow');
    if (resizeButton) {
      resizeButton.setAttribute("aria-label", "Restore");
      resizeButton.setAttribute("onclick", "restoreWindow(this)");
    }
  }
}
  
function restoreWindow(button) {
  var bodyScroll = document.body;
  bodyScroll.classList.remove("stop-scrolling");

  var windowElement = button.closest(".window");
  if (windowElement) {
    windowElement.style.width = originalWidth;
    windowElement.style.height = originalHeight;
    windowElement.style.top = originalTop;
    windowElement.style.left = originalLeft;
    windowElement.style.zIndex = "";
    windowElement.style.position = "absolute";////////

    // Change back the attributes of the button
    button.setAttribute("aria-label", "Maximize");
    button.setAttribute("onclick", "maxWindow(this)");
  }
}
  
  var windowState = "restored";
  
  function minWindow(button) {
    var bodyScroll = document.body;
    bodyScroll.classList.remove("stop-scrolling");

    var windowElement = button.closest(".window");
    if (windowElement) {

      windowElement.style.width = originalWidth;
      windowElement.style.height = originalHeight;
      windowElement.style.top = originalTop;
      windowElement.style.left = originalLeft;
      windowElement.style.position = "absolute";

      var windowBody = windowElement.getElementsByClassName("window-body")[0];
      if (windowState === "minimized") {
        if (windowBody) {
          windowBody.style.display = "contents";
        }
        windowState = "restored";
      } else if (windowState === "restored") {
        if (windowBody) {
          windowBody.style.display = "none";
        }
        windowState = "minimized";
      }
    }
  }

  
  