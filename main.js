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
let heartSmokeStarted = false;
let heartSmokeSpawnCount = 0;
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

if (loaderScene) {
  loaderScene.classList.add("booting-in");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => loaderScene.classList.add("boot-visible"));
  });
}
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
  }, 520);
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
  // Not a road/highway and not one spinning blob.
  // Virus logic attacks the loader face: far left, far right, center, then exposed gaps.
  // ZIP28 correction: band dropped one small tick from the too-high pass so the circles sit ON the bar, not above it.
  { x: 24.0, y: 31.15, zone: "loader", cluster: "bar-left-edge" },
  { x: 76.0, y: 31.15, zone: "loader", cluster: "bar-right-edge" },
  { x: 50.0, y: 31.00, zone: "loader", cluster: "bar-center" },
  { x: 36.0, y: 31.30, zone: "loader", cluster: "bar-left-gap" },
  { x: 64.0, y: 31.30, zone: "loader", cluster: "bar-right-gap" },
  { x: 30.0, y: 30.70, zone: "loader", cluster: "bar-left-high" },
  { x: 70.0, y: 30.70, zone: "loader", cluster: "bar-right-high" },
  { x: 43.0, y: 31.75, zone: "loader", cluster: "bar-center-left" },
  { x: 57.0, y: 31.75, zone: "loader", cluster: "bar-center-right" },
  { x: 27.5, y: 32.05, zone: "loader", cluster: "bar-left-low" },
  { x: 72.5, y: 31.95, zone: "loader", cluster: "bar-right-low" }
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
  // Loader-edge pressure only. No random drift into Frank/turtle territory.
  // ZIP28 correction: right-side misses stay inside the loader lane.
  { x: 22.0, y: 32.55, zone: "miss" },
  { x: 78.0, y: 32.35, zone: "miss" },
  { x: 33.0, y: 32.60, zone: "miss" },
  { x: 67.0, y: 32.50, zone: "miss" }
];

const coverageTargets = [...loaderTargets, ...symbolTargets, ...missTargets];

// CARL ZONE — maintenance accident canon.
// Carl is just another avatar on the left side of the loader.
// Hearts begin at 17% as sparse field-smoke, not a wall and not a lane.
// One pink heart rises like the others, gets flicked by the top-right system/fan, visibly breaks on-screen,
// then overcorrects through a fast wind curl and completes an electric edge-contact with Carl.
const CARL_ZONE = { x: 21.5, y: 31.25 };
const CARL_HEART_START = { x: 83, y: 96 };
const CARL_HEART_CONTACT = { x: CARL_ZONE.x - 7.0, y: CARL_ZONE.y + 0.05 };
const CARL_HEART_PATH = [
  // Normal-heart climb. Same read as the field hearts until the top-right maintenance flick.
  { left: "82%", top: "96%", transform: "translate(-50%, -50%) scale(1.02) rotate(-5deg)", opacity: 0, offset: 0 },
  { left: "84%", top: "82%", transform: "translate(-50%, -50%) scale(1.04) rotate(3deg)", opacity: 0.9, offset: 0.11 },
  { left: "81%", top: "66%", transform: "translate(-50%, -50%) scale(1.05) rotate(-3deg)", opacity: 1, offset: 0.24 },
  { left: "85%", top: "47%", transform: "translate(-50%, -50%) scale(1.07) rotate(5deg)", opacity: 1, offset: 0.37 },
  { left: "82%", top: "27%", transform: "translate(-50%, -50%) scale(1.08) rotate(-4deg)", opacity: 1, offset: 0.49 },
  { left: "84%", top: "13%", transform: "translate(-50%, -50%) scale(1.10) rotate(2deg)", opacity: 1, offset: 0.565 },

  // Visible on-screen rejection: the top-right system/finger flicks it left and breaks it.
  { left: "82%", top: "14%", transform: "translate(-50%, -50%) scale(1.15) rotate(-18deg)", opacity: 1, offset: 0.595 },
  { left: "58%", top: "15%", transform: "translate(-50%, -50%) scale(1.20) rotate(35deg)", opacity: 1, offset: 0.645 },
  { left: "24%", top: "19%", transform: "translate(-50%, -50%) scale(1.24) rotate(-46deg)", opacity: 1, offset: 0.70 },
  { left: "-10%", top: "29%", transform: "translate(-50%, -50%) scale(1.23) rotate(42deg)", opacity: 1, offset: 0.755 },

  // Overcorrect: bottom-left phone space, big curl upward, forbidden edge contact with Carl.
  { left: "2%", top: "78%", transform: "translate(-50%, -50%) scale(1.20) rotate(-32deg)", opacity: 1, offset: 0.815 },
  { left: "11%", top: "82%", transform: "translate(-50%, -50%) scale(1.18) rotate(25deg)", opacity: 1, offset: 0.865 },
  { left: "16%", top: "62%", transform: "translate(-50%, -50%) scale(1.16) rotate(-18deg)", opacity: 1, offset: 0.918 },
  { left: `${CARL_HEART_CONTACT.x}%`, top: `${CARL_HEART_CONTACT.y}%`, transform: "translate(-50%, -50%) scale(1.16) rotate(-8deg)", opacity: 1, offset: 0.982 },
  { left: `${CARL_HEART_CONTACT.x}%`, top: `${CARL_HEART_CONTACT.y}%`, transform: "translate(-50%, -50%) scale(1.34) rotate(-8deg)", opacity: 0, offset: 1 }
];

