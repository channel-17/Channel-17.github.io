// CHANNEL 17 — SexyLexy17 Build Pass 1
// CPR active. The Law wins. Surgical continuation from Ground Zero.

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
const signalGhost = document.getElementById("signalGhost");
const motionField = document.getElementById("motionField");
const engagementField = document.getElementById("engagementField");
const profileField = document.getElementById("profileField");
const impactField = document.getElementById("impactField");
const checkGenerals = document.getElementById("checkGenerals");

let progress = 0;
let state = "normal";
let completed = false;
let noticed = false;
let hidden = false;
let breached = false;
let ghosted = false;
let burning = false;
let generals = false;
let frankSeen = false;
let carlSeen = false;
let wrenSeen = false;
let carlClicked = false;

let profileTimer = null;
let engageTimer = null;
let slashTimer = null;
let profileCount = 0;
let engageCount = 0;

const avatarPool = [
  "Asset1.PNG", "Asset2.PNG", "Asset3.png", "Asset4.PNG", "Asset5.PNG", "Asset6.PNG",
  "Asset7.PNG", "Asset8.PNG", "Asset9.PNG", "Asset10.PNG", "Asset11.PNG", "Asset12.PNG",
  "Asset13.PNG", "Asset14.PNG", "Asset15.PNG", "Asset16.PNG", "Asset17.PNG", "Asset18.PNG",
  "Asset19.PNG", "Asset20.PNG", "Asset21.PNG", "Asset22.PNG", "Asset23.PNG", "Asset24.PNG"
];

const specialAssets = {
  wren: "AssetWREN.PNG",
  frank: "AssetFRANK.PNG",
  carl: "AssetCARL.PNG"
};

const carlDestination = "CGatesSSProfile.PNG";

// Coverage priority: symbol first, loader second, Homie collateral third.
// These are intentionally tight and overlapping so the swarm feels like pressure, not decoration.
const coverageTargets = [
  { x: 50, y: 31 }, { x: 46, y: 30 }, { x: 54, y: 30 }, { x: 50, y: 36 },
  { x: 42, y: 31 }, { x: 58, y: 31 }, { x: 47, y: 25 }, { x: 55, y: 38 },
  { x: 50, y: 48 }, { x: 43, y: 48 }, { x: 57, y: 48 }, { x: 50, y: 52 },
  { x: 39, y: 53 }, { x: 61, y: 53 }, { x: 46, y: 58 }, { x: 56, y: 58 },
  { x: 44, y: 55 }, { x: 51, y: 55 }, { x: 58, y: 55 },
  { x: 35, y: 42 }, { x: 65, y: 42 }, { x: 32, y: 61 }, { x: 68, y: 61 }
];

function setProgress(v) {
  progress = Math.max(0, Math.min(100, v));
  fill.style.width = progress <= 0 ? "0%" : `calc(${progress}% - 12px)`;
  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if (state === "normal") progress += .16;
  if (state === "notice") progress += .035;
  if (state === "hide") progress += .23;

  if (progress >= 17 && !noticed) {
    noticed = true;
    state = "notice";
    turtle.classList.remove("walk");
    turtle.classList.add("notice");
    loader.classList.add("offcourse");
  }

  if (progress >= 18.4 && !hidden) {
    hidden = true;
    state = "hide";
    turtle.classList.remove("notice");
    turtle.classList.add("hide");
  }

  if (progress >= 18.7 && !breached) {
    breached = true;
    virusLayer.classList.add("active");
    startAttack();
  }

  if (progress >= 24 && !ghosted) {
    ghosted = true;
    signalGhost.classList.add("waking");
  }

  if (progress >= 35 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 42 && !burning) {
    burning = true;
    signalGhost.classList.add("burning");
    startBurnPulse();
    triggerHiveRevealWave();
  }

  if (progress >= 52 && !carlSeen) {
    carlSeen = true;
    spawnCarlFirefly();
  }

  if (progress >= 55 && !generals) {
    generals = true;
    deployGenerals();
  }

  if (progress >= 66 && !frankSeen) {
    frankSeen = true;
    spawnFrank();
  }

  if (progress >= 100 && !completed) {
    completed = true;
    progress = 100;
    clearInterval(loading);
    completeSequence();
  }

  setProgress(progress);
}, 45);

function startAttack() {
  spawnProfile("top", 0, true);
  setTimeout(() => spawnProfile("right"), 190);
  setTimeout(() => spawnProfile("left"), 330);
  setTimeout(() => spawnProfile("top"), 470);
  setTimeout(() => spawnCoverageRush(5), 720);

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 230);

  engageTimer = setInterval(() => {
    if (completed) return;
    spawnEngagement();
  }, 235);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 170);
}

function randomSide() {
  return ["top", "left", "right", "bottom"][Math.floor(Math.random() * 4)];
}

function sideVector(side) {
  let sx = "0px";
  let sy = "0px";
  if (side === "top") sy = "-115vh";
  if (side === "bottom") sy = "115vh";
  if (side === "left") sx = "-115vw";
  if (side === "right") sx = "115vw";
  return { sx, sy };
}

