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
const burnField = document.getElementById("burnField");
const frankStage = document.getElementById("frankStage");
const panicWash = document.getElementById("panicWash");

let progress = 0;
let state = "normal";
let completed = false;

let noticed = false;
let hidden = false;
let virusStarted = false;
let heavyStarted = false;
let burnStarted = false;
let frankStarted = false;
let bumRushStarted = false;

let reactionTimer = null;
let avatarTimer = null;
let reactionCount = 0;
let avatarCount = 0;
let allAvatars = [];
let allReactions = [];

const names = [
  "Sally W", "Mark T", "Terry P", "Mara K", "Jules V", "Mike J", "Donna R", "Kevin M",
  "Sue V", "Britt C", "Paul N", "Amy L", "Rick D", "Nina S", "Kyle B", "Wendy R",
  "Josh P", "Lena M", "Derek C", "Tina F", "Cody J", "April V", "Shane K", "Rosa B",
  "Brad Y", "Kara N", "Dawn H", "Mitch L", "Casey R", "Kim J", "Tony G", "Erin C"
];

const palettes = [
  { skin:"#e4b88f", hair:"#e6c15e", shirt:"#244d7c" },
  { skin:"#c98f67", hair:"#221b16", shirt:"#7f2635" },
  { skin:"#f0c7a4", hair:"#654321", shirt:"#3d6f4e" },
  { skin:"#b77a55", hair:"#111", shirt:"#543c9b" },
  { skin:"#d9a276", hair:"#8a5b2f", shirt:"#a24a2a" },
  { skin:"#edc5a2", hair:"#d8d0bf", shirt:"#384b66" },
  { skin:"#9f6749", hair:"#2a1a14", shirt:"#1f5d70" },
  { skin:"#f2d0b5", hair:"#b56b39", shirt:"#882c62" }
];

function setProgress(value){
  progress = Math.max(0, Math.min(100, value));

  fill.style.width =
    progress <= 0
      ? "0%"
      : `calc(${progress}% - 12px)`;

  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if(state === "normal") progress += .16;
  if(state === "notice") progress += .035;
  if(state === "hide") progress += .23;

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
    startAttentionSystem();
  }

  if(progress >= 38 && !heavyStarted){
    heavyStarted = true;
    intensifyCoverage();
  }

  if(progress >= 62 && !burnStarted){
    burnStarted = true;
    startSymbolExposure();
  }

  if(progress >= 72 && !frankStarted){
    frankStarted = true;
    runFrankMoment();
  }

  if(progress >= 80 && !bumRushStarted){
    bumRushStarted = true;
    beginBumRush();
  }

  if(progress >= 100 && !completed){
    completed = true;
    progress = 100;
    clearInterval(loading);
    completeSequence();
  }

  setProgress(progress);
}, 45);

function startAttentionSystem(){
  virusLayer.classList.add("active");

  for(let i = 0; i < 18; i++){
    setTimeout(() => spawnReaction(false), i * 90);
  }

  for(let i = 0; i < 10; i++){
    setTimeout(() => spawnAvatar("drop"), 500 + i * 150);
  }

  reactionTimer = setInterval(() => {
    spawnReaction(false);
    if(reactionCount % 3 === 0) spawnReaction(false);
  }, 190);

  avatarTimer = setInterval(() => {
    spawnAvatar("drop");
  }, 330);
}

function intensifyCoverage(){
  for(let i = 0; i < 38; i++){
    setTimeout(() => spawnAvatar("drop"), i * 70);
  }

  for(let i = 0; i < 70; i++){
    setTimeout(() => spawnReaction(false), i * 38);
  }
}

