//----------------------------------------random position----------------------------------------
var popaudio = new Audio('assets/popup.wav');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomInttwoRange(min1, max1, min2, max2) {
  let min, max;
  if (Math.random() < 0.5) {
    min = Math.ceil(min1);
    max = Math.floor(max1);
  } else {
    min = Math.ceil(min2);
    max = Math.floor(max2);
  }
  return Math.floor(Math.random() * (max - min) + min);
}

var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;

var margin = 0;

var eleW = 256;
var eleH = 134;

var minL1 = margin;
var maxL1 = bodyWidth * 0.5 - eleW;
var minL2 = bodyWidth * 0.5 + eleW;
var maxL2 = bodyWidth - eleW - minL1;

var minT = margin;
var maxT = bodyHeight - eleH - minT;

//----------------------------------------Three----------------------------------------
import { OrthographicCamera } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

//info

let sData = [];

//----------------------------------------sData----------------------------------------

fetch("datasets/sData.json")
  .then((response) => response.json())
  .then((sData) => {
    // Assign a random altitude for each data point
    sData.forEach((d) => {
      d.isHovered = false;
      d.alt = Math.random() * 0.3 + 0.15;
    });

    world
      .customLayerData(sData)
      .customThreeObject(
        (d) =>
          new THREE.Mesh(
            new THREE.SphereGeometry(sRadius),
            new THREE.MeshLambertMaterial({ color: 0x6cff00 })
          )
      )
      .customThreeObjectUpdate((obj, d) => {
        Object.assign(obj.position, world.getCoords(d.lat, d.lng, d.alt));
      });

    (function moveSpheres() {
      sData.forEach((d) => {
        //if (!globalIsHover) {
        if (d.isHovered == false) {
          d.lat += 0.05;
          d.lng += 0.05;
        }
      });
      world.customLayerData(sData);
      requestAnimationFrame(moveSpheres);
    })();
  })
  .catch((error) => console.error("Error loading sData:", error));

const arcsData = [...Array(5).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: [
    ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
  ],
}));

//----------------------------------------gData----------------------------------------

fetch("datasets/gData.json")
  .then((response) => response.json())
  .then((data) => {
    const gData = data;

    const x = 0,
      y = 0;

    const heartShape = new THREE.Shape();
    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    const geometry = new THREE.ShapeGeometry(heartShape);

    const cygeometry = new THREE.ConeGeometry(4.5, 8, 4);
    const material = new THREE.MeshLambertMaterial( {color: 0xff7591} ); 
    const cylinder = new THREE.Mesh( cygeometry, material );
    cylinder.rotation.x = -Math.PI / 2;

    world
      .objectsData(gData)
      .objectThreeObject(cylinder)
      .objectAltitude(0.05);	
  })
  .catch((error) => console.error("Error loading gData:", error));

const elem = document.getElementById("globeViz");
const labelsTopOrientation = new Set(["Apollo 12", "Luna 2"]); // avoid label collisions

//satellite--------------------------------------------------------------------------------
const sRadius = 4;
let a = 0;

//----------------------------------------drag----------------------------------------

