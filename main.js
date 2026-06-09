// CHANNEL 17 — Build Pass 1C
// CPR active. Ground Zero continuation. No redesign.

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
const campTestTrigger = document.getElementById("campTestTrigger");
const campTestModal = document.getElementById("campTestModal");
const campTestClose = document.getElementById("campTestClose");

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
let woundPulseTimer = null;
let hiveWoundUsed = false;
let frankTurtleStack = [];
let frankBlueStarted = false;

let profileTimer = null;
let engageTimer = null;
let slashTimer = null;
let profileCount = 0;
let engageCount = 0;

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

const coverageTargets = [
  // Loader first: center percentage, left, right, then overlap.
  { x: 50, y: 47, zone: "loader" },
  { x: 42, y: 47, zone: "loader" },
  { x: 58, y: 47, zone: "loader" },
  { x: 46, y: 49, zone: "loader" },
  { x: 54, y: 49, zone: "loader" },

  // Homie gets Frank, not a random swarm.
  { x: 48, y: 58, zone: "homie" },

  // Symbol attackers come only after the symbol exists. Keep off the three points.
  { x: 50, y: 35, zone: "symbol" },
  { x: 45, y: 38, zone: "symbol" },
  { x: 55, y: 38, zone: "symbol" },
  { x: 41, y: 42, zone: "symbol" },
  { x: 59, y: 42, zone: "symbol" },
  { x: 50, y: 42, zone: "symbol" },

  { x: 31, y: 42, zone: "miss" },
  { x: 69, y: 42, zone: "miss" },
  { x: 34, y: 62, zone: "miss" },
  { x: 66, y: 62, zone: "miss" }
];

function setProgress(value) {
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `calc(${progress}% - 12px)`;
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

  if (progress >= 24 && !frankSeen) {
    frankSeen = true;
    spawnFrankTurtleDuty();
  }

  if (progress >= 36 && !ghosted) {
    ghosted = true;
    signalGhost.classList.add("waking");
  }

  if (progress >= 41 && !hiveWaveStarted) {
    hiveWaveStarted = true;
    beginHiveWave();
  }

  if (progress >= 42 && !burning) {
    burning = true;
    signalGhost.classList.add("burning");
    startBurnPulse();
  }

  if (progress >= 48 && !carlSeen) {
    carlSeen = true;
    spawnCarl();
  }

  if (progress >= 53 && !deadHeartReleased) {
    deadHeartReleased = true;
    releaseDeadHeartTowardCarl();
  }

  if (progress >= 55 && !generals) {
    generals = true;
    deployGenerals();
  }

  if (progress >= 58 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 66 && !frankBlueStarted) {
    frankBlueStarted = true;
    animateFrankBlueSequence();
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
  // System attacks what exists first: loader center, left, right.
  spawnProfile("top", 0, { force: coverageTargets[0], noHive: true });
  setTimeout(() => spawnProfile("left", 0, { force: coverageTargets[1], noHive: true }), 260);
  setTimeout(() => spawnProfile("right", 0, { force: coverageTargets[2], noHive: true }), 520);
  setTimeout(() => spawnProfile("top", 0, { force: coverageTargets[3], noHive: true }), 820);
  setTimeout(() => spawnProfile("bottom", 0, { force: coverageTargets[4], noHive: true }), 1080);

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 430);

  engageTimer = setInterval(() => {
    if (completed) return;
    spawnEngagement();
  }, 260);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 280);
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
  const item = document.createElement("div");

  const kind = engageCount % 12;
  let text = "❤️";
  let cls = "heart";

  if (kind === 2 || kind === 6) {
    text = "🩷";
    cls = "heart pink";
  }

  if (kind === 5) { text = "👍"; cls = "like"; }
  if (kind === 8) { text = "🔔"; cls = "bell"; }
  if (kind === 10) { text = "✔"; cls = "mark"; }

  // Once the symbol appears, authenticity exposure starts eating the hearts.
  if (progress > 38 && cls.includes("heart")) {
    if (engageCount % 3 === 0) { text = "🩶"; cls = "heart dead"; }
    if (engageCount % 9 === 0) { text = "♥"; cls = "heart black"; }
  }

  item.className = "engage " + cls;
  item.textContent = text;
  // Right-side home zone, traveling up the screen.
  item.style.left = 78 + Math.random() * 16 + "%";
  item.style.top = 73 + Math.random() * 18 + "%";
  item.style.setProperty("--dur", 2.4 + Math.random() * 1.5 + "s");
  item.style.setProperty("--drift", Math.round(-34 + Math.random() * 32) + "px");

  engagementField.appendChild(item);
  engageCount++;

  setTimeout(() => item.remove(), 4300);
}
function pickTarget() {
  const count = profileCount;

  // Before the signal appears, nobody attacks the symbol.
  if (!ghosted) {
    return coverageTargets[count % 5];
  }

  // After the signal appears, profiles redirect to the symbol but never fully bury its points.
  if (count % 5 !== 0) {
    return coverageTargets[6 + (count % 6)];
  }

  return coverageTargets[12 + (count % 4)];
}
function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 16) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";
    profile.dataset.zone = target.zone;
    if (target.zone === "symbol") profile.classList.add("symbol-attacker");
    if (target.zone === "loader") profile.classList.add("loader-attacker");

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const x = jitter(target.x, target.zone === "miss" ? 4.0 : target.zone === "symbol" ? 1.8 : 2.2);
    const y = jitter(target.y, target.zone === "miss" ? 4.4 : target.zone === "symbol" ? 1.8 : 2.4);

    profile.style.left = `calc(${x}% - 36px)`;
    profile.style.top = `calc(${y}% - 36px)`;

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

    // Only profiles that actually attack the symbol get exposed as blue.
    if (!opts.noHive && target.zone === "symbol" && progress > 41) {
      setTimeout(() => revealHive(profile), 430 + Math.random() * 420);
    }

    setTimeout(() => {
      if (profile && profile.parentNode && !profile.classList.contains("carl")) {
        profile.classList.add("fake-dissolve");
        setTimeout(() => profile.remove(), 520);
      }
    }, target.zone === "symbol" ? 3600 : 4300);
  }, delay);
}
function revealHive(profile) {
  if (!profile || !profile.parentNode) return;
  if (profile.classList.contains("wren")) return;

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
      if (!profile || !profile.parentNode) return;
      profile.classList.add("blue-peel-away");
      setTimeout(() => { if (profile && profile.parentNode) profile.remove(); }, 720);
    }, 900);
  }, 240);
}
function beginHiveWave() {
  // No mass conversion. Only the profiles currently touching the symbol get exposed.
  const nearSignal = [...profileField.querySelectorAll('.profile.symbol-attacker:not(.wren)')].slice(0, 6);

  nearSignal.forEach((profile, index) => {
    setTimeout(() => revealHive(profile), index * 95);
  });
}
function startBurnPulse() {
  // Tiny signal exposure pulse; not a weapon blast.
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const ring = document.createElement("div");
      ring.className = "burn-ring signal-reveal-ring";
      impactField.appendChild(ring);
      setTimeout(() => ring.remove(), 780);
    }, i * 720);
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

  for (let i = 0; i < 2; i++) {
    setTimeout(() => spawnProfile(["left", "right"][i]), i * 100);
  }
}

