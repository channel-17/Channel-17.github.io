// CHANNEL 17 — Ground Zero Surgical Build
// CPR active. The Law wins. Avatars are manufactured identity, not characters.

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
const carlProfileFlash = document.getElementById("carlProfileFlash");

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

let profileTimer = null;
let engageTimer = null;
let slashTimer = null;
let profileCount = 0;
let engageCount = 0;

// Repo assets. CSS handles circle crop, ring, object-fit.
// Special rule: Wren, Frank, Carl appear once only.
const avatarPool = [
  "Asset1.PNG",
  "Asset2.PNG",
  "Asset3.png",
  "Asset4.PNG",
  "Asset5.PNG",
  "Asset6.PNG",
  "Asset7.PNG",
  "Asset8.PNG",
  "Asset9.PNG",
  "Asset10.PNG",
  "Asset11.PNG",
  "Asset12.PNG",
  "Asset13.PNG",
  "Asset14.PNG",
  "Asset15.PNG",
  "Asset16.PNG",
  "Asset17.PNG",
  "Asset18.PNG",
  "Asset19.PNG",
  "Asset20.PNG",
  "Asset21.PNG",
  "Asset22.PNG",
  "Asset23.PNG",
  "Asset24.PNG"
];

const specialAssets = {
  wren: "AssetWREN.PNG",
  frank: "AssetFRANK.PNG",
  carl: "AssetCARL.PNG"
};

const targets = [
  { x: 50, y: 31 },
  { x: 50, y: 48 },
  { x: 50, y: 55 },
  { x: 42, y: 47 },
  { x: 58, y: 47 },
  { x: 37, y: 31 },
  { x: 63, y: 31 },
  { x: 48, y: 39 },
  { x: 54, y: 38 },
  { x: 43, y: 58 },
  { x: 60, y: 58 },
  { x: 30, y: 42 },
  { x: 72, y: 44 },
  { x: 26, y: 64 },
  { x: 74, y: 62 }
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
    spawnSpecial("wren", 72, 24, "right", 1850);
  }

  if (progress >= 42 && !burning) {
    burning = true;
    signalGhost.classList.add("burning");
    startBurnPulse();
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
  setTimeout(() => spawnProfile("right"), 240);
  setTimeout(() => spawnProfile("left"), 420);
  setTimeout(() => spawnProfile("top"), 610);

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 310);

  engageTimer = setInterval(() => {
    if (completed) return;
    spawnEngagement();
  }, 115);

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

  const y = Math.random() * 100;
  const x = Math.random() * 100;
  s.style.left = x + "%";
  s.style.top = y + "%";

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
  const kind = engageCount % 9;

  let txt = "❤️";
  let cls = "heart";

  if (kind === 3) { txt = "👍"; cls = "like"; }
  if (kind === 5) { txt = "🔔"; cls = "bell"; }
  if (kind === 7) { txt = "✔"; cls = "mark"; }
  if (progress > 45 && cls === "heart") { txt = "🩶"; cls = "heart dead"; }

  e.className = "engage " + cls;
  e.textContent = txt;
  e.style.left = (72 + Math.random() * 22) + "%";
  e.style.top = (78 + Math.random() * 15) + "%";
  e.style.setProperty("--dur", (1.8 + Math.random() * 1.4) + "s");
  e.style.setProperty("--drift", ((-30 + Math.random() * 60) | 0) + "px");

  engagementField.appendChild(e);
  engageCount++;

  setTimeout(() => e.remove(), 3400);
}

function createImageProfile(src, x, y, side, extraClass = "") {
  const p = document.createElement("button");
  p.type = "button";
  p.className = `profile ${extraClass}`.trim();
  p.style.left = `calc(${x}% - 35px)`;
  p.style.top = `calc(${y}% - 35px)`;

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
    const old = profileField.querySelectorAll(".profile:not(.special):not(.carl-gate)");
    if (old.length > 16) old[0].remove();

    const src = avatarPool[profileCount % avatarPool.length];
    const t = targets[profileCount % targets.length];
    const x = forceCenter ? 50 : t.x;
    const y = forceCenter ? 31 : t.y;
    const stage = progress > 58 ? "blue" : progress > 42 ? "stock" : "";

    const p = createImageProfile(src, x, y, side, stage);
    profileCount++;

    if (progress > 44 && Math.random() > .35) {
      setTimeout(() => decayProfile(p), 450 + Math.random() * 500);
    }

    setTimeout(() => {
      if (p && p.parentNode && !p.classList.contains("special") && !p.classList.contains("carl-gate")) {
        p.remove();
      }
    }, 3600);
  }, delay);
}

function decayProfile(p) {
  if (!p || !p.parentNode) return;
  p.classList.add("decay");

  setTimeout(() => {
    if (p && p.parentNode) {
      p.classList.remove("stock");
      p.classList.add("blue");
    }
  }, 260);
}

function spawnSpecial(key, x, y, side, duration = 1800) {
  const p = createImageProfile(specialAssets[key], x, y, side, `special ${key} stock`);

  setTimeout(() => p.classList.add("blue"), Math.floor(duration * .52));

  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnProfile(randomSide()), i * 65);
    }
  }, Math.floor(duration * .58));

  setTimeout(() => {
    if (p && p.parentNode) p.remove();
  }, duration);

  return p;
}

function spawnCarlFirefly() {
  const p = createImageProfile(specialAssets.carl, 18, 47, "left", "special carl-gate stock");

  p.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    flashCarlProfile();
  });

  p.addEventListener("touchend", (event) => {
    event.preventDefault();
    event.stopPropagation();
    flashCarlProfile();
  }, { passive: false });

  setTimeout(() => {
    flashCarlProfile(false);
  }, 470);

  setTimeout(() => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => spawnProfile("left"), i * 55);
    }
  }, 610);

  setTimeout(() => {
    if (p && p.parentNode) p.remove();
  }, 980);
}

function flashCarlProfile(userFoundIt = true) {
  if (!carlProfileFlash) return;

  carlProfileFlash.classList.remove("show");
  void carlProfileFlash.offsetWidth;
  carlProfileFlash.classList.add("show");

  setTimeout(() => {
    carlProfileFlash.classList.remove("show");
  }, userFoundIt ? 1250 : 620);
}

function spawnFrank() {
  const p = createImageProfile(specialAssets.frank, 22, 68, "left", "special frank stock");

  setTimeout(() => p.classList.add("pause"), 420);

  setTimeout(() => {
    p.classList.remove("stock");
    p.classList.add("blue");
  }, 980);

  setTimeout(() => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnProfile(randomSide()), i * 70);
    }
  }, 1100);

  setTimeout(() => {
    if (p && p.parentNode) p.remove();
  }, 1900);
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

  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnProfile(["left", "right", "top"][i]), i * 80);
  }
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