function makeDraggable(element) {
  var titleBar = element.getElementsByClassName("title-bar")[0];
  if (titleBar) {
    dragElement(element, titleBar);
  }
}
function dragElement(windowElement, titleBarElement) {
  var posX = 0,
    posY = 0,
    posX2 = 0,
    posY2 = 0;

  titleBarElement.onmousedown = function (e) {
    e = e || window.event;
    e.preventDefault();
    // Get the initial mouse cursor position
    posX2 = e.clientX;
    posY2 = e.clientY;

    document.onmouseup = stopDragging;
    // Call function whenever the cursor moves
    document.onmousemove = elementDrag;
  };

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calculate the new cursor position
    posX = posX2 - e.clientX;
    posY = posY2 - e.clientY;
    posX2 = e.clientX;
    posY2 = e.clientY;
    // Set the element's new position
    windowElement.style.top = windowElement.offsetTop - posY + "px";
    windowElement.style.left = windowElement.offsetLeft - posX + "px";
  }

  function stopDragging() {
    // Stop moving when mouse button is released
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//----------------------------------------globe----------------------------------------
let globalIsHover = false
const world = Globe({ antialias: false, alpha: true })(
  document.getElementById("globeViz")
)

  //arc--------------------------------------------------------------------------------
  .arcsData(arcsData)
  // console.log('arcsDatass:',arcsData)
  .arcColor("color")
  .arcDashLength(() => Math.random())
  .arcDashGap(() => Math.random())
  .arcDashAnimateTime(() => Math.random() * 4000 + 500)

  //globe--------------------------------------------------------------------------------

  .globeImageUrl("assets/earth-blue-marble.png")
  .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
  .atmosphereColor("#ffffff") //85defb
  .atmosphereAltitude(0.3)
  .backgroundColor("rgba(0, 0, 0, 0)")

  .onGlobeClick(({ lat, lng }, event) => {
    // Log the clicked coordinates for debugging
    // console.log(`Clicked coordinates: Latitude: ${lat}, Longitude: ${lng}`);
    // Convert lat, lng to 3D coordinates
    const coords = world.getCoords(lat, lng);
    if (coords && controls) {
      // Create a new THREE.Vector3 instance with the coordinates
      const targetPosition = new THREE.Vector3(coords.x, coords.y, coords.z);
      // Update the target of the orbit controls
      controls.target.copy(targetPosition);
      // Update the camera to look at the new target
      // camera.lookAt(targetPosition);
      // Update controls
      controls.update();
    } else {
      console.error("Failed to get 3D coordinates from clicked globe position");
    }
  })

  //satellite--------------------------------------------------------------------------------

  .customLayerLabel("label")
  .onCustomLayerClick((d) => {
    loadimg();
    const MAP_CENTER = { lat: d.lat, lng: d.lng, altitude: 2.5 };
    world.pointOfView(MAP_CENTER, 500);
    if (a === 0) {
      a = 1;
      appendDivToBody();
      setTimeout(function () {
        a = 0;
      }, 1000);
    }
    function appendDivToBody() {
      popaudio.play();
      //???for unknow reason, d.label == null when hovering sometimes, then Div never pops up when hovering
      if (!d || d.label == null) {
        return;
      }

      var appendedDiv = document.createElement("div");
      appendedDiv.className = "appended-div";

      appendedDiv.innerHTML = `
    <div class="dragdiv window landing" id="" style="width: 250px;">
    <div class="overlay"></div>
    <div class="title-bar">
      <div class="title-bar-text">
      ${d.label}
      </div>
      <div class="title-bar-controls notranslate">
      <button aria-label="Help"  onclick=" window.open('${d.url}','_blank')"></button>
      <button aria-label="Close" onclick="closeWindow(this)"></button>
      </div>
    </div>
    <div class="window-body" id="" style="display:flex;flex-direction: row; gap:10px ;">
    <div>
      <div><b>Syntax</b></div>
      <div><b>Developer</b></div>
      <div><b>Release</b></div>
      <div><b>Community Size</b></div>
    </div>
    <div style="flex-grow: 4">
      <div>${d.Syntax}</div>
      <div>${d.agency}</div>
      <div>${d.date}</div>
      <div>${d.community}</div>
      <div class="meter">
        <span style="width: ${d.size}%"></span>
      </div>
    </div>
    </div>
  </div>      
    `;

      var bodyWidth = document.body.clientWidth - 250;
      var bodyHeight = document.body.clientHeight - 100;
      var randomLeft = Math.floor(Math.random() * bodyWidth);
      var randomTop = Math.floor(Math.random() * bodyHeight);

      appendedDiv.style.left = randomLeft + "px";
      appendedDiv.style.top = randomTop + "px";
      appendedDiv.style.display = "block"; // Explicitly set the display style

      document.body.appendChild(appendedDiv);

      makeDraggable(appendedDiv);

      let firstChild = appendedDiv.firstElementChild;
      // console.log("firstChild: ", firstChild);
      // console.log("appendedDiv: ", appendedDiv);

      setActiveWindow(firstChild);
      // console.log("New Div added and set as active: ", appendedDiv);

      firstChild.onmousedown = function (event) {
        // Check if the event target does not have the class 'test'
        if (!event.target.classList.contains("close")) {
          setActiveWindow(firstChild);
        }
      };
    }
  })
  .onCustomLayerHover((d, prevObj) => {
    if (d) {
      //console.log('d', d)
      //console.log("Hovered object name: " + d.label);
      d.isHovered = true; //where problem is
      globalIsHover = true
    } else {
      //d.isHovered = false
      prevObj.isHovered = false
      //console.log(sData)
      //sData = sData.forEach((data) => data.isHovered = false);
      globalIsHover = false
      console.log("No custom layer object is being hovered over", d);
    }
  })

  // .onCustomLayerHover((obj, prevObj) => {
  //   if (obj) {
  //       console.log("Hovered object name: " + obj.label);
  //   } else if (prevObj) {
  //       console.log("Mouse left object: " + prevObj.label);
  //   }
  // })

  //landmark--------------------------------------------------------------------------------
  .objectLabel("label")
  .onObjectClick((d) => {
    loadimg();
    const MAP_CENTER = { lat: d.lat, lng: d.lng, altitude: 2.5 };
    world.pointOfView(MAP_CENTER, 500);
    if (a === 0) {
      a = 1;
      appendDivToBody();
      setTimeout(function () {
        a = 0;
      }, 1000);
    }
    function appendDivToBody() {
      popaudio.play();
      if (!d || d.label == null) {
        return;
      }

      var appendedDiv = document.createElement("div");
      appendedDiv.className = "appended-div";

      appendedDiv.innerHTML = `
    <div class="dragdiv window landing" id="" style="width: 250px;">
    <div class="overlay"></div>
    <div class="title-bar">
      <div class="title-bar-text">
      ${d.label}
      </div>
      <div class="title-bar-controls notranslate">
      <button aria-label="Help"  onclick=" window.open('${d.url}','_blank')"></button>
      <button class="close" aria-label="Close" onclick="closeWindow(this)"></button>
      </div>
    </div>
    <div class="window-body" id="" style="display:flex;flex-direction: row; gap:10px ;">
    <div>
      <div><b>Syntax</b></div>
      <div><b>Developer</b></div>
      <div><b>Release</b></div>
      <div><b>Community Size</b></div>
    </div>
    <div style="flex-grow: 4">
      <div>${d.Syntax}</div>
      <div>${d.agency}</div>
      <div>${d.date}</div>
      <div>${d.community}</div>
      <div class="meter">
        <span style="width: ${d.size}%"></span>
      </div>
    </div>
    </div>
  </div>      
    `;

      var randomLeft = getRandomInttwoRange(minL1, maxL1, minL2, maxL2);
      var randomTop = getRandomInt(minT, maxT);

      appendedDiv.style.left = randomLeft + "px";
      appendedDiv.style.top = randomTop + "px";
      appendedDiv.style.display = "block"; // Explicitly set the display style

      document.body.appendChild(appendedDiv);
      makeDraggable(appendedDiv);

      let firstChild = appendedDiv.firstElementChild;
      // console.log("firstChild: ", firstChild);
      // console.log("appendedDiv: ", appendedDiv);

      setActiveWindow(firstChild);
      // console.log("New Div added and set as active: ", appendedDiv);

      firstChild.onmousedown = function (event) {
        // Check if the event target does not have the class 'test'
        if (!event.target.classList.contains("close")) {
          setActiveWindow(firstChild);
        }
      };
    }
  });

// custom globe material--------------------------------------------------------------------------------
const globeMaterial = world.globeMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load(
  "//unpkg.com/three-globe/example/img/earth-water.png",
  (texture) => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color("grey");
    globeMaterial.shininess = 15;
  }
);