function spawnCarl() {
  const carl = document.createElement("button");
  carl.className = "profile carl";
  carl.type = "button";
  carl.setAttribute("aria-label", "Carl Gates");

  carl.style.left = "calc(18% - 48px)";
  carl.style.top = "calc(47% - 48px)";
  carl.style.setProperty("--sx", "-35px");
  carl.style.setProperty("--sy", "8px");
  carl.innerHTML = `<img src="AssetCARL.PNG" alt="">`;

  profileField.appendChild(carl);

  setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnProfile("left"), i * 90);
    }
  }, 260);

  carl.addEventListener("click", () => {
    if (!carl.classList.contains("carl-ready")) return;
    openCarlProfile();
  }, { once: true });

  setTimeout(() => {
    if (carl && carl.parentNode && !carlTriggered) {
      carl.classList.add("burying");
      setTimeout(() => carl.remove(), 460);
    }
  }, 3600);
}

function releaseDeadHeartTowardCarl() {
  const carl = profileField.querySelector(".profile.carl");
  if (!carl) return;

  const heart = document.createElement("div");
  heart.className = "engage heart dead carl-trigger-heart";
  heart.textContent = "🩶";
  heart.style.left = "12%";
  heart.style.top = "50%";
  heart.style.setProperty("--dur", "2.1s");
  heart.style.setProperty("--drift", "0px");

  engagementField.appendChild(heart);

  setTimeout(() => {
    triggerCarl(carl);
  }, 980);

  setTimeout(() => heart.remove(), 2200);
}

function triggerCarl(carl) {
  if (!carl || !carl.parentNode || carlTriggered) return;

  carlTriggered = true;

  carl.classList.add("carl-ring-death", "carl-ready");

  setTimeout(() => {
    if (!carlOpened) {
      carl.classList.remove("carl-ready");
    }
  }, 1900);

  setTimeout(() => {
    if (!carl || !carl.parentNode) return;

    carl.classList.remove("carl-ring-death", "carl-ready");
    carl.classList.add("burying");

    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnProfile("left"), i * 60);
    }

    setTimeout(() => carl.remove(), 520);
  }, 2450);
}

