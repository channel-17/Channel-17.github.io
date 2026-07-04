// CHANNEL 17 — Yellow Brick Rebuild 1
// CPR active. Ground Zero continuation. No redesign. Surgical timing + heart asset wiring.

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
const carlProfile = document.getElementById("carlProfile");
const carlCard = document.getElementById("carlCard");
const carlClose = document.getElementById("carlClose");
const carlPhotosButton = document.getElementById("carlPhotosButton");
const carlPhotoModal = document.getElementById("carlPhotoModal");
const carlPhotoClose = document.getElementById("carlPhotoClose");
const carlPhotoLarge = document.getElementById("carlPhotoLarge");
const carlPhotoCaption = document.getElementById("carlPhotoCaption");
const hiveWound = document.getElementById("hiveWound");
const carlProfilePortal = document.getElementById("carlProfilePortal");
const hiveCarlFile = document.getElementById("hiveCarlFile");
const hiveClose = document.getElementById("hiveClose");
const survivorChalk = document.getElementById("survivorChalk");
const takeCampTest = document.getElementById("takeCampTest");
const campTestModal = document.getElementById("campTestModal");
const campTestClose = document.getElementById("campTestClose");
const campResult = document.getElementById("campResult");
const expandTestimonials = document.getElementById("expandTestimonials");
const jinxShadowFrequency = document.getElementById("jinxShadowFrequency");
const jinxCardOverlay = document.getElementById("jinxCardOverlay");
const jinxCardClose = document.getElementById("jinxCardClose");

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
let wrenSeen = false;
let carlSeen = false;
let carlTriggered = false;
let carlOpened = false;
let hiveWaveStarted = false;
let deadHeartReleased = false;
let frankDutyStarted = false;
let frankDutyFramesPlayed = false;
let woundPulseTimer = null;
let hiveWoundUsed = false;
let jinxFrequencyTimer = null;
let jinxFrequencyClearTimer = null;
let jinxFrequencyArmed = false;
let jinxFrequencyUsed = false;
let founderWindowClosed = false;

let profileTimer = null;
let engageTimer = null;
let slashTimer = null;
let profileCount = 0;
let engageCount = 0;
const AVATAR_SIZE = 72;
const HEART_PINK = "heart.pink.PNG";
const HEART_GREY = "heart.grey.PNG";
const AVATAR_HALF = AVATAR_SIZE / 2;
const frankFrames = [
  "blue.frank1.PNG",
  "blue.frank2.PNG",
  "blue.frank3.PNG",
  "blue.frank4.PNG",
  "blue.frank5.PNG",
  "blue.frank6.PNG"
];
let activeFrankStack = [];

function openJinxCard() {
  if (!jinxCardOverlay) return;
  jinxCardOverlay.hidden = false;
  jinxCardOverlay.classList.add("open");
  jinxCardOverlay.setAttribute("aria-hidden", "false");
}

function closeJinxCard() {
  if (!jinxCardOverlay) return;
  jinxCardOverlay.classList.remove("open");
  jinxCardOverlay.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!jinxCardOverlay.classList.contains("open")) {
      jinxCardOverlay.hidden = true;
    }
  }, 190);
}

function hideJinxShadowFrequency() {
  if (!jinxShadowFrequency) return;
  jinxShadowFrequency.classList.remove("armed", "pulse-live");
  jinxShadowFrequency.setAttribute("aria-hidden", "true");
  jinxShadowFrequency.tabIndex = -1;
}

function consumeJinxShadowFrequency() {
  jinxFrequencyUsed = true;
  jinxFrequencyArmed = false;
  founderWindowClosed = true;

  if (jinxFrequencyTimer) {
    window.clearTimeout(jinxFrequencyTimer);
    jinxFrequencyTimer = null;
  }

  if (jinxFrequencyClearTimer) {
    window.clearTimeout(jinxFrequencyClearTimer);
    jinxFrequencyClearTimer = null;
  }

  hideJinxShadowFrequency();
}

function pulseJinxShadowFrequency() {
  if (!jinxShadowFrequency || !jinxFrequencyArmed || founderWindowClosed || jinxFrequencyUsed) return;

  jinxShadowFrequency.classList.add("pulse-live");
  jinxShadowFrequency.setAttribute("aria-hidden", "false");
  jinxShadowFrequency.tabIndex = 0;

  jinxFrequencyClearTimer = window.setTimeout(() => {
    consumeJinxShadowFrequency();
  }, 6800);
}