function spawnSlash(side) {
  const s = document.createElement("div");
  s.className = "slash";
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";

  let sx = "0px";
  let sy = "0px";
  let r = "0deg";
  if (side === "top") { sy = "-120px"; r = "90deg"; }
  if (side === "bottom") { sy = "120px"; r = "-90deg"; }
  if (side === "left") { sx = "-160px"; r = "0deg"; }
  if (side === "right") { sx = "160px"; r = "180deg"; }

  s.style.setProperty("--sx", sx);
  s.style.setProperty("--sy", sy);
  s.style.setProperty("--r", r);
  motionField.appendChild(s);
  setTimeout(() => s.remove(), 700);
}

function spawnEngagement() {
  const e = document.createElement("div");
  const kind = engageCount % 14;

  let txt = "❤️";
  let cls = "heart";

  if (kind === 1 || kind === 6) { txt = "💕"; cls = "heart pink"; }
  if (kind === 4) { txt = "👍"; cls = "like"; }
  if (kind === 8) { txt = "🔔"; cls = "bell"; }
  if (kind === 11) { txt = "✔"; cls = "mark"; }

  if (progress > 43 && cls.includes("heart")) {
    txt = "♥";
    cls = "heart dying";
  }

  if (progress > 58 && cls.includes("heart") && Math.random() > .35) {
    txt = "♥";
    cls = "heart dead";
  }

  e.className = "engage " + cls;
  e.textContent = txt;
  e.style.left = (70 + Math.random() * 23) + "%";
  e.style.top = (78 + Math.random() * 15) + "%";
  e.style.setProperty("--dur", (1.6 + Math.random() * 1.2) + "s");
  e.style.setProperty("--drift", ((-30 + Math.random() * 60) | 0) + "px");

  engagementField.appendChild(e);
  engageCount++;
  setTimeout(() => e.remove(), 3200);
}

function createImageProfile(src, x, y, side, extraClass = "") {
  const p = document.createElement("button");
  p.type = "button";
  p.className = `profile ${extraClass}`.trim();
  p.style.left = `calc(${x}% - 43px)`;
  p.style.top = `calc(${y}% - 43px)`;

  const v = sideVector(side);
  p.style.setProperty("--sx", v.sx);
  p.style.setProperty("--sy", v.sy);

  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.loading = "eager";
  p.appendChild(img);

  profileField.appendChild(p);
  spawnSlash(side);
  return p;
}

function spawnProfile(side, delay = 0, forceCenter = false) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.special):not(.carl):not(.carl-gate)");
    if (old.length > 24) old[0].remove();

    const src = avatarPool[profileCount % avatarPool.length];
    const t = coverageTargets[profileCount % coverageTargets.length];
    const x = forceCenter ? 50 : t.x + (Math.random() * 3.6 - 1.8);
    const y = forceCenter ? 31 : t.y + (Math.random() * 3.6 - 1.8);
    const stage = progress > 58 ? "blue swarm-cover" : progress > 42 ? "stock swarm-cover" : "swarm-cover";

    const p = createImageProfile(src, x, y, side, stage);
    profileCount++;

    if (progress > 42) {
      const dist = Math.hypot(x - 50, y - 31);
      const waveDelay = Math.max(80, dist * 35 + Math.random() * 260);
      setTimeout(() => decayProfile(p), waveDelay);
    }

    setTimeout(() => {
      if (p && p.parentNode && !p.classList.contains("special") && !p.classList.contains("carl") && !p.classList.contains("carl-gate")) p.remove();
    }, 4300);
  }, delay);
}

function decayProfile(p) {
  if (!p || !p.parentNode || p.classList.contains("wren")) return;
  p.classList.add("decay", "revealing");
  setTimeout(() => {
    if (p && p.parentNode) {
      p.classList.remove("stock", "revealing");
      p.classList.add("blue");
    }
  }, 260);
}

function triggerHiveRevealWave() {
  [...profileField.querySelectorAll(".profile:not(.wren)")].forEach((p) => {
    const rect = p.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const sx = window.innerWidth * .5;
    const sy = window.innerHeight * .31;
    const dist = Math.hypot(cx - sx, cy - sy);
    setTimeout(() => decayProfile(p), Math.min(1100, dist * 1.6));
  });
}

function spawnCoverageRush(amount = 8) {
  for (let i = 0; i < amount; i++) setTimeout(() => spawnProfile(randomSide()), i * 70);
}

function spawnWren() {
  const p = createImageProfile(specialAssets.wren, 70, 24, "right", "special wren stock");
  setTimeout(() => p.classList.add("linger"), 900);
  setTimeout(() => spawnCoverageRush(5), 1280);
  setTimeout(() => {
    if (p && p.parentNode) p.classList.add("revealing");
  }, 1900);
  setTimeout(() => {
    if (p && p.parentNode) p.remove();
  }, 2450);
}

