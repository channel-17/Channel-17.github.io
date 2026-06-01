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
const avatarField = document.getElementById("avatarField");
const pollutionField = document.getElementById("pollutionField");
const symbolBurn = document.getElementById("symbolBurn");
const blackout = document.getElementById("blackout");

let progress = 0;
let state = "normal";
let completed = false;

let noticed = false;
let hidden = false;
let attackStarted = false;
let suffocationStarted = false;
let burnStarted = false;
let rushStarted = false;
let frankMomentDone = false;

let profileTimer = null;
let pollutionTimer = null;
let pulseTimer = null;
let profileCount = 0;
let pollutionCount = 0;
let allProfiles = [];
let allPollution = [];

const names = [
  "Sue W", "Mike J", "Terry P", "Donna R", "Kevin M", "Jules V", "Mara K", "Ron T",
  "Lisa B", "Carl N", "Amy S", "Drew C", "Nina Q", "Paul E", "Rita D", "Kim L",
  "Ben H", "Sam G", "Sally B", "Mark C", "Trina V", "Cole P", "Jade F", "Bri K",
  "Nick D", "Wade R", "Molly T", "Dean S", "Laura H", "Tasha N", "Cory L", "Vera P",
  "Greg A", "Tina M", "Mason J", "Lena R", "Kyle V", "Casey D", "Joel W", "Dana C"
];

const entrySlots = [
  { side:"top", x:10, y:29 }, { side:"top", x:33, y:24 }, { side:"top", x:64, y:25 }, { side:"top", x:82, y:34 },
  { side:"left", x:5, y:41 }, { side:"right", x:78, y:43 }, { side:"left", x:12, y:54 }, { side:"top", x:48, y:46 },
  { side:"right", x:70, y:58 }, { side:"left", x:0, y:68 }, { side:"bottom", x:24, y:72 }, { side:"bottom", x:50, y:70 },
  { side:"right", x:86, y:72 }, { side:"bottom", x:10, y:84 }, { side:"bottom", x:38, y:86 }, { side:"right", x:92, y:86 },
  { side:"left", x:-7, y:24 }, { side:"right", x:95, y:18 }, { side:"top", x:20, y:12 }, { side:"top", x:76, y:13 },
  { side:"left", x:-9, y:80 }, { side:"right", x:96, y:57 }, { side:"bottom", x:66, y:88 }, { side:"top", x:51, y:8 }
];

const symbolPoint = { x:50, y:31 };
const loaderPoint = { x:50, y:48 };

function clamp(value, min, max){
  return Math.max(min, Math.min(max, value));
}

function setProgress(value){
  progress = clamp(value, 0, 100);
  fill.style.width = progress <= 0 ? "0%" : `calc(${progress}% - 12px)`;
  percent.textContent = `${Math.round(progress)}%`;
}

function profileStartFor(slot){
  if(slot.side === "top") return { x:slot.x, y:-18 };
  if(slot.side === "bottom") return { x:slot.x, y:112 };
  if(slot.side === "left") return { x:-24, y:slot.y };
  return { x:112, y:slot.y };
}

function makeProfile(name, slot, options = {}){
  const start = profileStartFor(slot);
  const profile = document.createElement("div");
  const seed = profileCount++;

  profile.className = "profile";
  if(name === "Frank 1358") profile.classList.add("frank");

  profile.dataset.seed = String(seed);
  profile.dataset.name = name;
  profile.dataset.baseX = String(slot.x);
  profile.dataset.baseY = String(slot.y);
  profile.dataset.stage = "real";

  profile.style.left = `${start.x}%`;
  profile.style.top = `${start.y}%`;
  profile.style.zIndex = String(options.z || (seed % 16) + 1);
  profile.style.transform = `translate3d(0,0,0) scale(${options.scale || (0.93 + ((seed % 5) * .035))})`;

  profile.innerHTML = `
    <div class="bubble">
      ${personMarkup("real")}
      ${personMarkup("stock")}
      ${personMarkup("blank")}
    </div>
    <div class="name">${name}</div>
  `;

  avatarField.appendChild(profile);
  allProfiles.push(profile);

  setTimeout(() => {
    profile.classList.add("on");
    profile.style.left = `${slot.x}%`;
    profile.style.top = `${slot.y}%`;
  }, options.delay || 40);

  return profile;
}

function personMarkup(type){
  return `
    <div class="person ${type}">
      <div class="shirt"></div>
      <div class="arm left"></div>
      <div class="arm right"></div>
      <div class="neck-shape"></div>
      <div class="head-shape"></div>
      <div class="hair"></div>
      <div class="eye-dot one"></div>
      <div class="eye-dot two"></div>
      <div class="mouth"></div>
    </div>
  `;
}

function setProfileStage(profile, stage){
  if(!profile || profile.dataset.stage === stage) return;

  profile.classList.remove("stage-stock", "stage-blank", "exposed");

  if(stage === "stock") profile.classList.add("stage-stock");
  if(stage === "blank") profile.classList.add("stage-blank");

  profile.classList.add("exposed");
  profile.dataset.stage = stage;

  setTimeout(() => profile.classList.remove("exposed"), 500);
}

