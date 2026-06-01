const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const turtle = document.getElementById("turtle");
const virusLayer = document.getElementById("virusLayer");
const attentionField = document.getElementById("attentionField");
const collapseQuiet = document.getElementById("collapseQuiet");
const farPulse = document.getElementById("farPulse");
const loader = document.getElementById("loader");
const loaderScene = document.getElementById("loaderScene");
const signalNode = document.getElementById("signalNode");
const outerSymbol = document.getElementById("outerSymbol");
const innerSymbol = document.getElementById("innerSymbol");
const maze = document.getElementById("maze");
const home = document.getElementById("home");
const idleMaze = document.getElementById("idleMaze");

let progress = 0;
let state = "normal";
let completed = false;

let noticed = false;
let hidden = false;
let attentionStarted = false;
let populationStarted = false;
let turnStarted = false;
let convergenceStarted = false;
let sicknessStarted = false;
let frankStarted = false;
let collapseStarted = false;

const attentionItems = [];

const target = {
  x: 54,
  y: 45
};

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

  /* 17% — Little Homie senses attention shifting */
  if(progress >= 17 && !noticed){

    noticed = true;

    state = "notice";

    turtle.classList.remove("walk");
    turtle.classList.add("notice");

    loader.classList.add("offcourse");

    startAttentionMachine();

  }

  /* 19% — fear takes over, shell shiver */
  if(progress >= 19 && !hidden){

    hidden = true;

    state = "hide";

    turtle.classList.remove("notice");
    turtle.classList.add("hide");

  }

  /* 22% — familiar modern-life icons begin gathering */
  if(progress >= 22 && !attentionStarted){

    attentionStarted = true;

    seedFamiliarIcons();

  }

  /* 35% — corporate frozen faces join the field */
  if(progress >= 35 && !populationStarted){

    populationStarted = true;

    populateAvatars();

  }

  /* 50% — money shot: every avatar turns */
  if(progress >= 50 && !turnStarted){

    turnStarted = true;

    turnAvatars();

  }

  /* 56% — machine identifies the target and begins routing attention */
  if(progress >= 56 && !convergenceStarted){

    convergenceStarted = true;

    beginConvergence();

  }

  /* 77% — meaning loss: red hearts go gray */
  if(progress >= 77 && !sicknessStarted){

    sicknessStarted = true;

    startSickness();

  }

  /* 88% — Placeholder 1358 notices for half a breath */
  if(progress >= 88 && !frankStarted){

    frankStarted = true;

    runPlaceholder1358();

  }

  /* 94% — the machine eats itself */
  if(progress >= 94 && !collapseStarted){

    collapseStarted = true;

    collapseMachine();

  }

  if(progress >= 100 && !completed){

    completed = true;

    progress = 100;

    clearInterval(loading);

    completeSequence();

  }

  setProgress(progress);

}, 45);

/* ATTENTION MACHINE */

function startAttentionMachine(){

  virusLayer.classList.add("active");
  virusLayer.style.visibility = "visible";
  virusLayer.style.opacity = "1";

  virusLayer.style.setProperty("--target-x", `${target.x}%`);
  virusLayer.style.setProperty("--target-y", `${target.y}%`);

}

function seedFamiliarIcons(){

  const seeds = [
    { kind:"heart", symbol:"♥", x:18, y:22, s:28, d:0 },
    { kind:"like", symbol:"👍", x:76, y:19, s:25, d:.25 },
    { kind:"bell", symbol:"🔔", x:15, y:61, s:25, d:.48 },
    { kind:"check", symbol:"✓", x:79, y:64, s:27, d:.74 },
    { kind:"trend", symbol:"↗", x:61, y:15, s:26, d:1.0 },
    { kind:"heart", symbol:"♥", x:36, y:72, s:22, d:1.28 },
    { kind:"check", symbol:"✓", x:41, y:20, s:23, d:1.52 },
    { kind:"bell", symbol:"🔔", x:64, y:72, s:22, d:1.74 }
  ];

  seeds.forEach(item => createAttentionItem(item));

  setTimeout(() => {
    addIconWave(13, 0);
  }, 1500);

  setTimeout(() => {
    addIconWave(18, 0);
  }, 3400);

}

function addIconWave(amount, baseDelay){

  const symbols = [
    { kind:"heart", symbol:"♥" },
    { kind:"like", symbol:"👍" },
    { kind:"bell", symbol:"🔔" },
    { kind:"check", symbol:"✓" },
    { kind:"trend", symbol:"↗" },
    { kind:"dot", symbol:"●" }
  ];

  for(let i = 0; i < amount; i++){

    const picked = symbols[i % symbols.length];

    createAttentionItem({
      kind:picked.kind,
      symbol:picked.symbol,
      x:8 + ((i * 17) % 84),
      y:9 + ((i * 23) % 78),
      s:18 + ((i * 5) % 16),
      d:baseDelay + (i * .13)
    });

  }

}

