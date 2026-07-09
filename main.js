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
let poemNoteOverlay = null;

let progress = 0;
let state = "normal";
let completed = false;
let noticed = false;
let hidden = false;
let breached = false;
let ghosted = false;
let burning = false;
let generals = false;
let loaderCoverageDone = false;
let symbolBattleStarted = false;

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
let secretFlameReleased = false;
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

// FOREMAN MODE — LOADER FADE-IN ONLY.
// Screen starts black/quiet, then the loader scene fades in before progress begins.
const LOADER_BOOT_DELAY_MS = 780;
const LOADER_FADE_IN_MS = 1680;
let loaderBootComplete = false;

if (loaderScene) {
  loaderScene.classList.add("booting-in");
  setTimeout(() => {
    loaderScene.classList.add("boot-visible");
  }, LOADER_BOOT_DELAY_MS);
  setTimeout(() => {
    loaderBootComplete = true;
  }, LOADER_BOOT_DELAY_MS + LOADER_FADE_IN_MS);
} else {
  loaderBootComplete = true;
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


function ensurePoemNoteOverlay() {
  if (poemNoteOverlay) return poemNoteOverlay;

  poemNoteOverlay = document.createElement("aside");
  poemNoteOverlay.className = "poem-note-overlay";
  poemNoteOverlay.id = "poemNoteOverlay";
  poemNoteOverlay.setAttribute("aria-hidden", "true");
  poemNoteOverlay.innerHTML = `
    <section class="poem-note-card" role="dialog" aria-modal="true" aria-label="poem note">
      <button class="poem-note-close" id="poemNoteClose" type="button" aria-label="close poem note">×</button>
      <div class="poem-note-kicker">private frequency</div>
      <h2>poem note</h2>
      <div class="poem-note-paper">
        <p>Write the poem here.</p>
        <p class="poem-note-placeholder">This page is a placeholder for the secret flame.</p>
      </div>
    </section>
  `;
  document.body.appendChild(poemNoteOverlay);

  const close = poemNoteOverlay.querySelector("#poemNoteClose");
  close.addEventListener("click", closePoemNote);
  poemNoteOverlay.addEventListener("click", (event) => {
    if (event.target === poemNoteOverlay) closePoemNote();
  });

  return poemNoteOverlay;
}

function openPoemNote() {
  const overlay = ensurePoemNoteOverlay();
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closePoemNote() {
  if (!poemNoteOverlay) return;
  poemNoteOverlay.classList.remove("open");
  poemNoteOverlay.setAttribute("aria-hidden", "true");
}

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
  // C.17 LOADER BRICK — nine total on the loader bar: 8 regular profiles + Carl final-left.
  // No coin-roll stream. Each profile is a deliberate cover piece landing ON the bar.
  { x: 33.2, y: 34.18, zone: "loader", cluster: "loader-01" },
  { x: 39.1, y: 34.10, zone: "loader", cluster: "loader-02" },
  { x: 45.0, y: 34.22, zone: "loader", cluster: "loader-03" },
  { x: 50.9, y: 34.12, zone: "loader", cluster: "loader-04" },
  { x: 56.8, y: 34.24, zone: "loader", cluster: "loader-05" },
  { x: 62.7, y: 34.14, zone: "loader", cluster: "loader-06" },
  { x: 68.6, y: 34.22, zone: "loader", cluster: "loader-07" },
  { x: 74.5, y: 34.16, zone: "loader", cluster: "loader-08" }
];

const symbolTargets = [
  // C.17 SYMBOL: intentional blue contact points only. Bam... bam... bam. No end-swarm chaos.
  { x: 44.0, y: 21.2, zone: "symbol" },
  { x: 51.0, y: 18.8, zone: "symbol" },
  { x: 57.2, y: 22.2, zone: "symbol" },
  { x: 47.0, y: 27.0, zone: "symbol" },
  { x: 54.5, y: 26.2, zone: "symbol" }
];

const missTargets = [
  // Reserved drift/miss references. Loader/symbol zone logic should not lean on this during the current brick.
  { x: 22.0, y: 32.55, zone: "miss" },
  { x: 78.0, y: 32.35, zone: "miss" }
];

const coverageTargets = [...loaderTargets, ...symbolTargets, ...missTargets];

// CARL ZONE — maintenance accident canon.
// Carl is just another avatar on the left side of the loader.
// Hearts begin at 17% as sparse field-smoke, not a wall and not a lane.
// One pink heart rises like the others, gets flicked by the top-right system/fan, visibly breaks on-screen,
// then overcorrects through a fast wind curl and completes an electric edge-contact with Carl.
const CARL_ZONE = { x: 25.6, y: 34.18 };
const CARL_HEART_START = { x: 83, y: 96 };
const CARL_HEART_CONTACT = { x: CARL_ZONE.x + 4.0, y: CARL_ZONE.y + 0.05 };
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
  if (!loaderBootComplete) {
    setProgress(0);
    return;
  }

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

  if (progress >= 52 && !symbolBattleStarted) {
    startSymbolBattle();
  }

  if (progress >= 42 && !deadHeartReleased) {
    deadHeartReleased = true;
    releaseDeadHeartTowardCarl();
  }

  // Generals/end-swarm disabled for C.17 attack pass: no last-second blue chaos.

  if (progress >= 86 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  // Carl is now the final loader-bar avatar inside startAttack(), not an early separate spotlight.

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
  // LOADER BAR: regular profile burial only. Enough bodies to hide the bar, then Carl lands final on far-left/start.
  if (profileTimer) return;

  const sides = ["top", "right", "bottom", "left", "top", "right", "bottom", "left"];
  const slamDelays = [220, 430, 320, 560, 690, 610, 820, 760];
  loaderTargets.forEach((target, index) => {
    const side = sides[index % sides.length];
    setTimeout(() => spawnProfile(side, 0, { force: target, noAutoRemove: true, loaderBurial: true }), slamDelays[index]);
  });

  setTimeout(() => {
    if (!carlSeen) {
      carlSeen = true;
      spawnCarl();
    }
    loaderCoverageDone = true;
  }, 1040);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 4200);
}