setTimeout(() => {
  // wait for scene to be populated (asynchronously)
  const directionalLight = world
    .scene()
    .children.find((obj3d) => obj3d.type === "DirectionalLight");
  directionalLight && directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect
});

const scene = world.scene();

//camera settings--------------------------------------------------------------------------------
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
const frustumSize = 300;

//uncomment line 177 and 178 to use orthographic camera
// //problem: all mouse over/click events stop working properly, the globe is not responsive, tooltips doesn't show up sometimes(probabily because of camera frustum near and far plane.)
// const camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000);
// world.camera(camera);

const camera = world.camera();

// const controls = new OrbitControls( camera, world.renderer().domElement );
// world.controls(controls);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 1);
world.lights([ambientLight, directionalLight]);

// const targetObject = new THREE.Object3D();
// scene.add(targetObject);
// directionalLight.target = targetObject;

window.addEventListener("resize", onWindowResize);

// create a new instance of the filter. Each type of filter has different parameters you need to define
const renderPixelatedPass = new RenderPixelatedPass(6, scene, camera);
// const outlinePass= new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);

// apply the filter to the rendering queue
world.postProcessingComposer().addPass(renderPixelatedPass);

//window resize--------------------------------------------------------------------------------

window.addEventListener("resize", (event) => {
  world.width([event.target.innerWidth]);
  world.height([event.target.innerHeight]);
});

