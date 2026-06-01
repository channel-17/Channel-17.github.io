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

const attentionFeed = document.getElementById("attentionFeed");
const avatarField = document.getElementById("avatarField");
const smotherField = document.getElementById("smotherField");
const frankZone = document.getElementById("frankZone");

let progress = 0;
let state = "normal";
let completed = false;

let noticed = false;
let hidden = false;
let virusStarted = false;
let avatarsStarted = false;
let smotherStarted = false;
let symbolAttackStarted = false;
let frankStarted = false;
let panicStarted = false;

let reactionTimer = null;
let avatarTimer = null;
let attackTimer = null;
let swarmTimer = null;

let avatarCount = 0;
let reactionCount = 0;
let attackCount = 0;

const names = [
  "Sue W", "Mike J", "Terry P", "Donna R", "Kevin M", "Jules V",
  "Mara K", "Ron T", "Lisa B", "Carl N", "Amy S", "Drew C",
  "Nina Q", "Paul E", "Kim L", "Ben H", "Rita D", "Sam G"
];

const deploySpots = [
  [18, 20], [42, 17], [70, 19], [12, 34], [35, 33], [62, 34], [84, 36],
  [20, 49], [48, 48], [76, 51], [8, 64], [30, 66], [55, 64], [82, 67],
  [16, 79], [42, 80], [68, 78], [91, 82]
];

function setProgress(value){
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `calc(${progress}% - 12px)`;
  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if(state === "normal") progress += .16;
  if(state === "notice") progress += .035;
  if(state === "hide") progress += .22;

  if(progress >= 17 && !noticed){
    noticed = true;
    state = "notice";
    turtle.classList.remove("walk");
    turtle.classList.add("notice");
    loader.classList.add("offcourse");
  }

  if(progress >= 19 && !hidden){
    hidden = true;
    state = "hide";
    turtle.classList.remove("notice");
    turtle.classList.add("hide");
  }

  if(progress >= 21 && !virusStarted){
    virusStarted = true;
    virusLayer.classList.add("active");
    startRightSideEngagement();
  }

  if(progress >= 29 && !avatarsStarted){
    avatarsStarted = true;
    deploySystemAvatars();
  }

  if(progress >= 46 && !smotherStarted){
    smotherStarted = true;
    smotherTheScreen();
  }

  if(progress >= 64 && !symbolAttackStarted){
    symbolAttackStarted = true;
    signalNode.classList.add("breaching");
    beginSymbolAttack();
  }

  if(progress >= 75 && !frankStarted){
    frankStarted = true;
    frankMoment();
  }

  if(progress >= 88 && !panicStarted){
    panicStarted = true;
    virusLayer.classList.add("panic");
    finalSwarm();
  }

  if(progress >= 100 && !completed){
    completed = true;
    progress = 100;
    clearInterval(loading);
    completeSequence();
  }

  setProgress(progress);
}, 45);

function startRightSideEngagement(){
  addReactionBurst(9, false, 120);
  reactionTimer = setInterval(() => {
    if(completed) return;
    addReaction(false);
    if(reactionCount % 4 === 0) setTimeout(() => addReaction(false), 90);
  }, 420);
}

function addReactionBurst(amount, attacking, gap){
  for(let i = 0; i < amount; i++){
    setTimeout(() => addReaction(attacking), i * gap);
  }
}

function addReaction(attacking){
  if(!attentionFeed) return;

  const symbols = attacking ? ["❤️", "👍", "🔔", "✔", "?", "🩶"] : ["❤️", "❤️", "👍", "🔔", "✔"];
  const item = document.createElement("div");
  const symbol = symbols[reactionCount % symbols.length];

  item.className = "reaction";
  if(reactionCount % 5 === 0) item.classList.add("big");
  if(reactionCount % 3 === 0) item.classList.add("small");

  item.textContent = symbol;
  item.style.right = `${3 + Math.random() * 22}%`;
  item.style.bottom = `${-8 + Math.random() * 8}%`;
  item.style.setProperty("--drift", `${-70 + Math.random() * 95}px`);
  item.style.setProperty("--dur", `${3.2 + Math.random() * 2.7}s`);

  if(attacking){
    item.classList.add("attack");
    if(symbol === "🩶" || symbol === "?" || reactionCount % 2 === 0) item.classList.add("gray");
    item.style.left = `${60 + Math.random() * 34}%`;
    item.style.top = `${18 + Math.random() * 72}%`;
    item.style.right = "auto";
    item.style.bottom = "auto";
    item.style.setProperty("--tx", `${-18 - Math.random() * 34}vw`);
    item.style.setProperty("--ty", `${-8 - Math.random() * 34}vh`);
    item.style.setProperty("--dur", `${1.7 + Math.random() * 1.35}s`);
  }

  attentionFeed.appendChild(item);
  reactionCount++;

  setTimeout(() => item.remove(), attacking ? 3600 : 6500);
}

function deploySystemAvatars(){
  addAvatarWave(7, 115);

  avatarTimer = setInterval(() => {
    if(completed) return;
    addAvatar();
    if(avatarCount > 32){
      clearInterval(avatarTimer);
      avatarTimer = null;
    }
  }, 310);
}

function addAvatarWave(amount, gap){
  for(let i = 0; i < amount; i++){
    setTimeout(addAvatar, i * gap);
  }
}