function setProgress(value) {
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `${progress}%`;
  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if (state === "normal") progress += 0.16;
  if (state === "notice") progress += 0.072;
  if (state === "hide") progress += 0.18;

  if (progress >= 17 && !noticed) {
    noticed = true;
    state = "notice";
    turtle.classList.remove("walk");
    turtle.classList.add("notice");
    loader.classList.add("offcourse");
    if (!heartSmokeStarted) {
      heartSmokeStarted = true;
      startHeartSmoke();
    }
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

  if (progress >= 20 && !ghosted) {
    ghosted = true;
    // Faint signal ghost returns around the early authenticity breach so the symbol is not visually dead until the end.
    signalGhost.classList.add("waking");
  }

  if (progress >= 88 && !hiveWaveStarted) {
    hiveWaveStarted = true;
    beginHiveWave();
  }

  if (progress >= 76 && !burning) {
    burning = true;
    signalGhost.classList.add("burning");
    startBurnPulse();
  }

  // FOREMAN MODE: hearts-only pass.
  // Carl's special broken-heart event is intentionally paused until the regular heart field is approved.

  if (progress >= 88 && !generals) {
    generals = true;
    deployGenerals();
  }

  if (progress >= 98 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 19.2 && !carlSeen) {
    carlSeen = true;
    setTimeout(() => spawnCarl(), 880);
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

function startHeartSmoke() {
  // FOREMAN MODE — HEART FIELD ONLY.
  // Start with one validation heart, then let the field grow naturally: and then another... and another.
  // Pink/red only. No Carl heart. No broken-heart event. No zones.
  if (engageTimer) return;
  heartSmokeSpawnCount = 0;
  spawnEngagement({ guaranteed: true });

  engageTimer = setInterval(() => {
    if (completed) return;

    heartSmokeSpawnCount++;
    spawnEngagement({ guaranteed: true });

    // As the infestation grows, occasional extra hearts appear with human-feeling delay.
    if (heartSmokeSpawnCount > 3 && Math.random() < 0.34) {
      setTimeout(() => { if (!completed) spawnEngagement({ guaranteed: true }); }, 360 + Math.random() * 520);
    }
    if (heartSmokeSpawnCount > 8 && Math.random() < 0.22) {
      setTimeout(() => { if (!completed) spawnEngagement({ guaranteed: true }); }, 760 + Math.random() * 620);
    }
  }, 1320);
}

function startAttack() {
  // Maintenance reaction, not martial law: bam... wait... bam.
  // The system casually covers exposed authenticity pixels; it does not machine-gun the loader.
  const earlyTargets = [loaderTargets[1], loaderTargets[4], loaderTargets[2], loaderTargets[7], loaderTargets[8]];
  earlyTargets.forEach((target, index) => {
    const sides = ["right", "left", "top", "left", "right"];
    setTimeout(() => spawnProfile(sides[index] || randomSide(), 0, { force: target }), 720 + index * 1720);
  });

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 2460);

  if (!engageTimer) {
    engageTimer = setInterval(() => {
      if (completed) return;
      spawnEngagement();
    }, 980);
  }

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 2250);
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

function spawnEngagement(options = {}) {
  // FOREMAN HEART PASS 4: keep the approved right-lane heart motion, add rare social-noise icons only.
  // Hearts stay dominant. Icons are seasoning: likes / reposts / subscribe-play / gold bell. No center-screen drift.
  if (!options.guaranteed && engageCount > 0 && Math.random() < 0.30) return;

  const item = document.createElement("div");

  let symbol = Math.random() < 0.58 ? "🩷" : "❤️";
  let iconClass = "heart";

  // Foreman correction: social noise must actually be visible, but hearts still dominate.
  // First three emissions stay pure hearts. After that, every fifth field item is a social icon,
  // with a small extra random chance between them. Same lane, same float, no new motion language.
  if (heartSmokeSpawnCount > 3) {
    const iconCycle = ["👍", "🔔", "🔁", "▶️"];
    const cycleClass = ["like", "bell", "repost", "subscribe"];
    const cycleIndex = Math.floor((heartSmokeSpawnCount - 4) / 5) % iconCycle.length;
    const scheduledIcon = ((heartSmokeSpawnCount - 4) % 5) === 0;
    const bonusIcon = !scheduledIcon && Math.random() < 0.10;

    if (scheduledIcon || bonusIcon) {
      symbol = iconCycle[cycleIndex];
      iconClass = cycleClass[cycleIndex];
    }
  }

  item.className = `engage heart-story social-smoke ${iconClass}`;
  item.textContent = symbol;

  // Keep the field in the approved right-side lane. Variation is vertical timing/spacing, not wandering across the phone.
  const laneX = 72 + Math.random() * 18;
  const startY = 96 + Math.random() * 8;
  const dur = 8.6 + Math.random() * 1.8;
  const laneDrift = -10 + Math.random() * 20;
  const softSwayA = -5 + Math.random() * 10;
  const softSwayB = -4 + Math.random() * 8;

  item.style.left = laneX + "%";
  item.style.top = startY + "%";
  item.style.setProperty("--dur", dur.toFixed(2) + "s");
  item.style.setProperty("--drift", Math.round(laneDrift) + "px");
  item.style.setProperty("--bob-a", Math.round(softSwayA) + "px");
  item.style.setProperty("--bob-b", Math.round(softSwayB) + "px");
  item.style.setProperty("--heart-scale", (0.96 + Math.random() * 0.16).toFixed(2));

  engagementField.appendChild(item);
  engageCount++;

  const fadeAt = Math.max(6500, (dur * 1000) - 1000);
  setTimeout(() => { if (item.parentNode) item.classList.add("heart-fade-black"); }, fadeAt);
  setTimeout(() => item.remove(), (dur * 1000) + 900);
}

function pickTarget() {
  const count = profileCount;

  // Before the final signal moment, all general avatar pressure belongs to the loader bar.
  // Use a gap-seeking order so it feels like the machine is covering exposed authenticity.
  if (progress < 82) {
    if (count % 10 === 5) return missTargets[count % missTargets.length];
    const safeTargets = loaderTargets.filter(target => Math.abs(target.x - CARL_ZONE.x) > 7.0);
    return safeTargets[count % safeTargets.length];
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
    if (old.length > 10) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const jitterX = target.zone === "symbol" ? 2.0 : target.zone === "miss" ? 1.45 : 1.22;
    const jitterY = target.zone === "symbol" ? 2.0 : target.zone === "miss" ? 0.18 : 0.16;
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

    if (target.zone === "symbol" && progress >= 82) {
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
  carl.className = "profile carl carl-zone-anchor carl-wrong-place";
  carl.type = "button";
  carl.setAttribute("aria-label", "Carl Gates");

  carl.style.left = `calc(${CARL_ZONE.x}% - ${AVATAR_HALF}px)`;
  carl.style.top = `calc(${CARL_ZONE.y}% - ${AVATAR_HALF}px)`;
  carl.style.setProperty("--sx", "-82px");
  carl.style.setProperty("--sy", "8px");
  carl.innerHTML = `<img src="AssetCARL.PNG" alt="">`;

  profileField.appendChild(carl);

  // Carl is just another avatar until the broken heart completes the circuit.
  carl.addEventListener("click", () => {
    if (!carl.classList.contains("carl-ready")) return;
    openCarlProfile();
  }, { once: true });

  setTimeout(() => {
    if (carl && carl.parentNode && !carlTriggered) {
      carl.classList.add("burying");
      setTimeout(() => carl.remove(), 460);
    }
  }, 22000);

  return carl;
}

function releaseDeadHeartTowardCarl() {
  let carl = null;

  const heart = document.createElement("div");
  heart.className = "engage carl-trigger-heart asset-heart pink-stage";
  heart.style.left = `${CARL_HEART_START.x}%`;
  heart.style.top = `${CARL_HEART_START.y}%`;
  heart.style.opacity = "0";
  // Override old CSS-route experiments from previous builds; this path is owned by JS.
  heart.style.setProperty("animation", "none", "important");
  heart.style.setProperty("width", "78px", "important");
  heart.style.setProperty("height", "78px", "important");
  heart.innerHTML = `
    <img class="carl-heart-layer carl-heart-pink" src="${HEART_PINK}" alt="">
    <img class="carl-heart-layer carl-heart-grey" src="${HEART_GREY}" alt="">
  `;

  engagementField.appendChild(heart);

  const flightDuration = 6100;
  const flight = heart.animate(CARL_HEART_PATH, {
    duration: flightDuration,
    easing: "cubic-bezier(.2,.72,.08,1)",
    fill: "forwards"
  });

  // Carl lands as one normal avatar while the heart is still only background smoke.
  setTimeout(() => {
    if (!heart.parentNode) return;
    carl = profileField.querySelector(".profile.carl") || spawnCarl();
    carlSeen = true;
  }, 1250);

  // The top-right fan rejects it. This is when the pink heart becomes the gray broken-heart PNG.
  setTimeout(() => {
    if (!heart.parentNode) return;
    heart.classList.add("off-course", "draining", "grey-taking-over");
  }, 3620);

  setTimeout(() => {
    if (!heart.parentNode) return;
    heart.classList.remove("pink-stage", "draining");
    heart.classList.add("dead-stage");
  }, 4050);

  // Static-zap contact: edge of the broken heart enters Carl's ring and the circuit completes.
  setTimeout(() => {
    carl = carl || profileField.querySelector(".profile.carl") || spawnCarl();
    spawnCarlZap();
    if (heart && heart.parentNode) heart.remove();
    triggerCarl(carl);
  }, 5990);

  flight.onfinish = () => {
    if (heart && heart.parentNode) heart.remove();
  };

  setTimeout(() => {
    if (heart && heart.parentNode) heart.remove();
  }, flightDuration + 900);
}

function spawnCarlZap() {
  const zap = document.createElement("div");
  zap.className = "carl-zap-spark";
  zap.style.left = `${CARL_ZONE.x - 6.2}%`;
  zap.style.top = `${CARL_ZONE.y}%`;
  impactField.appendChild(zap);
  setTimeout(() => zap.remove(), 520);
}

function triggerCarl(carl) {
  if (!carl || !carl.parentNode || carlTriggered) return;

  carlTriggered = true;

  // Snake bite: forbidden field connection makes Carl readable and red-flickering immediately.
  carl.classList.add("carl-impact-visible", "carl-ready", "carl-ring-death");

  setTimeout(() => {
    if (!carlOpened) {
      carl.classList.remove("carl-ready");
    }
  }, 2600);

  setTimeout(() => {
    if (!carl || !carl.parentNode) return;

    carl.classList.remove("carl-ring-death", "carl-ready", "carl-impact-visible");
    carl.classList.add("burying");

    const coverRing = [
      { x: CARL_ZONE.x + 0.2, y: CARL_ZONE.y + 0.05, zone: "loader", cluster: "carl-cover" },
      { x: CARL_ZONE.x + 3.0, y: CARL_ZONE.y - 0.10, zone: "loader", cluster: "carl-cover-right" },
      { x: CARL_ZONE.x - 2.7, y: CARL_ZONE.y + 0.30, zone: "loader", cluster: "carl-cover-left" }
    ];

    coverRing.forEach((burialTarget, i) => {
      setTimeout(() => spawnProfile(i % 2 ? "right" : "left", 0, { force: burialTarget }), i * 520);
    });

    setTimeout(() => carl.remove(), 1900);
  }, 2750);
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
    }, 920);
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

  lead.classList.add("frank-processing");
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
  }, 4480);

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
