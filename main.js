const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const turtle = document.getElementById("turtle");
const virusLayer = document.getElementById("virusLayer");
const loader = document.getElementById("loader");
const loaderScene = document.getElementById("loaderScene");
const signalNode = document.getElementById("signalNode");
const outerSymbol = document.getElementById("outerSymbol");
const innerSymbol = document.getElementById("innerSymbol");
const maze = document.getElementById("maze");
const home = document.getElementById("home");
const idleMaze = document.getElementById("idleMaze");
const authCascade = document.getElementById("authCascade");
const authWarning = document.getElementById("authWarning");

let progress = 0;
let state = "normal";
let completed = false;

let noticed = false;
let hidden = false;
let breached = false;
let cascadeStarted = false;

let spamTimer = null;
let spamCount = 0;

function setProgress(value){

  progress = Math.max(0, Math.min(100, value));

  fill.style.width =
    progress <= 0
      ? "0%"
      : `calc(${progress}% - 12px)`;

  percent.textContent = `${Math.round(progress)}%`;

}

/* MAIN LOADING LOOP — LOADING BAR IS THE TIMELINE */

const loading = setInterval(() => {

  if(state === "normal"){
    progress += .16;
  }

  if(state === "notice"){
    progress += .035;
  }

  if(state === "hide"){
    progress += .25;
  }

  /* 17% — Little Homie senses something */
  if(progress >= 17 && !noticed){

    noticed = true;

    state = "notice";

    turtle.classList.remove("walk");
    turtle.classList.add("notice");

    loader.classList.add("offcourse");

  }

  /* 21% — fear takes over, shell shiver */
  if(progress >= 19 && !hidden){

    hidden = true;

    state = "hide";

    turtle.classList.remove("notice");
    turtle.classList.add("hide");

  }

  /* 22% — outside-world virus breach */
  if(progress >= 22 && !breached){

    breached = true;

    virusLayer.classList.add("active");

    startRedSpam();

  }

  /* Green cascade is separate, after the red breach has started burying the scan */
  if(progress >= 31 && !cascadeStarted){

    cascadeStarted = true;

    runAuthCascade();

  }

  if(progress >= 100 && !completed){

    completed = true;

    progress = 100;

    clearInterval(loading);

    completeSequence();

  }

  setProgress(progress);

}, 45);

/* 100% — SYMBOL SAVES HIM */

function completeSequence(){

  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  setTimeout(() => {
    signalNode.classList.add("ready");
    beginSignalCleanse();
  }, 500);

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 2400);

  setTimeout(() => {
    loaderScene.classList.add("portal-open");
  }, 3450);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 4100);

  setTimeout(() => {
    loaderScene.classList.add("portal-close");
  }, 9350);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 9600);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 10500);

}

/* RED SPAM — OUTSIDE WORLD ATTACK */

function startRedSpam(){

  if(spamTimer) return;

  addSpamBurst(8, 105);

  spamTimer = setInterval(() => {

    if(completed){

      clearInterval(spamTimer);

      spamTimer = null;

      return;

    }

    addSpamWindow();

    if(spamCount % 5 === 0){

      setTimeout(addSpamWindow, 170);

    }

  }, 560);

}

function addSpamBurst(amount, gap){

  for(let i = 0; i < amount; i++){

    setTimeout(() => {

      addSpamWindow();

    }, i * gap);

  }

}