function armJinxShadowFrequency() {
  if (!jinxShadowFrequency || jinxFrequencyArmed || founderWindowClosed || jinxFrequencyUsed) return;

  jinxFrequencyArmed = true;
  jinxShadowFrequency.classList.add("armed");
  jinxShadowFrequency.setAttribute("aria-hidden", "true");
  jinxShadowFrequency.tabIndex = -1;

  jinxFrequencyTimer = window.setTimeout(() => {
    pulseJinxShadowFrequency();
  }, 760);
}

function closeFounderWindow() {
  consumeJinxShadowFrequency();
}

if (jinxShadowFrequency) {
  jinxShadowFrequency.addEventListener("click", () => {
    if (!jinxShadowFrequency.classList.contains("pulse-live")) return;
    consumeJinxShadowFrequency();
    openJinxCard();
  });

  jinxShadowFrequency.addEventListener("touchend", event => {
    if (!jinxShadowFrequency.classList.contains("pulse-live")) return;
    event.preventDefault();
    consumeJinxShadowFrequency();
    openJinxCard();
  }, { passive: false });
}

if (jinxCardClose) jinxCardClose.addEventListener("click", closeJinxCard);
if (jinxCardOverlay) {
  jinxCardOverlay.hidden = true;
  jinxCardOverlay.setAttribute("aria-hidden", "true");
  jinxCardOverlay.addEventListener("click", event => {
    if (event.target === jinxCardOverlay) closeJinxCard();
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeJinxCard();
});


const hiveAssets = [
  "MalePH1.PNG",
  "male.PH.2.PNG",
  "femalePH1.PNG",
  "Female.PH2.PNG",
  "female.PH.3.PNG",
  "female.PH1.PNG"
];

const normalAssets = [
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

const loaderTargets = [
  // CHANNEL 17 ZONE MAP — LOADER BAR SUPPRESSION FIELD.
  // The virus suppresses in separate messy bites, not a neat animated loader bar.
  { x: 25.0, y: 30.95, zone: "loader", cluster: "left-bite-high" },
  { x: 74.0, y: 31.55, zone: "loader", cluster: "right-bite-low" },
  { x: 48.0, y: 30.65, zone: "loader", cluster: "center-bite-high" },
  { x: 35.0, y: 31.85, zone: "loader", cluster: "left-bite-low" },
  { x: 63.0, y: 30.85, zone: "loader", cluster: "right-bite-high" },
  { x: 29.0, y: 32.20, zone: "loader", cluster: "left-spill" },
  { x: 69.5, y: 32.05, zone: "loader", cluster: "right-spill" },
  { x: 42.0, y: 31.35, zone: "loader", cluster: "inner-left" },
  { x: 56.5, y: 31.80, zone: "loader", cluster: "inner-right" },
  { x: 22.0, y: 31.65, zone: "loader", cluster: "far-left-smother" },
  { x: 78.0, y: 30.95, zone: "loader", cluster: "far-right-smother" }
];

const symbolTargets = [
  // SIGNAL ZONE — top pyramid neighborhood only.
  // This zone is reserved for the late bright-blue reassignment, not early loader suppression.
  { x: 42.0, y: 20.5, zone: "symbol" },
  { x: 50.0, y: 17.8, zone: "symbol" },
  { x: 58.0, y: 20.5, zone: "symbol" },
  { x: 45.5, y: 27.0, zone: "symbol" },
  { x: 54.5, y: 27.0, zone: "symbol" }
];

const missTargets = [
  // Messy near-misses so the loader feels suppressed by zones, not traced by a ruler.
  { x: 20.5, y: 30.80, zone: "miss" },
  { x: 79.5, y: 32.80, zone: "miss" },
  { x: 32.0, y: 30.30, zone: "miss" },
  { x: 68.0, y: 33.10, zone: "miss" },
  { x: 45.0, y: 32.75, zone: "miss" },
  { x: 59.0, y: 30.15, zone: "miss" }
];

const coverageTargets = [...loaderTargets, ...symbolTargets, ...missTargets];

// CARL ZONE — Build 32 correction from Jinx sketch.
// Carl sits on the LEFT side of the loader. The single fate heart must look exactly like
// the other hearts until the top-right fan catches it. Then it gets violently shoved
// left/offscreen, overcorrects down to the bottom-left, and cuts upward into Carl.
const CARL_ZONE = { x: 20.5, y: 36.2 };
const CARL_HEART_START = { x: 88, y: 96 };
const CARL_HEART_PATH = [
  // Zone 1: same pink heart as the others. Slow reverse-leaf rise only.
  { left: "88%", top: "96%", transform: "translate(-50%, -50%) translateX(0px) scale(1) rotate(-4deg)", opacity: 0, offset: 0 },
  { left: "86%", top: "91%", transform: "translate(-50%, -50%) translateX(-5px) scale(1) rotate(2deg)", opacity: 0.78, offset: 0.08 },
  { left: "89%", top: "84%", transform: "translate(-50%, -50%) translateX(6px) scale(1) rotate(-2deg)", opacity: 0.86, offset: 0.18 },
  { left: "86%", top: "76%", transform: "translate(-50%, -50%) translateX(-7px) scale(1) rotate(3deg)", opacity: 0.92, offset: 0.30 },
  { left: "88%", top: "66%", transform: "translate(-50%, -50%) translateX(5px) scale(1) rotate(-3deg)", opacity: 0.96, offset: 0.42 },
  { left: "86%", top: "54%", transform: "translate(-50%, -50%) translateX(-6px) scale(1) rotate(4deg)", opacity: 0.98, offset: 0.54 },
  { left: "89%", top: "41%", transform: "translate(-50%, -50%) translateX(7px) scale(1) rotate(-2deg)", opacity: 1, offset: 0.64 },
  { left: "88%", top: "28%", transform: "translate(-50%, -50%) translateX(0px) scale(1) rotate(1deg)", opacity: 1, offset: 0.70 },

  // Zone 2: lower, visible top-right fan. It gets shoved left like a leaf, not guided.
  { left: "92%", top: "24%", transform: "translate(-50%, -50%) scale(1) rotate(20deg)", opacity: 1, offset: 0.735 },
  { left: "74%", top: "27%", transform: "translate(-50%, -50%) scale(1) rotate(38deg)", opacity: 1, offset: 0.765 },
  { left: "39%", top: "22%", transform: "translate(-50%, -50%) scale(1) rotate(-44deg)", opacity: 0.98, offset: 0.805 },
  { left: "5%", top: "27%", transform: "translate(-50%, -50%) scale(1) rotate(48deg)", opacity: 0.96, offset: 0.845 },
  { left: "-22%", top: "36%", transform: "translate(-50%, -50%) scale(1) rotate(-52deg)", opacity: 0.88, offset: 0.875 },

  // Zone 3: overcorrects low-left, then cuts upward into visible Carl.
  { left: "-16%", top: "82%", transform: "translate(-50%, -50%) scale(1) rotate(42deg)", opacity: 0.88, offset: 0.910 },
  { left: "4%", top: "96%", transform: "translate(-50%, -50%) scale(1) rotate(-34deg)", opacity: 0.97, offset: 0.935 },
  { left: "10%", top: "80%", transform: "translate(-50%, -50%) scale(1) rotate(25deg)", opacity: 1, offset: 0.955 },
  { left: "14%", top: "58%", transform: "translate(-50%, -50%) scale(1) rotate(-16deg)", opacity: 1, offset: 0.973 },
  { left: "17%", top: "44%", transform: "translate(-50%, -50%) scale(1) rotate(9deg)", opacity: 1, offset: 0.988 },

  // Fate/contact: actual hit on Carl. The zap starts here, not before.
  { left: `${CARL_ZONE.x}%`, top: `${CARL_ZONE.y}%`, transform: "translate(-50%, -50%) scale(1) rotate(0deg)", opacity: 1, offset: 0.997 },
  { left: `${CARL_ZONE.x}%`, top: `${CARL_ZONE.y}%`, transform: "translate(-50%, -50%) scale(0.72) rotate(0deg)", opacity: 0, offset: 1 }
];
function setProgress(value) {
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `${progress}%`;
  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if (state === "normal") progress += 0.16;
  if (state === "notice") progress += 0.035;
  if (state === "hide") progress += 0.23;

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
    // Pyramid/signal stays fully hidden until the true signal reveal.
  }

  if (progress >= 38 && !hiveWaveStarted) {
    hiveWaveStarted = true;
    beginHiveWave();
  }

  if (progress >= 42 && !burning) {
    burning = true;
    startBurnPulse();
  }

  // The fate heart starts at 17% as one of the normal hearts before avatar landing.
  if (progress >= 17.0 && !deadHeartReleased) {
    deadHeartReleased = true;
    releaseDeadHeartTowardCarl();
  }

  if (progress >= 55 && !generals) {
    generals = true;
    deployGenerals();
  }

  if (progress >= 62 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 24 && !frankSeen) {
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
  // Suppression routine: separate ugly bites, not a left-to-right highway.
  const openingBites = [0, 6, 3, 9];
  openingBites.forEach((targetIndex, index) => {
    const sides = ["left", "top", "right", "left", "top", "right", "left"];
    setTimeout(() => spawnProfile(sides[index] || randomSide(), 0, { force: loaderTargets[targetIndex] }), index * 260);
  });

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 760);

  engageTimer = setInterval(() => {
    if (completed) return;
    spawnEngagement();
  }, 1080);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 640);
}