function startAttack(){
  virusLayer.classList.add("active");
  startPollution();
  startProfileDeployment();
}

function startProfileDeployment(){
  if(profileTimer) return;

  const firstWave = entrySlots.slice(0, 16);
  firstWave.forEach((slot, index) => {
    setTimeout(() => makeProfile(names[index], slot, { delay:80, z:index + 5 }), index * 145);
  });

  profileTimer = setInterval(() => {
    if(completed) return;
    const slot = entrySlots[(profileCount + 4) % entrySlots.length];
    const offsetSlot = {
      side:slot.side,
      x:clamp(slot.x + ((profileCount % 5) - 2) * 3.4, -8, 96),
      y:clamp(slot.y + ((profileCount % 7) - 3) * 2.6, 4, 92)
    };
    const name = profileCount === 22 ? "Frank 1358" : names[profileCount % names.length];
    makeProfile(name, offsetSlot, { delay:50, z:20 + (profileCount % 40), scale:0.86 + ((profileCount % 6) * .035) });

    if(profileCount % 3 === 0){
      const slot2 = entrySlots[(profileCount + 11) % entrySlots.length];
      setTimeout(() => makeProfile(names[(profileCount + 9) % names.length], {
        side:slot2.side,
        x:clamp(slot2.x + ((profileCount % 4) - 2) * 5, -12, 99),
        y:clamp(slot2.y + ((profileCount % 6) - 3) * 4, 2, 95)
      }, { delay:30, z:22 + (profileCount % 50), scale:.74 + ((profileCount % 5) * .05) }), 190);
    }
  }, 310);
}

function startPollution(){
  if(pollutionTimer) return;

  for(let i = 0; i < 18; i++){
    setTimeout(() => addPollution(), i * 90);
  }

  pollutionTimer = setInterval(() => {
    if(completed) return;
    addPollution();
    if(pollutionCount % 2 === 0) setTimeout(addPollution, 85);
    if(pollutionCount % 5 === 0) setTimeout(addPollution, 175);
  }, 230);
}

function addPollution(typeOverride){
  const types = ["heart", "heart", "thumb", "bell", "check", "heart", "bell", "check"];
  const type = typeOverride || types[pollutionCount % types.length];

  const el = document.createElement("div");
  el.className = `pollute ${type}`;

  if(type === "heart") el.textContent = "♥";
  if(type === "thumb") el.textContent = "👍";
  if(type === "bell") el.textContent = "🔔";
  if(type === "check") el.textContent = "✓";

  let x;
  let y;

  if(type === "heart"){
    x = 65 + Math.random() * 32;
    y = 62 + Math.random() * 28;
  } else if(type === "check"){
    x = 78 + Math.random() * 28;
    y = 20 + Math.random() * 70;
  } else if(type === "bell"){
    x = 72 + Math.random() * 28;
    y = 30 + Math.random() * 62;
  } else {
    x = 72 + Math.random() * 27;
    y = 35 + Math.random() * 58;
  }

  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  el.style.fontSize = `${1.15 + Math.random() * 1.35}rem`;
  el.style.animationDelay = `${Math.random() * 1.8}s`;
  el.style.zIndex = String(65 + (pollutionCount % 25));

  pollutionField.appendChild(el);
  allPollution.push(el);

  setTimeout(() => el.classList.add("on"), 20);

  pollutionCount++;

  if(allPollution.length > 130){
    const old = allPollution.shift();
    old.remove();
  }
}

function beginSuffocation(){
  if(suffocationStarted) return;
  suffocationStarted = true;

  const extra = 34;
  for(let i = 0; i < extra; i++){
    setTimeout(() => {
      const side = i % 4 === 0 ? "top" : i % 4 === 1 ? "left" : i % 4 === 2 ? "right" : "bottom";
      const slot = {
        side,
        x:side === "left" ? -5 : side === "right" ? 93 : Math.random() * 96,
        y:side === "top" ? 2 + Math.random() * 18 : side === "bottom" ? 72 + Math.random() * 24 : Math.random() * 90
      };
      const name = profileCount === 22 ? "Frank 1358" : names[profileCount % names.length];
      makeProfile(name, slot, { delay:20, z:35 + (i % 50), scale:.86 + Math.random() * .32 });
    }, i * 70);
  }
}

function beginBurn(){
  if(burnStarted) return;
  burnStarted = true;
  symbolBurn.classList.add("active");
  blackout.classList.add("flash");
  exposeLoop();
  pulseTimer = setInterval(exposeLoop, 260);
}