function addSpamWindow(){

  const labels = [
    ["AUTH", "external meaning rejected"],
    ["SIGNAL", "human packet resisting"],
    ["MASK", "forced identity loop"],
    ["FEED", "compression overload"],
    ["SOURCE", "private signal detected"],
    ["ERROR", "synthetic pressure rising"],
    ["ALERT", "carrier instability"],
    ["STACK", "emotional suppression"],
    ["DEVICE", "override attempt"],
    ["INPUT", "meaning compression"]
  ];

  const positions = [
    [4, 10],
    [50, 9],
    [13, 20],
    [58, 23],
    [2, 34],
    [38, 37],
    [65, 45],
    [10, 54],
    [34, 61],
    [58, 66],
    [20, 74],
    [68, 78],
    [-6, 44],
    [72, 32]
  ];

  const item = labels[spamCount % labels.length];

  const pos = positions[spamCount % positions.length];

  const box = document.createElement("div");

  box.className = "pop extra-pop";

  box.setAttribute("data-title", item[0]);

  box.innerHTML = `
    <p><strong>${item[0]} INTERRUPT</strong></p>
    <p>${item[1]}</p>
    <em>signal contaminated</em>
  `;

  box.style.left = `${pos[0]}%`;
  box.style.top = `${pos[1]}%`;
  box.style.width = `${220 + ((spamCount % 3) * 34)}px`;
  box.style.zIndex = String(5 + (spamCount % 7));

  virusLayer.appendChild(box);

  spamCount++;

}

/* GREEN CASCADE — SLOW FILE-COPY VIRUS */

function runAuthCascade(){

  if(!authCascade) return;

  authCascade.innerHTML = "";

  authCascade.classList.add("active");

  if(authWarning){
    authWarning.classList.remove("active");
  }

  const total = 13;

  for(let i = 0; i < total; i++){

    const win = document.createElement("div");

    win.className = "cascade-window";

    const x = -9 + (i * 5.6);
    const y = 3 + (i * 5.9);

    win.style.left = `${x}%`;
    win.style.top = `${y}%`;

    win.style.animationDelay = `${i * .92}s`;

    authCascade.appendChild(win);

  }

  setTimeout(() => {

    if(authWarning){
      authWarning.classList.add("active");
    }

  }, 4300);

}

/* SYMBOL CLEANSE — VIRUS DIES UNDER SIGNAL PRESSURE */

function beginSignalCleanse(){

  stopSpamCreation();

  virusLayer.classList.add("clear");

  const redWindows =
    Array.from(virusLayer.querySelectorAll(".pop"));

  const greenWindows =
    Array.from(authCascade.querySelectorAll(".cascade-window"));

  redWindows.reverse().forEach((box, index) => {

    setTimeout(() => {

      fadeVirusBox(box);

    }, index * 90);

  });

  greenWindows.forEach((box, index) => {

    setTimeout(() => {

      fadeVirusBox(box);

    }, 650 + (index * 115));

  });

  setTimeout(() => {

    authCascade.classList.remove("active");
    authCascade.innerHTML = "";

    virusLayer.classList.remove("active");
    virusLayer.classList.remove("clear");
    virusLayer.style.visibility = "hidden";
    virusLayer.style.opacity = "0";

  }, 3300);

}

function stopSpamCreation(){

  if(spamTimer){

    clearInterval(spamTimer);

    spamTimer = null;

  }

}

function fadeVirusBox(box){

  if(!box) return;

  box.style.transition =
    "opacity .55s ease, transform .55s ease, filter .55s ease";

  box.style.opacity = "0";

  box.style.transform =
    "translateY(12px) scale(.96)";

  box.style.filter = "blur(3px)";

}

/* OPEN CHANNEL */

function openChannel(){

  if(!signalNode.classList.contains("ready")) return;

  signalNode.style.pointerEvents = "none";

  outerSymbol.classList.add("dissolve");

  innerSymbol.classList.add("alive");

  maze.classList.remove("active");

  void maze.offsetWidth;

  maze.classList.add("active");

  setTimeout(() => {

    signalNode.classList.add("fade-out");

  }, 4700);

  setTimeout(() => {

    home.classList.add("open");

    idleMaze.classList.add("active");

  }, 5600);

}

signalNode.addEventListener("click", openChannel);

signalNode.addEventListener("touchend", event => {

  event.preventDefault();

  openChannel();

}, { passive:false });