function randomSide() {
  return ["top", "left", "right", "bottom"][Math.floor(Math.random() * 4)];
}

function jitter(value, amount) {
  return value + (-amount + Math.random() * amount * 2);
}

function spawnSlash(side) {
  const slash = document.createElement("div");
  slash.className = "slash";

  slash.style.left = Math.random() * 100 + "%";
  slash.style.top = Math.random() * 100 + "%";

  let sx = "0px";
  let sy = "0px";
  let r = "0deg";

  if (side === "top") {
    sy = "-120px";
    r = "90deg";
  }

  if (side === "bottom") {
    sy = "120px";
    r = "-90deg";
  }

  if (side === "left") {
    sx = "-160px";
    r = "0deg";
  }

  if (side === "right") {
    sx = "160px";
    r = "180deg";
  }

  slash.style.setProperty("--sx", sx);
  slash.style.setProperty("--sy", sy);
  slash.style.setProperty("--r", r);

  motionField.appendChild(slash);

  setTimeout(() => slash.remove(), 700);
}

function spawnEngagement() {
  // Background validation hearts stay sparse. The Carl clue heart is handled separately.
  if (Math.random() < 0.42) return;

  const item = document.createElement("div");
  item.className = "engage heart heart-story";
  item.textContent = "🩷";
  item.style.left = (82 + Math.random() * 12) + "%";
  item.style.top = (92 + Math.random() * 7) + "%";
  item.style.setProperty("--dur", (6.9 + Math.random() * 1.2) + "s");
  item.style.setProperty("--drift", Math.round(-18 + Math.random() * 36) + "px");

  engagementField.appendChild(item);
  engageCount++;

  if (progress >= 38) {
    setTimeout(() => { if (item.parentNode) item.textContent = "🩷"; }, 1150);
    setTimeout(() => { if (item.parentNode) item.textContent = "🩶"; }, 2650);
    setTimeout(() => { if (item.parentNode) item.textContent = "🖤"; }, 4400);
  }

  setTimeout(() => item.remove(), 8900);
}

