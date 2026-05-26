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
let spamCount = 0;
let cascadeStarted = false;

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

  /*
    VIRUS RHYTHM:
    The scan belongs to turtle/symbol.
    The virus is outside pressure invading around 13%.
  */
  if(progress >= 13 && !virusLayer.classList.contains("active")){
    virusLayer.classList.add("active");
    startRedSpam();
  }

  /*
    Green cascade is separate from red spam.
    It starts after red spam has begun to bury the scan.
  */
  if(progress >= 24 && !cascadeStarted){
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

/* TURTLE STORY — LOCKED ORDER */

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

  /*
    At 100%, the signal starts winning.
    Viruses die progressively, not instantly.
  */
  setTimeout(() => {
    signalNode.classList.add("ready");
    beginSignalCleanse();
  }, 450);

  /*
    Little Homie peeks after the symbol has started clearing the room.
  */
  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 1750);

  /*
    He escapes after surviving, not before.
  */
  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 3300);

  /*
    Loader scene fades after turtle has committed to leaving.
  */
  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 5600);
}

/* RED SPAM — STICKY OUTSIDE WORLD */

function startRedSpam(){
  if(spamTimer) return;

  /*
    Initial hit: fast enough to feel invasive,
    not so much that it becomes wallpaper instantly.
  */
  addSpamBurst(7, 120);

  /*
    Continues spamming while loading continues.
    The rhythm is uneven on purpose.
  */
  spamTimer = setInterval(() => {
    if(completed){
      clearInterval(spamTimer);
      spamTimer = null;
      return;
    }

    addSpamWindow();

    if(spamCount % 4 === 0){
      setTimeout(addSpamWindow, 160);
    }

  }, 520);
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

  const item = labels[spamCount % labels.length];

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

/* GREEN CASCADE — SLOW COPY/REPLICATION DOWN SCREEN */

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

    /*
      Top-left to bottom-right.
      Slow enough to read as one file copying to the next.
    */
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

/* SYMBOL CLEANSE — SIGNAL WINS, VIRUS DIES */

function beginSignalCleanse(){
  stopSpamCreation();

  virusLayer.classList.add("clear");

  const redWindows =
    Array.from(virusLayer.querySelectorAll(".pop"));

  const greenWindows =
    Array.from(authCascade.querySelectorAll(".cascade-window"));

  /*
    Red spam dies from newest to oldest so the room feels like
    it is losing power under the symbol.
  */
  redWindows.reverse().forEach((box, index) => {
    setTimeout(() => {
      fadeVirusBox(box);
    }, index * 90);
  });

  /*
    Green cascade dies after red begins fading, one by one.
  */
  greenWindows.forEach((box, index) => {
    setTimeout(() => {
      fadeVirusBox(box);
    }, 650 + (index * 115));
  });

  /*
    Final cleanup before symbol is fully dominant.
  */
  setTimeout(() => {
    authCascade.classList.remove("active");
    authCascade.innerHTML = "";

    virusLayer.classList.remove("active");
    virusLayer.style.visibility = "hidden";
    virusLayer.style.opacity = "0";
  }, 3150);
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
  box.style.transform = "translateY(12px) scale(.96)";
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