function onWindowResize() {
  SCREEN_WIDTH = window.innerWidth;
  SCREEN_HEIGHT = window.innerHeight;
  aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

  camera.left = (-frustumSize * aspect) / 2;
  camera.right = (frustumSize * aspect) / 2;
  camera.top = frustumSize / 2;
  camera.bottom = -frustumSize / 2;
  camera.updateProjectionMatrix();
}

//orbit--------------------------------------------------------------------------------
const satelliteLayer = new THREE.Group();
const satelliteGeometry = new THREE.TorusGeometry(130, 0.8, 16, 100);
const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const satelliteMesh = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
satelliteMesh.position.set(0, 0, 0); // Position the satellite
satelliteMesh.rotation.x = Math.PI / 1.7;

// const satelliteGeometryout = new THREE.RingGeometry(99, 150, 32);
// const satelliteMeshOut = new THREE.Mesh(satelliteGeometryout, satelliteMaterial);
// satelliteMeshOut.position.set(0, 0, 0);
// satelliteMeshOut.rotation.x = Math.PI / 1.8;
// satelliteLayer.add(satelliteMeshOut);

satelliteLayer.add(satelliteMesh); // Add to the satellite layer
scene.add(satelliteLayer);

//----------------------------------------bg----------------------------------------

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);

const imageUrls = [

  "assets/bg/5.gif",
  "assets/bg/b10.pn",
  "assets/bg/2.jpg",
  "assets/bg/11.jpg",
  "assets/bg/b1.png",
  "assets/bg/b7.jpg",
  "assets/bg/3.gif",
  "assets/bg/b32.jpg",
  "assets/bg/b11.png",
  "assets/bg/5.jpg",
  "assets/bg/10.gif",
  "assets/bg/b8.jpg",
  "assets/bg/b12.jpg",
  "assets/bg/1.gif",
  "assets/bg/b10.jpg",
  "assets/bg/b17.jpg",
  "assets/bg/b13.webp",
];
let currentImageIndex = 0;

let img; // Declare img here for broader scope
let tilesX = 100;
let tilesY = tilesX / 2;
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
    img.pattern.setTransform(matrix.rotate(0).scale(1));
    coloredTiles = []; // Reset colored tiles for new image
    requestAnimationFrame(drawpix); // Start the drawpix loop
  };
  img.src = imageUrls[currentImageIndex];
}

loadimg();

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