function pickTarget() {
  const count = profileCount;

  // Before the final signal moment, pressure stays in messy zones around the loader.
  // It should suppress the bar, not draw a clean replacement bar over it.
  if (progress < 82) {
    if (count % 5 === 1 || count % 7 === 3) return missTargets[count % missTargets.length];
    return loaderTargets[(count * 3 + Math.floor(count / 2)) % loaderTargets.length];
  }

  // Late-stage reassignment may touch the signal/pyramid zone.
  if (count % 3 === 0) {
    return symbolTargets[count % symbolTargets.length];
  }

  return loaderTargets[count % loaderTargets.length];
}

function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 9) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const jitterX = target.zone === "symbol" ? 2.0 : target.zone === "miss" ? 2.25 : 1.85;
    const jitterY = target.zone === "symbol" ? 2.0 : target.zone === "miss" ? 1.15 : 0.95;
    const x = jitter(target.x, jitterX);
    const y = jitter(target.y, jitterY);

    profile.style.left = `calc(${x}% - ${AVATAR_HALF}px)`;
    profile.style.top = `calc(${y}% - ${AVATAR_HALF}px)`;
    profile.dataset.zone = target.zone;
    if (target.zone === "symbol") profile.classList.add("symbol-touch");
    if (target.zone === "loader") profile.classList.add("loader-cover");

    let sx = "0px";
    let sy = "0px";

    if (side === "top") sy = "-115vh";
    if (side === "bottom") sy = "115vh";
    if (side === "left") sx = "-115vw";
    if (side === "right") sx = "115vw";

    profile.style.setProperty("--sx", sx);
    profile.style.setProperty("--sy", sy);
    profile.innerHTML = `<img src="${asset}" alt="">`;

    profileField.appendChild(profile);
    profileCount++;

    spawnSlash(side);

    if (target.zone === "symbol" && progress >= 38) {
      setTimeout(() => revealHive(profile), 260 + Math.random() * 260);
    }

    setTimeout(() => {
      if (profile && profile.parentNode && !profile.classList.contains("carl") && !profile.classList.contains("frank")) {
        profile.remove();
      }
    }, target.zone === "symbol" ? 7600 : 5200);
  }, delay);
}