function spawnReaction(forceAttack){
  if(!attentionFeed) return;

  const types = ["heart", "heart", "heart", "like", "check", "bell", "trend"];
  const type = types[reactionCount % types.length];
  const node = document.createElement("div");
  node.className = `reaction ${type}`;

  let symbol = "❤️";
  if(type === "like") symbol = "👍";
  if(type === "check") symbol = "✔";
  if(type === "bell") symbol = "🔔";
  if(type === "trend") symbol = "↗";

  node.textContent = symbol;

  const rightSide = type === "heart" || type === "like" || type === "bell";
  const x = forceAttack
    ? 35 + Math.random() * 30
    : rightSide
      ? 76 + Math.random() * 20
      : 8 + Math.random() * 84;
  const y = forceAttack
    ? 28 + Math.random() * 35
    : 58 + Math.random() * 36;

  node.style.setProperty("--x", `${x}%`);
  node.style.setProperty("--y", `${y}%`);
  node.style.setProperty("--s", `${18 + Math.random() * 16}px`);
  node.style.setProperty("--rise", `${Math.round(Math.random() * 90)}px`);
  node.style.setProperty("--drift", `${Math.round(-45 + Math.random() * 90)}px`);
  node.style.setProperty("--drift2", `${Math.round(-45 + Math.random() * 90)}px`);
  node.style.setProperty("--drift3", `${Math.round(-45 + Math.random() * 90)}px`);

  attentionFeed.appendChild(node);
  allReactions.push(node);
  reactionCount++;

  if(forceAttack || burnStarted){
    setTimeout(() => corruptReaction(node), 650 + Math.random() * 1100);
  }

  setTimeout(() => node.remove(), 7600);
}

function corruptReaction(node){
  if(!node || !node.isConnected) return;

  if(node.classList.contains("check")){
    node.textContent = "?";
    node.classList.add("question");
    return;
  }

  if(node.classList.contains("heart")){
    node.textContent = "♥";
  }

  node.classList.add("dead");
}

function spawnAvatar(mode){
  if(!avatarField) return;

  const index = avatarCount++;
  const node = document.createElement("div");
  node.className = "avatar";

  const size = Math.round(62 + Math.random() * 22);
  const startX = 6 + Math.random() * 88;
  const startY = mode === "drop" ? -8 - Math.random() * 22 : 6 + Math.random() * 86;
  const landX = 4 + Math.random() * 92;
  const landY = 12 + Math.random() * 78;
  const palette = palettes[index % palettes.length];

  node.style.setProperty("--size", `${size}px`);
  node.style.setProperty("--sx", `${startX}%`);
  node.style.setProperty("--sy", `${startY}%`);
  node.style.setProperty("--skin", palette.skin);
  node.style.setProperty("--hair", palette.hair);
  node.style.setProperty("--shirt", palette.shirt);

  node.innerHTML = `
    <div class="bubble">
      <div class="face"></div>
      <div class="stock"></div>
      <div class="placeholder"></div>
    </div>
    <div class="name">${names[index % names.length]}</div>
  `;

  avatarField.appendChild(node);
  allAvatars.push(node);

  requestAnimationFrame(() => {
    node.style.left = `${landX}%`;
    node.style.top = `${landY}%`;
    node.style.setProperty("--sx", `${landX}%`);
    node.style.setProperty("--sy", `${landY}%`);
    node.classList.add("smother");
  });

  if(burnStarted || index % 5 === 0){
    setTimeout(() => exposeAvatar(node), 900 + Math.random() * 2100);
  }

  return node;
}

function exposeAvatar(node){
  if(!node || !node.isConnected) return;

  node.classList.add("breaking");
  setTimeout(() => node.classList.add("stage-stock"), 180 + Math.random() * 420);
  setTimeout(() => node.classList.add("stage-blue"), 620 + Math.random() * 700);
  setTimeout(() => node.classList.add("dead"), 1100 + Math.random() * 700);
}

function startSymbolExposure(){
  if(!burnField) return;

  const hole = document.createElement("div");
  hole.className = "burn-hole";
  burnField.appendChild(hole);

  for(let i = 0; i < 42; i++){
    setTimeout(() => spawnBurnSpark(), i * 70);
  }

  allAvatars.forEach((avatar, index) => {
    const rectDelay = 100 + index * 24;
    setTimeout(() => {
      if(isNearSymbol(avatar) || index % 3 === 0) exposeAvatar(avatar);
    }, rectDelay);
  });

  allReactions.forEach((reaction, index) => {
    setTimeout(() => corruptReaction(reaction), index * 22);
  });
}