function openCarlProfile() {
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
if (campTestTrigger && campTestModal) campTestTrigger.addEventListener("click", () => { campTestModal.classList.add("open"); campTestModal.setAttribute("aria-hidden", "false"); });
if (campTestClose && campTestModal) campTestClose.addEventListener("click", () => { campTestModal.classList.remove("open"); campTestModal.setAttribute("aria-hidden", "true"); });
if (campTestModal) campTestModal.addEventListener("click", event => { if (event.target === campTestModal) { campTestModal.classList.remove("open"); campTestModal.setAttribute("aria-hidden", "true"); } });

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
  wren.dataset.zone = "symbol";

  wren.style.left = "calc(51% - 36px)";
  wren.style.top = "calc(36% - 36px)";
  wren.style.setProperty("--sx", "70px");
  wren.style.setProperty("--sy", "-30px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-notice");
  }, 900);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-fade-home");
  }, 2200);

  setTimeout(() => {
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = "50%";
    pulse.style.top = "36%";
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 3600);
  }, 2880);

  setTimeout(() => {
    if (wren && wren.parentNode) wren.remove();
  }, 3300);
}
function spawnFrankTurtleDuty() {
  // Frank is the only avatar assigned to Homie. One poor bastard, repeated.
  const spots = [
    { x: 48, y: 58, sx: "-70px", sy: "24px" },
    { x: 45, y: 58, sx: "-84px", sy: "18px" },
    { x: 51, y: 59, sx: "-72px", sy: "30px" }
  ];

  spots.forEach((spot, index) => {
    setTimeout(() => {
      const frank = document.createElement("div");
      frank.className = "profile frank frank-stack";
      frank.dataset.frankFrame = "0";
      frank.style.left = `calc(${spot.x}% - 36px)`;
      frank.style.top = `calc(${spot.y}% - 36px)`;
      frank.style.setProperty("--sx", spot.sx);
      frank.style.setProperty("--sy", spot.sy);
      frank.style.zIndex = String(18 + index);
      frank.innerHTML = `<img src="AssetFRANK.PNG" alt="">`;
      profileField.appendChild(frank);
      frankTurtleStack.push(frank);
    }, index * 1450);
  });
}

function animateFrankBlueSequence() {
  const frank = frankTurtleStack.filter(f => f && f.parentNode).pop();
  if (!frank) return;

  frank.classList.add("frank-blue-sequence", "hive-reveal", "has-hive-asset");
  const img = frank.querySelector("img");
  const frames = [
    "blue.frank1.PNG",
    "blue.frank2.PNG",
    "blue.frank3.PNG",
    "blue.frank4.PNG",
    "blue.frank5.PNG",
    "blue.frank6.PNG"
  ];

  frames.forEach((src, index) => {
    setTimeout(() => { if (img) img.src = src; }, index * 210);
  });

  // Bury the older Franks first so the last one gets the actual WTF beat.
  frankTurtleStack.forEach(f => {
    if (f !== frank && f && f.parentNode) {
      f.classList.add("burying");
      setTimeout(() => { if (f && f.parentNode) f.remove(); }, 520);
    }
  });

  setTimeout(() => {
    if (!frank || !frank.parentNode) return;
    frank.classList.add("blue-peel-away");
    setTimeout(() => { if (frank && frank.parentNode) frank.remove(); }, 760);
  }, 1650);
}

function spawnFrank() {
  spawnFrankTurtleDuty();
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
    frankTurtleStack = [];
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
  }, 2500);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 3150);

  setTimeout(() => {
    loaderScene.classList.add("portal-close");
  }, 7650);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 7900);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 8700);
}

function openChannel() {
  if (!signalNode.classList.contains("ready")) return;

  signalNode.style.pointerEvents = "none";
  if (navigator.vibrate) navigator.vibrate([17, 34, 17]);

  signalNode.classList.add("pressed");
  outerSymbol.classList.add("dissolve");
  innerSymbol.classList.add("alive");

  // No maze before station. The maze was only a design map.
  maze.classList.remove("active");

  setTimeout(() => {
    signalNode.classList.add("fade-out");
  }, 1600);

  setTimeout(() => {
    home.classList.add("open");
    idleMaze.classList.add("active");
  }, 2300);
}
signalNode.addEventListener("click", openChannel);

signalNode.addEventListener("touchend", event => {
  event.preventDefault();
  openChannel();
}, {
  passive: false
});