function revealHive(profile) {
  if (!profile || !profile.parentNode) return;
  if (profile.classList.contains("wren")) return;
  if (profile.classList.contains("frank")) return;
  if (profile.dataset.zone !== "symbol") return;

  profile.classList.add("mask-dropping");

  setTimeout(() => {
    if (!profile || !profile.parentNode) return;

    const image = profile.querySelector("img");
    if (image) {
      const asset = hiveAssets[profileCount % hiveAssets.length];
      image.src = asset;
    }

    profile.classList.add("hive-reveal", "has-hive-asset");

    setTimeout(() => {
      if (profile && profile.parentNode) profile.classList.add("pixel-deteriorate");
    }, 4300);

    setTimeout(() => {
      if (profile && profile.parentNode) profile.classList.add("hive-dissolve");
    }, 5100);

    setTimeout(() => {
      if (profile && profile.parentNode) profile.remove();
    }, 6900);
  }, 230);
}

function beginHiveWave() {
  const nearSignal = [...profileField.querySelectorAll(".profile.symbol-touch")].slice(0, 5);

  nearSignal.forEach((profile, index) => {
    setTimeout(() => revealHive(profile), index * 180);
  });
}

function startBurnPulse() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const ring = document.createElement("div");
      ring.className = "burn-ring";
      impactField.appendChild(ring);
      setTimeout(() => ring.remove(), 950);
    }, i * 650);
  }
}

function deployGenerals() {
  checkGenerals.classList.add("active");

  const gens = [...checkGenerals.querySelectorAll(".general")];

  setTimeout(() => {
    gens.forEach(general => general.classList.add("verify"));
  }, 700);

  setTimeout(() => {
    gens.forEach(general => {
      general.classList.remove("verify");
      general.classList.add("target");
      general.querySelector("small").textContent = "target";
    });
  }, 1300);

  [0, 1, 2].forEach(index => {
    setTimeout(() => fireBlast(index), 1700 + index * 260);
  });
}

function fireBlast(index) {
  const blast = document.createElement("div");
  blast.className = "blast";
  blast.style.setProperty("--a", [-18, 0, 18][index] + "deg");

  impactField.appendChild(blast);

  setTimeout(() => blast.remove(), 430);

  for (let i = 0; i < 3; i++) {
    setTimeout(() => spawnProfile(["left", "right", "top"][i]), i * 80);
  }
}

function spawnCarl() {
  const existingCarl = profileField.querySelector(".profile.carl");
  if (existingCarl) return existingCarl;

  const carl = document.createElement("button");
  carl.className = "profile carl carl-zone-anchor";
  carl.type = "button";
  carl.setAttribute("aria-label", "Carl Gates");

  carl.style.left = `calc(${CARL_ZONE.x}% - ${AVATAR_HALF}px)`;
  carl.style.top = `calc(${CARL_ZONE.y}% - ${AVATAR_HALF}px)`;
  carl.style.setProperty("--sx", "-72px");
  carl.style.setProperty("--sy", "0px");
  carl.style.setProperty("z-index", "118", "important");
  carl.style.opacity = "1";
  carl.style.setProperty("filter", "brightness(1.08) contrast(1.04)", "important");
  carl.innerHTML = `<img src="AssetCARL.PNG" alt="">`;

  profileField.appendChild(carl);

  // Carl stays visible until the heart makes contact. The cover-up happens after the flicker.

  carl.addEventListener("click", () => {
    if (!carl.classList.contains("carl-ready")) return;
    openCarlProfile();
  }, { once: true });

  setTimeout(() => {
    if (carl && carl.parentNode && !carlTriggered) {
      carl.classList.add("burying");
      setTimeout(() => carl.remove(), 460);
    }
  }, 18200);

  return carl;
}