function spawnBurnSpark(){
  const spark = document.createElement("div");
  spark.className = "burn-spark";

  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 24;
  const x = 50 + Math.cos(angle) * radius / 5;
  const y = 31 + Math.sin(angle) * radius / 5;

  spark.style.setProperty("--x", `${x}%`);
  spark.style.setProperty("--y", `${y}%`);
  spark.style.setProperty("--s", `${4 + Math.random() * 8}px`);

  burnField.appendChild(spark);
  setTimeout(() => spark.remove(), 2600);
}

function isNearSymbol(node){
  const x = parseFloat(node.style.left || "0");
  const y = parseFloat(node.style.top || "0");
  const dx = x - 50;
  const dy = y - 31;
  return Math.sqrt(dx * dx + dy * dy) < 28;
}

function runFrankMoment(){
  if(!frankStage) return;

  const frank = document.createElement("div");
  frank.className = "frank-avatar";
  frank.innerHTML = `
    <div class="bubble">
      <div class="body"></div>
      <div class="arm left"></div>
      <div class="arm right"></div>
    </div>
    <div class="name">Frank 1358</div>
  `;

  frankStage.appendChild(frank);

  setTimeout(() => frank.classList.add("realize"), 520);

  setTimeout(() => {
    for(let i = 0; i < 18; i++){
      setTimeout(() => {
        const avatar = spawnAvatar("drop");
        if(avatar){
          avatar.style.left = `${6 + Math.random() * 22}%`;
          avatar.style.top = `${58 + Math.random() * 30}%`;
          setTimeout(() => avatar.classList.add("stage-blue"), 150);
        }
      }, i * 38);
    }
  }, 1180);

  setTimeout(() => frank.classList.add("buried"), 1540);
}

function beginBumRush(){
  if(panicWash) panicWash.classList.add("active");

  if(reactionTimer){
    clearInterval(reactionTimer);
    reactionTimer = null;
  }

  if(avatarTimer){
    clearInterval(avatarTimer);
    avatarTimer = null;
  }

  for(let i = 0; i < 70; i++){
    setTimeout(() => spawnReaction(true), i * 24);
  }

  for(let i = 0; i < 58; i++){
    setTimeout(() => spawnAvatar("drop"), i * 42);
  }

  setTimeout(() => {
    allAvatars.forEach((avatar, index) => {
      if(!avatar || !avatar.isConnected) return;

      const jitterX = -8 + Math.random() * 16;
      const jitterY = -9 + Math.random() * 16;

      avatar.classList.add("attack");
      avatar.style.left = `${50 + jitterX}%`;
      avatar.style.top = `${31 + jitterY}%`;

      setTimeout(() => exposeAvatar(avatar), 260 + (index % 9) * 80);
    });
  }, 680);
}

function completeSequence(){
  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  fullSystemRetreat();

  setTimeout(() => {
    signalNode.classList.add("ready");
  }, 520);

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 2300);

  setTimeout(() => {
    loaderScene.classList.add("portal-open");
  }, 3350);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 4000);

  setTimeout(() => {
    loaderScene.classList.add("portal-close");
  }, 9250);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 9500);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 10400);
}

function fullSystemRetreat(){
  if(panicWash) panicWash.classList.remove("active");

  if(reactionTimer){
    clearInterval(reactionTimer);
    reactionTimer = null;
  }

  if(avatarTimer){
    clearInterval(avatarTimer);
    avatarTimer = null;
  }

  allAvatars.forEach((avatar, index) => {
    if(!avatar || !avatar.isConnected) return;
    avatar.style.setProperty("--r", `${-35 + Math.random() * 70}deg`);
    setTimeout(() => avatar.classList.add("retreating"), index * 11);
  });

  allReactions.forEach((reaction, index) => {
    if(!reaction || !reaction.isConnected) return;
    setTimeout(() => {
      reaction.style.transition = "opacity .45s ease, transform .45s ease, filter .45s ease";
      reaction.style.opacity = "0";
      reaction.style.filter = "blur(5px) grayscale(1)";
    }, index * 7);
  });

  setTimeout(() => {
    virusLayer.classList.add("retreat");
  }, 900);

  setTimeout(() => {
    attentionFeed.innerHTML = "";
    avatarField.innerHTML = "";
    burnField.innerHTML = "";
    frankStage.innerHTML = "";
    virusLayer.classList.remove("active", "retreat");
  }, 3200);
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