function startSymbolBattle() {
  // SYMBOL: fewer blue avatars, harder readable impacts, faster hot-steel consumption.
  if (symbolBattleStarted) return;
  symbolBattleStarted = true;

  const attackCount = 12;
  for (let i = 0; i < attackCount; i++) {
    setTimeout(() => {
      if (completed) return;
      const target = symbolTargets[i % symbolTargets.length];
      spawnProfile(["top", "left", "right", "bottom"][i % 4], 0, { force: target, symbolProbe: true });
    }, i * 620);
  }
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

  if (!secretFlameReleased && heartSmokeSpawnCount > 9) {
    secretFlameReleased = true;
    symbol = "🔥";
    iconClass = "secret-flame";
  }

  item.className = `engage heart-story social-smoke ${iconClass}`;
  item.textContent = symbol;
  if (iconClass === "secret-flame") {
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "secret poem note");
    item.tabIndex = 0;
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      openPoemNote();
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPoemNote();
      }
    });
  }

  // Keep the field in the approved right-side lane. Variation is vertical timing/spacing, not wandering across the phone.
  let laneX = 72 + Math.random() * 18;
  let startY = 96 + Math.random() * 8;
  let dur = 8.6 + Math.random() * 1.8;
  let laneDrift = -10 + Math.random() * 20;
  let softSwayA = -5 + Math.random() * 10;
  let softSwayB = -4 + Math.random() * 8;
  let heartScale = 0.96 + Math.random() * 0.16;

  // FIRE BRICK 42: the secret flame is not a spring/slinky.
  // It rides the same right-side social-chaos lane as the hearts, but floats like one helium balloon:
  // steady lift, tiny drift, no aggressive bob, no bounce language.
  if (iconClass === "secret-flame") {
    laneX = 78 + Math.random() * 6;
    startY = 98 + Math.random() * 4;
    dur = 9.35 + Math.random() * 0.75;
    laneDrift = -4 + Math.random() * 8;
    softSwayA = -1 + Math.random() * 2;
    softSwayB = -1 + Math.random() * 2;
    heartScale = 1.02;
  }

  item.style.left = laneX + "%";
  item.style.top = startY + "%";
  item.style.setProperty("--dur", dur.toFixed(2) + "s");
  item.style.setProperty("--drift", Math.round(laneDrift) + "px");
  item.style.setProperty("--bob-a", Math.round(softSwayA) + "px");
  item.style.setProperty("--bob-b", Math.round(softSwayB) + "px");
  item.style.setProperty("--heart-scale", heartScale.toFixed(2));

  engagementField.appendChild(item);
  engageCount++;

  const fadeAt = Math.max(6500, (dur * 1000) - 1000);
  setTimeout(() => { if (item.parentNode) item.classList.add("heart-fade-black"); }, fadeAt);
  setTimeout(() => item.remove(), (dur * 1000) + 900);
}

