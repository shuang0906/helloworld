const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);

const imageUrls = [
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/sky.png?v=1701682900055",
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/image1.png?v=1701671116859",
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/image3?v=1701674060458",
];
let currentImageIndex = -1;

let img; // Declare img here for broader scope
let tilesX = 200;
let tilesY = 100;
let coloredTiles = [];
let tilesToChangePerFrame = 1600;

function loadimg() {
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function () {
    // Resize image for pattern
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = img.width;
    patternCanvas.height = img.height;
    const patternCtx = patternCanvas.getContext("2d");
    patternCtx.drawImage(img, 0, 0, img.width, img.height);
    img.pattern = ctx.createPattern(patternCanvas, "repeat");
    img.pattern.setTransform(matrix.rotate(0).scale(0.1));
    coloredTiles = []; // Reset colored tiles for new image
    requestAnimationFrame(drawpix); // Start the drawpix loop
  };
  img.src = imageUrls[currentImageIndex];
}

document.getElementById("changeImage").addEventListener("click", loadimg);

function drawpix() {
  let tileW = canvas.width / tilesX;
  let tileH = canvas.height / tilesY;

  // Randomly color multiple tiles
  for (
    let i = 0;
    i < tilesToChangePerFrame && coloredTiles.length < tilesX * tilesY;
    i++
  ) {
    let x = Math.floor(Math.random() * tilesX);
    let y = Math.floor(Math.random() * tilesY);
    let tileKey = `${x}-${y}`;

    if (!coloredTiles.includes(tileKey)) {
      coloredTiles.push(tileKey); // Add the selected tile to the array

      // Color the selected tile with pattern
      ctx.fillStyle = img.pattern;
      ctx.fillRect(x * tileW, y * tileH, tileW, tileH);
    }
  }

  if (coloredTiles.length < tilesX * tilesY) {
    requestAnimationFrame(drawpix);
  }
}
--------------------------------------------------------------------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = 1691;
canvas.height = 803;
const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);

const imageUrls = [
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/sky.png?v=1701682900055",
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/image1.png?v=1701671116859",
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/image3?v=1701674060458",
];
let currentImageIndex = -1;

let img; // Declare img here for broader scope
let tilesX = 200;
let tilesY = tilesX/2;
let coloredTiles = [];
let tilesToChangePerFrame = 300;

function loadimg() {
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  img = new Image(); // Reassign a new Image object
  img.crossOrigin = "anonymous";
  img.onload = function () {
    // Resize image for pattern
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = img.width;
    patternCanvas.height = img.height;
    const patternCtx = patternCanvas.getContext("2d");
    patternCtx.drawImage(img, 0, 0, img.width, img.height);
    img.pattern = ctx.createPattern(patternCanvas, "repeat");
    img.pattern.setTransform(matrix.rotate(0).scale(0.1));
    coloredTiles = []; // Reset colored tiles for new image
    requestAnimationFrame(drawpix); // Start the drawpix loop
  };
  img.src = imageUrls[currentImageIndex];
}

document.getElementById("changeImage").addEventListener("click", loadimg);

function drawpix() {
  let tileW = canvas.width / tilesX;
  let tileH = canvas.height / tilesY;

  // Randomly color multiple tiles
  for (
    let i = 0;
    i < tilesToChangePerFrame && coloredTiles.length < tilesX * tilesY;
    i++
  ) {
    let x = Math.floor(Math.random() * tilesX);
    let y = Math.floor(Math.random() * tilesY);
    let tileKey = `${x}-${y}`;

    if (!coloredTiles.includes(tileKey)) {
      coloredTiles.push(tileKey); // Add the selected tile to the array

      // Color the selected tile with pattern
      ctx.fillStyle = img.pattern;
      ctx.fillRect(x * tileW, y * tileH, tileW, tileH);
    }
  }

  if (coloredTiles.length < tilesX * tilesY) {
    requestAnimationFrame(drawpix);
  }
}

------------------------------------------------------------------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = 1691;
canvas.height = 803;

const imageUrls = [
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/sky.png?v=1701682900055",
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/image1.png?v=1701671116859",
  "https://cdn.glitch.global/286fa20c-d505-4839-8709-32506cd1f269/image3?v=1701674060458",
];
let currentImageIndex = -1;

let img; // Declare img here for broader scope
let tilesX = 100;
let tilesY = tilesX;
let coloredTiles = [];
let tilesToChangePerFrame = 300;

function loadimg() {
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  img = new Image(); // Reassign a new Image object
  img.crossOrigin = "anonymous";
  img.onload = function () {
    // Resize image
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = tilesX;
    offscreenCanvas.height = tilesY;
    const offCtx = offscreenCanvas.getContext("2d");
    offCtx.drawImage(img, 0, 0, tilesX, tilesY);
    img = offscreenCanvas;

    coloredTiles = []; // Reset colored tiles for new image
    requestAnimationFrame(drawpix); // Start the drawpix loop
  };
  img.src = imageUrls[currentImageIndex];
}

document
  .getElementById("changeImage")
  .addEventListener("click", loadimg);

function drawpix() {
  let tileW = canvas.width / tilesX;
  let tileH = canvas.height / tilesY;

  // Randomly color multiple tiles
  for (let i = 0; i < tilesToChangePerFrame; i++) {
    let x = Math.floor(Math.random() * tilesX);
    let y = Math.floor(Math.random() * tilesY);
    let tileKey = `${x}-${y}`;

    if (!coloredTiles.includes(tileKey)) {
      coloredTiles.push(tileKey); // Add the selected tile to the array

      // Color the selected tile
      const imageData = img
        .getContext("2d")
        .getImageData(x, y, 1, 1).data;
      ctx.fillStyle = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
      ctx.fillRect(x * tileW, y * tileH, tileW, tileH);
    }
  }

  if (coloredTiles.length < tilesX * tilesY) {
    requestAnimationFrame(drawpix);
  }
}