function makeAvatar(name, x, y, frank = false){
  const avatar = document.createElement("div");
  avatar.className = frank ? "avatar frank deploy" : "avatar deploy";
  avatar.style.setProperty("--x", `${x}%`);
  avatar.style.setProperty("--y", `${y}%`);

  avatar.innerHTML = `
    <div class="bubble"><div class="face"></div></div>
    <div class="body"></div>
    <div class="name">${name}</div>
  `;

  return avatar;
}

function addAvatar(){
  if(!avatarField) return;

  const spot = deploySpots[avatarCount % deploySpots.length];
  const jitterX = (Math.random() * 8) - 4;
  const jitterY = (Math.random() * 6) - 3;
  const name = names[avatarCount % names.length];

  const avatar = makeAvatar(name, spot[0] + jitterX, spot[1] + jitterY);
  avatarField.appendChild(avatar);

  const convertToStock = 700 + Math.random() * 1200;
  const convertToPlaceholder = convertToStock + 800 + Math.random() * 1400;

  setTimeout(() => avatar.classList.add("stock"), convertToStock);
  setTimeout(() => avatar.classList.add("placeholder"), convertToPlaceholder);

  avatarCount++;
}

function smotherTheScreen(){
  const total = 38;

  for(let i = 0; i < total; i++){
    setTimeout(() => {
      const dot = document.createElement("div");
      dot.className = "smother-dot";
      dot.style.left = `${-4 + Math.random() * 108}%`;
      dot.style.top = `${5 + Math.random() * 88}%`;
      dot.style.transform = `scale(${.7 + Math.random() * .85})`;
      smotherField.appendChild(dot);
    }, i * 55);
  }
}

function beginSymbolAttack(){
  addReactionBurst(12, true, 65);
  rushExistingAvatars();

  attackTimer = setInterval(() => {
    if(completed) return;
    addReaction(true);
    if(attackCount % 2 === 0) rushOneFreshAvatar();
    attackCount++;
  }, 260);
}

function rushExistingAvatars(){
  const avatars = Array.from(avatarField.querySelectorAll(".avatar"));

  avatars.forEach((avatar, index) => {
    setTimeout(() => rushAvatar(avatar), index * 70);
  });
}

function rushAvatar(avatar){
  if(!avatar || avatar.classList.contains("rush")) return;

  avatar.classList.add("turn");

  const rect = avatar.getBoundingClientRect();
  const targetX = window.innerWidth * .5;
  const targetY = window.innerHeight * .31;
  const dx = targetX - (rect.left + rect.width / 2);
  const dy = targetY - (rect.top + rect.height / 2);

  avatar.style.setProperty("--tx", `${dx}px`);
  avatar.style.setProperty("--ty", `${dy}px`);
  avatar.style.setProperty("--rush", `${1.65 + Math.random() * 1.1}s`);

  setTimeout(() => avatar.classList.add("exposed"), 220);
  setTimeout(() => avatar.classList.add("stock"), 420);
  setTimeout(() => avatar.classList.add("placeholder"), 780);
  setTimeout(() => avatar.classList.add("rush"), 260);
}

function rushOneFreshAvatar(){
  const side = Math.random() > .5 ? 106 : -6;
  const y = 14 + Math.random() * 76;
  const name = names[(avatarCount + attackCount) % names.length];
  const avatar = makeAvatar(name, side, y);
  avatarField.appendChild(avatar);
  avatarCount++;

  setTimeout(() => rushAvatar(avatar), 180);
  setTimeout(() => avatar.remove(), 4200);
}

function frankMoment(){
  const frank = makeAvatar("Frank 1358", 20, 74, true);
  frankZone.appendChild(frank);

  setTimeout(() => frank.classList.add("stock"), 600);
  setTimeout(() => frank.classList.add("placeholder"), 950);

  setTimeout(() => {
    frank.classList.add("awake");
  }, 1320);

  setTimeout(() => {
    frank.classList.remove("awake");
    buryFrank();
  }, 2050);
}

function buryFrank(){
  addAvatarWave(10, 45);

  const frank = frankZone.querySelector(".frank");
  if(frank){
    setTimeout(() => frank.classList.add("buried"), 320);
    setTimeout(() => frank.remove(), 900);
  }

  for(let i = 0; i < 16; i++){
    setTimeout(() => {
      const dot = document.createElement("div");
      dot.className = "smother-dot";
      dot.style.left = `${9 + Math.random() * 28}%`;
      dot.style.top = `${60 + Math.random() * 25}%`;
      dot.style.transform = `scale(${.9 + Math.random() * .75})`;
      smotherField.appendChild(dot);
    }, i * 38);
  }
}

function finalSwarm(){
  let count = 0;

  swarmTimer = setInterval(() => {
    if(completed || count > 42){
      clearInterval(swarmTimer);
      swarmTimer = null;
      return;
    }

    rushOneFreshAvatar();
    addReaction(true);
    if(count % 2 === 0) addReaction(true);

    count++;
  }, 105);
}

function stopAllVirusTimers(){
  [reactionTimer, avatarTimer, attackTimer, swarmTimer].forEach(timer => {
    if(timer) clearInterval(timer);
  });
  reactionTimer = null;
  avatarTimer = null;
  attackTimer = null;
  swarmTimer = null;
}

function completeSequence(){
  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  stopAllVirusTimers();

  signalNode.classList.remove("breaching");
  signalNode.classList.add("ready");
  virusLayer.classList.add("retreat");

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 1450);

  setTimeout(() => {
    loaderScene.classList.add("portal-open");
  }, 2450);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 3050);

  setTimeout(() => {
    loaderScene.classList.add("portal-close");
  }, 8350);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 8600);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 9500);
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