function spawnCarlFirefly() {
  const carl = createImageProfile(specialAssets.carl, 22, 47, "left", "special carl stock buried");

  setTimeout(() => spawnCoverageRush(5), 140);
  setTimeout(() => driftDeadHeartIntoCarl(carl), 430);
  setTimeout(() => {
    if (carl && carl.parentNode) carl.classList.add("carl-gate");
  }, 970);

  const openCarl = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (carlClicked) return;
    carlClicked = true;
    window.location.href = carlDestination;
  };

  carl.addEventListener("click", openCarl);
  carl.addEventListener("touchend", openCarl, { passive: false });

  setTimeout(() => {
    if (carl && carl.parentNode) carl.classList.remove("carl-gate");
  }, 1540);

  setTimeout(() => spawnCoverageRush(9), 1580);
  setTimeout(() => {
    if (carl && carl.parentNode) carl.remove();
  }, 2050);
}

function driftDeadHeartIntoCarl(carl) {
  if (!carl || !carl.parentNode) return;
  const h = document.createElement("div");
  h.className = "dead-heart-trigger";
  h.textContent = "♥";
  h.style.left = "72%";
  h.style.top = "78%";

  const c = carl.getBoundingClientRect();
  const targetX = c.left + c.width * .52;
  const targetY = c.top + c.height * .18;
  const startX = window.innerWidth * .72;
  const startY = window.innerHeight * .78;
  h.style.setProperty("--dx", `${targetX - startX}px`);
  h.style.setProperty("--dy", `${targetY - startY}px`);

  engagementField.appendChild(h);
  setTimeout(() => h.remove(), 1200);
}

function spawnFrank() {
  const p = createImageProfile(specialAssets.frank, 26, 64, "left", "special frank stock");
  setTimeout(() => p.classList.add("pause"), 360);
  setTimeout(() => {
    if (!p || !p.parentNode) return;
    p.classList.remove("stock");
    p.classList.add("blue", "what");
  }, 1250);
  setTimeout(() => spawnCoverageRush(8), 1680);
  setTimeout(() => {
    if (p && p.parentNode) p.remove();
  }, 2550);
}

function startBurnPulse() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const b = document.createElement("div");
      b.className = "burn-ring";
      impactField.appendChild(b);
      setTimeout(() => b.remove(), 950);
    }, i * 650);
  }
}

function deployGenerals() {
  checkGenerals.classList.add("active");
  const gens = [...checkGenerals.querySelectorAll(".general")];
  setTimeout(() => gens.forEach(g => g.classList.add("verify")), 700);
  setTimeout(() => gens.forEach(g => {
    g.classList.remove("verify");
    g.classList.add("target");
    g.querySelector("small").textContent = "target";
  }), 1300);
  [0, 1, 2].forEach((n) => setTimeout(() => fireBlast(n), 1700 + n * 260));
}

function fireBlast(n) {
  const b = document.createElement("div");
  b.className = "blast";
  b.style.setProperty("--a", [-18, 0, 18][n] + "deg");
  impactField.appendChild(b);
  setTimeout(() => b.remove(), 430);
  for (let i = 0; i < 4; i++) setTimeout(() => spawnProfile(["left", "right", "top", "bottom"][i]), i * 65);
}

function stopAttack() {
  clearInterval(profileTimer);
  clearInterval(engageTimer);
  clearInterval(slashTimer);
  profileTimer = null;
  engageTimer = null;
  slashTimer = null;
  virusLayer.classList.add("retreat");

  setTimeout(() => {
    profileField.innerHTML = "";
    engagementField.innerHTML = "";
    motionField.innerHTML = "";
    impactField.innerHTML = "";
    checkGenerals.classList.remove("active");
    virusLayer.classList.remove("active", "retreat");
    signalGhost.classList.remove("waking", "burning");
  }, 1250);
}

function completeSequence() {
  state = "done";
  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  setTimeout(() => {
    stopAttack();
    signalNode.classList.add("ready");
  }, 350);

  setTimeout(() => {
    turtle.classList.remove("hide");
    turtle.classList.add("peek");
  }, 1500);

  setTimeout(() => loaderScene.classList.add("portal-open"), 2500);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 3150);

  setTimeout(() => loaderScene.classList.add("portal-close"), 7650);
  setTimeout(() => loader.classList.add("homie-cut-out"), 7900);
  setTimeout(() => loaderScene.classList.add("fade-out"), 8700);
}

function openChannel() {
  if (!signalNode.classList.contains("ready")) return;
  signalNode.style.pointerEvents = "none";
  outerSymbol.classList.add("dissolve");
  innerSymbol.classList.add("alive");
  maze.classList.remove("active");
  void maze.offsetWidth;
  maze.classList.add("active");
  setTimeout(() => signalNode.classList.add("fade-out"), 4700);
  setTimeout(() => {
    home.classList.add("open");
    idleMaze.classList.add("active");
  }, 5600);
}

signalNode.addEventListener("click", openChannel);
signalNode.addEventListener("touchend", e => {
  e.preventDefault();
  openChannel();
}, { passive: false });