function releaseDeadHeartTowardCarl() {
  let carl = null;

  const heart = document.createElement("div");
  heart.className = "engage heart heart-story fate-carl-heart";
  heart.textContent = "🩷";
  heart.style.left = `${CARL_HEART_START.x}%`;
  heart.style.top = `${CARL_HEART_START.y}%`;
  heart.style.opacity = "0";
  heart.style.animation = "none";

  engagementField.appendChild(heart);

  const flight = heart.animate(CARL_HEART_PATH, {
    duration: 36000,
    easing: "cubic-bezier(.16,.62,.18,1)",
    fill: "forwards"
  });

  // Top-right fan hit: after this, it is no longer just another heart.
  setTimeout(() => {
    if (!heart.parentNode) return;
    heart.classList.add("off-course");
  }, 26200);

  // Carl comes back as a visible left-loader bystander before the curl hits him.
  setTimeout(() => {
    if (!heart.parentNode || carlSeen) return;
    carlSeen = true;
    carl = spawnCarl();
  }, 30400);

  // Contact only: when the heart reaches Carl's pocket, the zap starts immediately.
  setTimeout(() => {
    carl = carl || profileField.querySelector(".profile.carl") || spawnCarl();
    if (heart && heart.parentNode) heart.remove();
    triggerCarl(carl);
  }, 35820);

  flight.onfinish = () => {
    if (heart && heart.parentNode) heart.remove();
  };

  setTimeout(() => {
    if (heart && heart.parentNode) heart.remove();
  }, 36900);
}

function triggerCarl(carl) {
  if (!carl || !carl.parentNode || carlTriggered) return;

  carlTriggered = true;

  // Snake bite: contact makes Carl readable and red-flickering immediately.
  carl.classList.add("carl-impact-visible", "carl-ready", "carl-ring-death");
  carl.style.setProperty("z-index", "140", "important");
  carl.style.setProperty("pointer-events", "auto", "important");
  carl.style.setProperty("filter", "sepia(1) saturate(4.8) hue-rotate(310deg) brightness(1.34) contrast(1.25)", "important");
  carl.style.setProperty("box-shadow", "0 0 18px rgba(255, 30, 70, 0.95), 0 0 34px rgba(255, 0, 55, 0.42)", "important");

  setTimeout(() => {
    if (!carlOpened) {
      carl.classList.remove("carl-ready");
      carl.style.setProperty("pointer-events", "none", "important");
    }
  }, 1900);

  setTimeout(() => {
    if (!carl || !carl.parentNode) return;

    carl.classList.remove("carl-ring-death", "carl-ready", "carl-impact-visible");
    carl.classList.add("burying");

    const directCover = { x: CARL_ZONE.x, y: CARL_ZONE.y, zone: "loader", cluster: "carl-cover" };
    const coverRing = [
      directCover,
      { x: CARL_ZONE.x - 3.2, y: CARL_ZONE.y + 0.25, zone: "loader", cluster: "carl-cover-left" },
      { x: CARL_ZONE.x + 2.4, y: CARL_ZONE.y - 0.18, zone: "loader", cluster: "carl-cover-right" },
      { x: CARL_ZONE.x - 1.0, y: CARL_ZONE.y + 1.25, zone: "loader", cluster: "carl-cover-low" }
    ];

    for (let i = 0; i < 5; i++) {
      const burialTarget = coverRing[i % coverRing.length];
      setTimeout(() => spawnProfile(i % 2 ? "right" : "left", 0, { force: burialTarget }), i * 120);
    }

    setTimeout(() => carl.remove(), 1250);
  }, 1850);
}

function openCarlProfile() {
  closeFounderWindow();
  carlOpened = true;
  carlProfile.classList.add("open");
  carlProfile.setAttribute("aria-hidden", "false");
  startWoundPulse();
}

function closeCarlProfile() {
  carlProfile.classList.remove("open");
  carlProfile.setAttribute("aria-hidden", "true");
  closeCarlPhotos();
  closeHiveFile();
  stopWoundPulse();

  signalNode.classList.add("ready");
  signalNode.classList.remove("fade-out");
  signalNode.style.pointerEvents = "auto";
}

function startWoundPulse() {
  if (!carlProfilePortal || hiveWoundUsed) return;
  stopWoundPulse();

  const pulse = () => {
    if (!carlProfile.classList.contains("open") || hiveWoundUsed) return;
    if (carlCard) carlCard.classList.add("dating-page-glitch");
    if (hiveWound) hiveWound.classList.add("pulse-open");
    carlProfilePortal.classList.add("portal-open");
    setTimeout(() => {
      if (carlCard) carlCard.classList.remove("dating-page-glitch");
      if (hiveWound) hiveWound.classList.remove("pulse-open");
      if (carlProfilePortal) carlProfilePortal.classList.remove("portal-open");
    }, 1080);
  };

  woundPulseTimer = setInterval(pulse, 17000);
}