function exposeLoop(){
  const sx = window.innerWidth * .5;
  const sy = window.innerHeight * .31;

  allProfiles.forEach(profile => {
    const rect = profile.getBoundingClientRect();
    const px = rect.left + rect.width / 2;
    const py = rect.top + rect.height / 2;
    const d = Math.hypot(px - sx, py - sy);

    if(d < 135){
      setProfileStage(profile, "blank");
      profile.classList.add("buried");
    } else if(d < 245){
      setProfileStage(profile, "stock");
    }
  });

  allPollution.forEach(el => {
    const rect = el.getBoundingClientRect();
    const px = rect.left + rect.width / 2;
    const py = rect.top + rect.height / 2;
    const d = Math.hypot(px - sx, py - sy);

    if(d < 260 && el.classList.contains("heart")){
      el.classList.add("gray");
      el.textContent = "♥";
    }

    if(d < 220 && el.classList.contains("check")){
      el.classList.remove("check");
      el.classList.add("qmark");
      el.textContent = "?";
    }
  });
}

function beginBumRush(){
  if(rushStarted) return;
  rushStarted = true;

  allProfiles.forEach((profile, index) => {
    setTimeout(() => {
      profile.classList.add("turning", "rush");
      const radius = 1 + (index % 7) * 3.1;
      const angle = (index * 137.5) * Math.PI / 180;
      const x = symbolPoint.x + Math.cos(angle) * radius;
      const y = symbolPoint.y + Math.sin(angle) * radius;
      profile.style.left = `${clamp(x, -16, 98)}%`;
      profile.style.top = `${clamp(y, -10, 98)}%`;
      profile.style.zIndex = String(70 + index);

      setTimeout(() => setProfileStage(profile, index % 3 === 0 ? "stock" : "blank"), 260);
    }, index * 26);
  });

  allPollution.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("attack");
      const angle = (index * 91) * Math.PI / 180;
      const radius = 2 + (index % 8) * 2.4;
      el.style.left = `${symbolPoint.x + Math.cos(angle) * radius}%`;
      el.style.top = `${symbolPoint.y + Math.sin(angle) * radius}%`;
      if(el.classList.contains("heart")) el.classList.add("gray");
      if(el.classList.contains("check")){
        el.classList.remove("check");
        el.classList.add("qmark");
        el.textContent = "?";
      }
    }, index * 18);
  });

  triggerFrankMoment();
}

function triggerFrankMoment(){
  if(frankMomentDone) return;
  frankMomentDone = true;

  let frank = allProfiles.find(p => p.dataset.name === "Frank 1358");

  if(!frank){
    frank = makeProfile("Frank 1358", { side:"left", x:7, y:74 }, { delay:20, z:99, scale:1.05 });
  }

  setTimeout(() => {
    frank.classList.add("pause");
    frank.style.left = "8%";
    frank.style.top = "72%";
    frank.style.zIndex = "120";
    setProfileStage(frank, "stock");
  }, 450);

  setTimeout(() => {
    setProfileStage(frank, "blank");
  }, 950);

  setTimeout(() => {
    for(let i = 0; i < 18; i++){
      const slot = { side:i % 2 ? "left" : "bottom", x:2 + Math.random() * 20, y:64 + Math.random() * 28 };
      const p = makeProfile(names[(i + 7) % names.length], slot, { delay:20, z:130 + i, scale:.95 + Math.random() * .3 });
      setTimeout(() => setProfileStage(p, "blank"), 260);
    }
  }, 1180);
}

function stopAttackCreation(){
  if(profileTimer){ clearInterval(profileTimer); profileTimer = null; }
  if(pollutionTimer){ clearInterval(pollutionTimer); pollutionTimer = null; }
  if(pulseTimer){ clearInterval(pulseTimer); pulseTimer = null; }
}

function retreatVirus(){
  stopAttackCreation();
  virusLayer.classList.add("retreat");

  setTimeout(() => {
    avatarField.innerHTML = "";
    pollutionField.innerHTML = "";
    allProfiles = [];
    allPollution = [];
    virusLayer.classList.remove("active", "retreat");
    symbolBurn.classList.remove("active");
    blackout.classList.remove("flash");
  }, 2300);
}

/* MAIN LOADING LOOP */

const loading = setInterval(() => {
  if(state === "normal") progress += .14;
  if(state === "notice") progress += .038;
  if(state === "hide") progress += .23;

  if(progress >= 17 && !noticed){
    noticed = true;
    state = "notice";
    turtle.classList.remove("walk");
    turtle.classList.add("notice");
    loader.classList.add("offcourse");
  }

  if(progress >= 20 && !hidden){
    hidden = true;
    state = "hide";
    turtle.classList.remove("notice");
    turtle.classList.add("hide");
  }

  if(progress >= 23 && !attackStarted){
    attackStarted = true;
    startAttack();
  }

  if(progress >= 38 && !suffocationStarted){
    beginSuffocation();
  }

  if(progress >= 58 && !burnStarted){
    beginBurn();
  }

  if(progress >= 72 && !rushStarted){
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

function completeSequence(){
  state = "done";
  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  setTimeout(() => {
    signalNode.classList.add("ready");
  }, 360);

  setTimeout(() => {
    retreatVirus();
  }, 820);

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 2350);

  setTimeout(() => {
    loader.classList.add("portal-open");
  }, 3350);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 4050);

  setTimeout(() => {
    loader.classList.add("portal-close");
  }, 9200);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 9500);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 10300);
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