function pickTarget() {
  const count = profileCount;
  if (!loaderCoverageDone) return loaderTargets[count % loaderTargets.length];
  if (symbolBattleStarted) return symbolTargets[count % symbolTargets.length];
  return loaderTargets[count % loaderTargets.length];
}

function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 110) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const jitterX = target.zone === "symbol" ? 0.88 : target.zone === "miss" ? 1.45 : 0.18;
    const jitterY = target.zone === "symbol" ? 0.72 : target.zone === "miss" ? 0.18 : 0.06;
    const x = jitter(target.x, jitterX);
    const y = jitter(target.y, jitterY);

    profile.style.left = `calc(${x}% - ${AVATAR_HALF}px)`;
    profile.style.top = `calc(${y}% - ${AVATAR_HALF}px)`;
    profile.dataset.zone = target.zone;
    if (target.zone === "symbol") profile.classList.add("symbol-touch");
    if (target.zone === "loader") profile.classList.add("loader-cover");
    if (opts.symbolProbe) profile.classList.add("symbol-probe");

    let sx = "0px";
    let sy = "0px";

    if (side === "top") sy = "-115vh";
    if (side === "bottom") sy = "115vh";
    if (side === "left") sx = "-115vw";
    if (side === "right") sx = "115vw";

    if (opts.loaderBurial) {
      const loaderSmash = [
        { sx: "-92px", sy: "-34px" },
        { sx: "76px", sy: "-46px" },
        { sx: "-68px", sy: "42px" },
        { sx: "86px", sy: "34px" }
      ][profileCount % 4];
      sx = loaderSmash.sx;
      sy = loaderSmash.sy;
    }

    profile.style.setProperty("--sx", sx);
    profile.style.setProperty("--sy", sy);
    profile.innerHTML = `<img src="${asset}" alt="">`;

    profileField.appendChild(profile);
    profileCount++;

    spawnSlash(side);

    if (target.zone === "symbol") {
      setTimeout(() => revealHive(profile), 220 + Math.random() * 260);
    }

    if (!opts.noAutoRemove) {
      setTimeout(() => {
        if (profile && profile.parentNode && !profile.classList.contains("carl") && !profile.classList.contains("frank")) {
          profile.remove();
        }
      }, target.zone === "symbol" ? 14000 : 5200);
    }
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

    profile.classList.add("hive-reveal", "has-hive-asset", "signal-burn-contact");

    // Hot metal / paper contact: readable blue, then the contact point eats outward fast.
    setTimeout(() => {
      if (profile && profile.parentNode) profile.classList.add("signal-burn-spread");
    }, 360);

    setTimeout(() => {
      if (profile && profile.parentNode) profile.classList.add("signal-burn-deep");
    }, 760);

    setTimeout(() => {
      if (profile && profile.parentNode) profile.classList.add("signal-burn-consumed", "pixel-deteriorate");
    }, 1180);

    setTimeout(() => {
      if (profile && profile.parentNode) profile.remove();
    }, 2550);
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
  // Disabled during C.17 attack pass. The old general wave created the stupid last-second chaos.
}