function stopWoundPulse() {
  clearInterval(woundPulseTimer);
  woundPulseTimer = null;
  if (hiveWound) hiveWound.classList.remove("pulse-open");
  if (carlProfilePortal) carlProfilePortal.classList.remove("portal-open");
  if (carlCard) carlCard.classList.remove("dating-page-glitch");
}

function openCarlPhotos() {
  if (!carlPhotoModal) return;
  carlPhotoModal.classList.add("open");
  carlPhotoModal.setAttribute("aria-hidden", "false");
}

function closeCarlPhotos() {
  if (!carlPhotoModal) return;
  carlPhotoModal.classList.remove("open");
  carlPhotoModal.setAttribute("aria-hidden", "true");
}

function openHiveMindCarlFile() {
  closeFounderWindow();
  if (!carlProfilePortal || !carlProfilePortal.classList.contains("portal-open") || hiveWoundUsed) return;
  hiveCarlFile.classList.add("open");
  hiveCarlFile.setAttribute("aria-hidden", "false");
  hiveWoundUsed = true;
  if (hiveWound) hiveWound.classList.add("used");
  stopWoundPulse();
}

function openHiveFile() {
  openHiveMindCarlFile();
}

function closeHiveFile() {
  if (!hiveCarlFile) return;
  hiveCarlFile.classList.remove("open");
  hiveCarlFile.setAttribute("aria-hidden", "true");
}

carlClose.addEventListener("click", closeCarlProfile);
if (carlPhotosButton) carlPhotosButton.addEventListener("click", openCarlPhotos);
if (carlPhotoClose) carlPhotoClose.addEventListener("click", closeCarlPhotos);
if (hiveWound) hiveWound.addEventListener("click", openHiveMindCarlFile);
if (carlProfilePortal) carlProfilePortal.addEventListener("click", openHiveMindCarlFile);
if (hiveClose) hiveClose.addEventListener("click", closeCarlProfile);
if (survivorChalk) survivorChalk.addEventListener("click", event => { event.preventDefault(); survivorChalk.classList.add("found"); });
if (takeCampTest && campTestModal) {
  takeCampTest.addEventListener("click", () => {
    campTestModal.classList.add("open");
    campTestModal.setAttribute("aria-hidden", "false");
    if (campResult) campResult.textContent = "Awaiting human selection.";
  });
}
if (campTestClose && campTestModal) {
  campTestClose.addEventListener("click", () => {
    campTestModal.classList.remove("open");
    campTestModal.setAttribute("aria-hidden", "true");
  });
}
document.querySelectorAll(".camp-answer").forEach(button => {
  button.addEventListener("click", () => {
    if (campResult) campResult.textContent = "Result: HIGHLY COMPATIBLE. Human campfire preference confirmed.";
  });
});
if (expandTestimonials) {
  expandTestimonials.addEventListener("click", () => {
    const block = expandTestimonials.closest(".testimonials");
    if (!block) return;
    block.classList.toggle("expanded");
    expandTestimonials.textContent = block.classList.contains("expanded") ? "COLLAPSE TESTIMONIALS" : "EXPAND TESTIMONIALS";
  });
}


document.querySelectorAll(".photo-thumb").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".photo-thumb").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    if (carlPhotoLarge) carlPhotoLarge.src = button.dataset.src;
    if (carlPhotoCaption) carlPhotoCaption.textContent = button.dataset.caption;
  });
});

function spawnWren() {
  const wren = document.createElement("div");
  wren.className = "profile wren stubborn";

  wren.style.left = `calc(50% - ${AVATAR_HALF}px)`;
  wren.style.top = `calc(31% - ${AVATAR_HALF}px)`;
  wren.style.setProperty("--sx", "70px");
  wren.style.setProperty("--sy", "-38px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-notice");
  }, 1500);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-fade-home");
  }, 2800);

  setTimeout(() => {
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = "50%";
    pulse.style.top = "31%";
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 3600);
    setTimeout(armJinxShadowFrequency, 900);
  }, 3500);

  setTimeout(() => {
    if (wren && wren.parentNode) wren.remove();
  }, 4300);
}