function populateAvatars(){

  const avatarPositions = [
    [11,14], [31,10], [52,11], [72,13], [90,24],
    [8,36], [25,33], [44,31], [64,34], [82,39],
    [15,55], [35,52], [56,55], [76,58], [91,69],
    [20,78], [43,74], [66,79], [84,82]
  ];

  avatarPositions.forEach((pos, index) => {

    createAttentionItem({
      kind:"avatar",
      symbol:"",
      x:pos[0],
      y:pos[1],
      s:30 + ((index % 4) * 4),
      d:index * .12
    });

  });

}

function createAttentionItem(config){

  if(!attentionField) return null;

  const item = document.createElement("div");

  item.className = `attention-item ${config.kind}`;

  if(config.kind !== "avatar"){
    item.classList.add("social", "drift");
  }

  item.textContent = config.symbol || "";

  const dx = ((config.x % 2 === 0) ? 1 : -1) * (6 + (config.x % 12));
  const dy = ((config.y % 2 === 0) ? -1 : 1) * (5 + (config.y % 9));

  item.style.setProperty("--x", `${config.x}%`);
  item.style.setProperty("--y", `${config.y}%`);
  item.style.setProperty("--s", `${config.s}px`);
  item.style.setProperty("--delay", `${config.d || 0}s`);
  item.style.setProperty("--dx", `${dx}px`);
  item.style.setProperty("--dy", `${dy}px`);
  item.style.setProperty("--op", String(config.kind === "avatar" ? .78 : .84));

  attentionField.appendChild(item);

  attentionItems.push(item);

  return item;

}

function turnAvatars(){

  const avatars = attentionItems.filter(item => item.classList.contains("avatar"));

  avatars.forEach((avatar, index) => {

    setTimeout(() => {
      avatar.classList.add("turn");
    }, index * 45);

  });

}

function beginConvergence(){

  virusLayer.classList.add("converge");

  attentionItems.forEach((item, index) => {

    const offsetX = ((index % 7) - 3) * 3.5;
    const offsetY = ((index % 5) - 2) * 3.2;

    item.style.setProperty("--tx", `${target.x + offsetX}%`);
    item.style.setProperty("--ty", `${target.y + offsetY}%`);

    setTimeout(() => {
      item.classList.add("to-target");
    }, index * 55);

  });

}

function startSickness(){

  const hearts = attentionItems.filter(item => item.classList.contains("heart"));
  const avatars = attentionItems.filter(item => item.classList.contains("avatar"));
  const checks = attentionItems.filter(item => item.classList.contains("check"));
  const bells = attentionItems.filter(item => item.classList.contains("bell"));

  hearts.forEach((heart, index) => {

    setTimeout(() => {
      heart.textContent = "♥";
      heart.classList.add("gray");
    }, index * 360);

  });

  [...avatars.slice(2, 8), ...checks.slice(0, 4), ...bells.slice(0, 3)].forEach((item, index) => {

    setTimeout(() => {
      item.classList.add("sick");
    }, 650 + (index * 210));

  });

}

function runPlaceholder1358(){

  const candidate = createAttentionItem({
    kind:"avatar",
    symbol:"",
    x:33,
    y:49,
    s:36,
    d:0
  });

  if(!candidate) return;

  candidate.style.zIndex = "12";

  setTimeout(() => {
    candidate.className = "attention-item placeholder-1358";
    candidate.textContent = "PLACEHOLDER 1358";
  }, 520);

  setTimeout(() => {
    candidate.classList.add("lookdown");
  }, 1050);

  setTimeout(() => {
    candidate.classList.remove("lookdown");
    candidate.classList.add("lookup");
  }, 1500);

  setTimeout(() => {
    candidate.classList.add("consume");
  }, 1950);

}

function collapseMachine(){

  const shuffled = [...attentionItems].sort(() => Math.random() - .5);

  shuffled.forEach((item, index) => {

    setTimeout(() => {
      item.classList.add("consume");
    }, index * 34);

  });

  setTimeout(() => {
    collapseQuiet.classList.add("active");
  }, 1250);

}

/* 100% — NOT VICTORY, DISCOVERY */

function completeSequence(){

  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  setTimeout(() => {
    farPulse.classList.add("active");
  }, 250);

  setTimeout(() => {
    signalNode.classList.add("ready");
    beginSignalReveal();
  }, 1750);

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 2700);

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

function beginSignalReveal(){

  virusLayer.classList.add("clear");

  setTimeout(() => {

    attentionField.innerHTML = "";
    attentionItems.length = 0;

    virusLayer.classList.remove("active", "clear", "converge");
    collapseQuiet.classList.remove("active");
    farPulse.classList.remove("active");

    virusLayer.style.visibility = "hidden";
    virusLayer.style.opacity = "0";

  }, 3300);

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
