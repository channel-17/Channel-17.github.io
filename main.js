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

function setProgress(value){
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `calc(${progress}% - 12px)`;
  percent.textContent = `${Math.round(progress)}%`;
}

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

  if(progress >= 100 && !completed){
    completed = true;
    progress = 100;
    clearInterval(loading);
    completeSequence();
  }

  setProgress(progress);
}, 45);

/* STEP 1: Homie senses it earlier and holds the pause longer */
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

setTimeout(() => {
  if(completed) return;

  virusLayer.classList.add("active");
}, 8300);

function completeSequence(){
  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  setTimeout(() => {
    virusLayer.classList.add("clear");
    runAuthCascade();
  }, 50);

  setTimeout(() => {
    signalNode.classList.add("ready");
  }, 1100);

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 1650);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 2900);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 6900);
}

function runAuthCascade(){
  if(!authCascade) return;

  authCascade.innerHTML = "";
  authCascade.classList.add("active");

  if(authWarning){
    authWarning.classList.remove("active");
  }

  const total = 14;

  for(let i = 0; i < total; i++){
    const win = document.createElement("div");

    win.className = "cascade-window";

    const x = -10 + (i * 6);
    const y = 5 + (i * 4.4);

    win.style.left = `${x}%`;
    win.style.top = `${y}%`;
    win.style.animationDelay = `${i * .42}s`;

    authCascade.appendChild(win);
  }

  setTimeout(() => {
    if(authWarning){
      authWarning.classList.add("active");
    }
  }, 2200);

  setTimeout(() => {
    authCascade.classList.remove("active");
    authCascade.innerHTML = "";
  }, 9200);
}

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