function spawnFrank() {
  if (frankDutyStarted) return;
  frankDutyStarted = true;
  turtle.classList.add("covered-by-frank");

  const frankPositions = [
    // FRANK ZONE — green-cross center only. Frank overlaps Frank; nobody else belongs here.
    { x: 50.0, y: 45.4, sx: "-44px", sy: "34px" },
    { x: 50.7, y: 45.0, sx: "-38px", sy: "28px" },
    { x: 49.3, y: 45.7, sx: "-52px", sy: "30px" },
    { x: 50.2, y: 44.9, sx: "-45px", sy: "24px" },
    { x: 49.7, y: 45.8, sx: "-56px", sy: "32px" },
    { x: 50.9, y: 45.5, sx: "-40px", sy: "36px" }
  ];

  frankPositions.forEach((pos, index) => {
    setTimeout(() => {
      const frank = document.createElement("div");
      frank.className = "profile frank frank-stack";
      frank.style.left = `calc(${pos.x}% - ${AVATAR_HALF}px)`;
      frank.style.top = `calc(${pos.y}% - ${AVATAR_HALF}px)`;
      frank.style.setProperty("--sx", pos.sx);
      frank.style.setProperty("--sy", pos.sy);
      frank.style.zIndex = String(22 + index);
      frank.innerHTML = `<img src="AssetFRANK.PNG" alt="">`;
      profileField.appendChild(frank);
      activeFrankStack.push(frank);
    }, index * 820);
  });

  setTimeout(playBlueFrankSequence, 9300);
}

function playBlueFrankSequence() {
  if (frankDutyFramesPlayed) return;
  frankDutyFramesPlayed = true;

  activeFrankStack = activeFrankStack.filter(node => node && node.parentNode);
  const lead = activeFrankStack[activeFrankStack.length - 1];
  activeFrankStack.slice(0, -1).forEach((node, index) => {
    setTimeout(() => { if (node && node.parentNode) node.classList.add("frank-fade-under"); }, index * 130);
  });

  if (!lead || !lead.parentNode) {
    turtle.classList.remove("covered-by-frank");
    return;
  }

  lead.classList.add("blue-frank", "frank-processing");
  const img = lead.querySelector("img");
  const frameTimes = [0, 620, 1240, 1900, 2580, 3300];
  frameTimes.forEach((time, index) => {
    setTimeout(() => {
      if (img && lead.parentNode) img.src = frankFrames[index];
    }, time);
  });

  setTimeout(() => {
    if (lead && lead.parentNode) lead.classList.add("frank-final-hold");
  }, 3300);

  setTimeout(() => {
    if (lead && lead.parentNode) lead.classList.add("hive-dissolve");
    activeFrankStack.forEach(node => { if (node && node.parentNode && node !== lead) node.remove(); });
    turtle.classList.remove("covered-by-frank");
  }, 6100);

  setTimeout(() => {
    if (lead && lead.parentNode) lead.remove();
  }, 7600);
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

  setTimeout(() => {
    loaderScene.classList.add("portal-open");
  }, 2650);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 3400);

  setTimeout(() => {
    loaderScene.classList.add("portal-close");
  }, 7050);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 7350);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 8200);
}

function openChannel() {
  if (!signalNode.classList.contains("ready")) return;
  closeFounderWindow();

  signalNode.style.pointerEvents = "none";
  if (navigator.vibrate) navigator.vibrate(34);

  signalNode.classList.add("pressed");
  outerSymbol.classList.add("dissolve");
  innerSymbol.classList.add("alive");

  // Surgical restore: the wall breaks with green maze pulses, then the station settles in.
  maze.classList.add("active");

  setTimeout(() => {
    signalNode.classList.add("fade-out");
  }, 1500);

  setTimeout(() => {
    maze.classList.remove("active");
    home.classList.add("open");
    idleMaze.classList.add("active");
  }, 2200);
}

signalNode.addEventListener("click", openChannel);

signalNode.addEventListener("touchend", event => {
  event.preventDefault();
  openChannel();
}, {
  passive: false
});


function c17UpdateLoaderPercentPass43() {
  const percent = document.getElementById("percent");
  const fill = document.getElementById("fill");
  if (!percent) return;

  let value = 0;

  if (fill) {
    const inlineWidth = fill.style.width || "";
    const parsed = parseFloat(String(inlineWidth).replace("%", ""));
    if (Number.isFinite(parsed)) value = parsed;
  }

  // Fallback: if inline style hasn't updated yet, try computed width.
  if ((!value || value < 0.5) && fill && fill.parentElement) {
    const fw = fill.getBoundingClientRect().width;
    const pw = fill.parentElement.getBoundingClientRect().width;
    if (pw > 0) value = (fw / pw) * 100;
  }

  value = Math.max(0, Math.min(100, Math.round(value)));
  percent.textContent = value + "%";
}

setInterval(c17UpdateLoaderPercentPass43, 50);
window.addEventListener("load", c17UpdateLoaderPercentPass43);