function fireBlast(index) {
  // Disabled during C.17 attack pass.
}

function spawnCarl() {
  const existingCarl = profileField.querySelector(".profile.carl");
  if (existingCarl) return existingCarl;

  const carl = document.createElement("button");
  carl.className = "profile carl carl-zone-anchor carl-wrong-place loader-cover";
  carl.type = "button";
  carl.setAttribute("aria-label", "Carl Gates");

  carl.style.left = `calc(${CARL_ZONE.x}% - ${AVATAR_HALF}px)`;
  carl.style.top = `calc(${CARL_ZONE.y}% - ${AVATAR_HALF}px)`;
  carl.style.setProperty("--sx", "-112vw");
  carl.style.setProperty("--sy", "6px");
  carl.innerHTML = `<img src="AssetCARL.PNG" alt="">`;

  profileField.appendChild(carl);

  // Carl is just another avatar until the broken heart completes the circuit.
  carl.addEventListener("click", () => {
    if (!carl.classList.contains("carl-ready")) return;
    openCarlProfile();
  }, { once: true });

  // Carl stays as the final left-side loader avatar. He is left alone until the Carl-heart brick is unlocked.

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
  carl.classList.add("carl-impact-visible", "carl-ready", "carl-ring-death");

  setTimeout(() => {
    if (!carlOpened && carl && carl.parentNode) {
      carl.classList.remove("carl-ready", "carl-ring-death", "carl-impact-visible");
      carl.classList.add("carl-dead-profile");
    }
  }, 1120);
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
  // Wren is a quick private contact with the symbol: lands, vanishes, leaves a tiny green pulse.
  const wren = document.createElement("div");
  wren.className = "profile wren wren-quick-home";

  wren.style.left = `calc(51% - ${AVATAR_HALF}px)`;
  wren.style.top = `calc(25.8% - ${AVATAR_HALF}px)`;
  wren.style.setProperty("--sx", "42px");
  wren.style.setProperty("--sy", "-82px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-fade-home");
  }, 420);

  setTimeout(() => {
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = "51%";
    pulse.style.top = "25.8%";
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1800);
    setTimeout(armJinxShadowFrequency, 260);
  }, 980);

  setTimeout(() => {
    if (wren && wren.parentNode) wren.remove();
  }, 1450);
}

function spawnFrank() {
  if (frankDutyStarted) return;
  frankDutyStarted = true;
  turtle.classList.add("covered-by-frank");

  const frankPositions = [
    // ZONE 2 — HOMIE: Frank duty only. Messy pile, not a perfect stack of coins.
    { x: 50.0, y: 45.4, sx: "-44px", sy: "34px", r: "-7deg" },
    { x: 48.9, y: 46.1, sx: "-52px", sy: "30px", r: "8deg" },
    { x: 51.2, y: 44.8, sx: "-38px", sy: "27px", r: "-3deg" },
    { x: 49.5, y: 44.5, sx: "-48px", sy: "22px", r: "11deg" },
    { x: 50.8, y: 46.4, sx: "-41px", sy: "37px", r: "-10deg" },
    { x: 49.8, y: 45.7, sx: "-56px", sy: "32px", r: "4deg" }
  ];

  frankPositions.forEach((pos, index) => {
    setTimeout(() => {
      const frank = document.createElement("div");
      frank.className = "profile frank frank-stack";
      frank.style.left = `calc(${pos.x}% - ${AVATAR_HALF}px)`;
      frank.style.top = `calc(${pos.y}% - ${AVATAR_HALF}px)`;
      frank.style.setProperty("--sx", pos.sx);
      frank.style.setProperty("--sy", pos.sy);
      frank.style.setProperty("--fr", pos.r || "0deg");
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
