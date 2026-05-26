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

let spamTimer = null;
let extraSpamCount = 0;

function setProgress(value){

  progress = Math.max(0, Math.min(100, value));

  fill.style.width =
    progress <= 0
      ? "0%"
      : `calc(${progress}% - 12px)`;

  percent.textContent = `${Math.round(progress)}%`;

}

/* MAIN LOADING LOOP */

const loading = setInterval(() => {

  if(state === "normal"){
    progress += .16;
  }

  if(state === "notice"){
    progress += .038;
  }

  if(state === "hide"){
    progress += .26;
  }

  /* red spam starts around 13% */
  if(progress >= 13 && !virusLayer.classList.contains("active")){
    virusLayer.classList.add("active");
    startRedSpam();
  }

  if(progress >= 100 && !completed){

    completed = true;
    progress = 100;

    clearInterval(loading);

    completeSequence();

  }

  setProgress(progress);

}, 45);

/* TURTLE STORY — DO NOT CHANGE ORDER */

setTimeout(() => {

  if(completed) return;

  state = "notice";

  turtle.classList.remove("walk");
  turtle.classList.add("notice");

  loader.classList.add("offcourse");

}, 3200);

setTimeout(() => {

  if(completed) return;

  state = "hide";

  turtle.classList.remove("notice");
  turtle.classList.add("hide");

}, 7600);

/* 100% — SYMBOL SAVES HIM */

function completeSequence(){

  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  /* green cascade begins as separate sequence */
  setTimeout(() => {

    runAuthCascade();

  }, 180);

  /* symbol starts breaking through sooner */
  setTimeout(() => {

    signalNode.classList.add("ready");

    killVirusesOneByOne();

  }, 850);

  /* turtle peeks only AFTER symbol starts saving him */
  setTimeout(() => {

    turtle.classList.remove("hide");
    turtle.classList.add("peek");

  }, 1850);

  /* turtle escapes after surviving */
  setTimeout(() => {

    turtle.classList.remove("peek");
    turtle.classList.add("escape");

  }, 3100);

  /* loader area leaves after survival beat */
  setTimeout(() => {

    loaderScene.classList.add("fade-out");

  }, 5200);

}

/* RED SPAM — WORLD ATTACK */

function startRedSpam(){

  if(spamTimer) return;

  addSpamBurst();

  spamTimer = setInterval(() => {

    if(completed){
      clearInterval(spamTimer);
      spamTimer = null;
      return;
    }

    addSpamWindow();

  }, 380);

}

function addSpamBurst(){

  for(let i = 0; i < 8; i++){

    setTimeout(() => {

      addSpamWindow();

    }, i * 95);

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

  const item =
    labels[extraSpamCount % labels.length];

  const box = document.createElement("div");

  box.className = "pop extra-pop";

  box.setAttribute("data-title", item[0]);

  box.innerHTML = `
    <p><strong>${item[0]} INTERRUPT</strong></p>
    <p>${item[1]}</p>
    <em>signal contaminated</em>
  `;

  const position = extraSpamCount % 12;

  const positions = [
    [4, 10],
    [52, 11],
    [16, 22],
    [62, 26],
    [2, 37],
    [45, 40],
    [68, 48],
    [10, 55],
    [36, 62],
    [58, 67],
    [22, 75],
    [70, 78]
  ];

  box.style.left = `${positions[position][0]}%`;
  box.style.top = `${positions[position][1]}%`;
  box.style.width = `${220 + ((extraSpamCount % 3) * 34)}px`;

  virusLayer.appendChild(box);

  extraSpamCount++;

}

/* GREEN CASCADE — ONE FILE COPYING DOWN SCREEN */

function runAuthCascade(){

  authCascade.innerHTML = "";

  authCascade.classList.add("active");

  authWarning.classList.remove("active");

  const total = 16;

  for(let i = 0; i < total; i++){

    const win = document.createElement("div");

    win.className = "cascade-window";

    const x = -8 + (i * 4.8);
    const y = 2 + (i * 5.2);

    win.style.left = `${x}%`;
    win.style.top = `${y}%`;

    /* slow file-copy countdown */
    win.style.animationDelay = `${i * .72}s`;

    authCascade.appendChild(win);

  }

  setTimeout(() => {

    authWarning.classList.add("active");

  }, 3800);

  setTimeout(() => {

    authCascade.classList.remove("active");
    authCascade.innerHTML = "";

  }, 13500);

}

/* SYMBOL CLEANSE — VIRUSES DIE ONE BY ONE */

function killVirusesOneByOne(){

  virusLayer.classList.add("clear");

  const allVirusWindows =
    Array.from(virusLayer.querySelectorAll(".pop"));

  allVirusWindows.forEach((box, index) => {

    setTimeout(() => {

      box.style.transition =
        "opacity .55s ease, transform .55s ease, filter .55s ease";

      box.style.opacity = "0";

      box.style.transform =
        "translateY(12px) scale(.96)";

      box.style.filter = "blur(3px)";

    }, index * 115);

  });

  setTimeout(() => {

    virusLayer.classList.remove("active");

    virusLayer.style.visibility = "hidden";
    virusLayer.style.opacity = "0";

  }, Math.min(3200, allVirusWindows.length * 115 + 800));

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
