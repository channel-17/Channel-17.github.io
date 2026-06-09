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
const campTestButton = document.getElementById("campTestButton");
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

let profileTimer = null;
let engageTimer = null;
let slashTimer = null;
let profileCount = 0;
let engageCount = 0;
let frankDutyNode = null;
let frankBlueStarted = false;
const AVATAR_HALF = 35;
const frankBlueFrames = [
  "blue.frank1.PNG",
  "blue.frank2.PNG",
  "blue.frank3.PNG",
  "blue.frank4.PNG",
  "blue.frank5.PNG",
  "blue.frank6.PNG"
];

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
  { x: 50, y: 47, zone: "loader" },
  { x: 42, y: 47, zone: "loader" },
  { x: 58, y: 47, zone: "loader" },
  { x: 46, y: 49, zone: "loader" },
  { x: 54, y: 49, zone: "loader" }
];

const homieTargets = [
  { x: 47, y: 55, zone: "homie" },
  { x: 50, y: 56, zone: "homie" },
  { x: 53, y: 55, zone: "homie" }
];

const symbolTargets = [
  { x: 46, y: 29, zone: "symbol" },
  { x: 54, y: 29, zone: "symbol" },
  { x: 42, y: 34, zone: "symbol" },
  { x: 58, y: 34, zone: "symbol" },
  { x: 50, y: 37, zone: "symbol" },
  { x: 45, y: 38, zone: "symbol" },
  { x: 55, y: 38, zone: "symbol" }
];

const missTargets = [
  { x: 30, y: 42, zone: "miss" },
  { x: 70, y: 42, zone: "miss" },
  { x: 32, y: 62, zone: "miss" },
  { x: 68, y: 62, zone: "miss" }
];

const coverageTargets = [
  ...loaderTargets,
  ...homieTargets,
  ...symbolTargets,
  ...missTargets
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

  if (progress >= 36 && !ghosted) {
    ghosted = true;
    signalGhost.classList.add("waking");
  }

  if (progress >= 46 && !hiveWaveStarted) {
    hiveWaveStarted = true;
    beginHiveWave();
  }

  if (progress >= 48 && !burning) {
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

  if (progress >= 26 && !frankSeen) {
    frankSeen = true;
    spawnFrankDuty();
  }

  if (progress >= 68 && frankDutyNode && !frankBlueStarted) {
    startFrankBlueSequence();
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
  // The system reacts to what exists first: loader center, loader left, loader right.
  spawnProfile("top", 0, { force: loaderTargets[0] });
  setTimeout(() => spawnProfile("left", 0, { force: loaderTargets[1] }), 240);
  setTimeout(() => spawnProfile("right", 0, { force: loaderTargets[2] }), 420);
  setTimeout(() => spawnProfile("top", 0, { force: loaderTargets[3] }), 610);

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 315);

  engageTimer = setInterval(() => {
    if (completed) return;
    spawnEngagement();
  }, 235);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 210);
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

  const kind = engageCount % 13;
  let text = "❤️";
  let cls = "heart";

  if (kind === 3) {
    text = "🩷";
    cls = "heart pink";
  }

  if (kind === 5) {
    text = "👍";
    cls = "like";
  }

  if (kind === 8) {
    text = "🔔";
    cls = "bell";
  }

  if (kind === 11) {
    text = "✔";
    cls = "mark";
  }

  // Hearts do not die until the signal begins to show. Then the ones nearest it fade upward.
  if (progress > 48 && cls.includes("heart")) {
    text = engageCount % 4 === 0 ? "🖤" : "🩶";
    cls = engageCount % 4 === 0 ? "heart dead black" : "heart dead";
  }

  item.className = "engage " + cls;
  item.textContent = text;
  item.style.left = 77 + Math.random() * 16 + "%";
  item.style.top = 62 + Math.random() * 18 + "%";
  item.style.setProperty("--dur", 2.25 + Math.random() * 1.4 + "s");
  item.style.setProperty("--drift", Math.round(-50 + Math.random() * 42) + "px");

  engagementField.appendChild(item);
  engageCount++;

  setTimeout(() => item.remove(), 4200);
}

function pickTarget() {
  const count = profileCount;

  if (progress < 36) {
    return loaderTargets[count % loaderTargets.length];
  }

  if (progress < 46) {
    return count % 4 === 0
      ? homieTargets[count % homieTargets.length]
      : loaderTargets[count % loaderTargets.length];
  }

  if (progress < 58) {
    return symbolTargets[count % symbolTargets.length];
  }

  return count % 5 === 0
    ? missTargets[count % missTargets.length]
    : symbolTargets[count % symbolTargets.length];
}

function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 20) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";
    if (target.zone === "symbol") profile.classList.add("symbol-assault");

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const x = jitter(target.x, target.zone === "miss" ? 4.2 : 2.6);
    const y = jitter(target.y, target.zone === "miss" ? 4.6 : 2.8);

    profile.style.left = `calc(${x}% - ${AVATAR_HALF}px)`;
    profile.style.top = `calc(${y}% - 48px)`;

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

    if (target.zone === "symbol" && progress > 48 && Math.random() > 0.30) {
      setTimeout(() => revealHive(profile), 420 + Math.random() * 620);
    }

    setTimeout(() => {
      if (profile && profile.parentNode && !profile.classList.contains("carl")) {
        profile.remove();
      }
    }, 4300);
  }, delay);
}

function revealHive(profile) {
  if (!profile || !profile.parentNode) return;
  if (profile.classList.contains("wren")) return;

  profile.classList.add("mask-dropping");

  setTimeout(() => {
    if (!profile || !profile.parentNode) return;

    if (!profile.dataset.originalSrc) {
      const image = profile.querySelector("img");
      if (image) profile.dataset.originalSrc = image.getAttribute("src") || "";
    }

    const image = profile.querySelector("img");
    if (image) {
      const asset = hiveAssets[profileCount % hiveAssets.length];
      image.src = asset;
    }

    profile.classList.add("hive-reveal");

    if (Math.random() > 0.45) {
      profile.classList.add("angry");
    }
  }, 280);
}

function beginHiveWave() {
  const nearSignal = [...profileField.querySelectorAll(".profile.symbol-assault")].slice(0, 10);

  nearSignal.forEach((profile, index) => {
    setTimeout(() => revealHive(profile), index * 90);
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
  const carl = document.createElement("button");
  carl.className = "profile carl";
  carl.type = "button";
  carl.setAttribute("aria-label", "Carl Gates");

  carl.style.left = `calc(18% - ${AVATAR_HALF}px)`;
  carl.style.top = `calc(47% - ${AVATAR_HALF}px)`;
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

function openCampTest() {
  if (!campTestModal) return;
  campTestModal.classList.add("open");
  campTestModal.setAttribute("aria-hidden", "false");
}

function closeCampTest() {
  if (!campTestModal) return;
  campTestModal.classList.remove("open");
  campTestModal.setAttribute("aria-hidden", "true");
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
if (campTestButton) campTestButton.addEventListener("click", openCampTest);
if (campTestClose) campTestClose.addEventListener("click", closeCampTest);

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
  wren.style.top = `calc(32% - ${AVATAR_HALF}px)`;
  wren.style.setProperty("--sx", "80px");
  wren.style.setProperty("--sy", "-35px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-notice");
  }, 1200);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-fade-home");
  }, 2350);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = wren.style.left;
    pulse.style.top = wren.style.top;
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 3200);
  }, 3050);

  setTimeout(() => {
    if (wren && wren.parentNode) {
      wren.remove();
    }
  }, 3550);
}

function spawnFrankDuty() {
  // Frank gets the only turtle assignment. Same guy, same job, stacked like the system only had one option.
  const positions = [
    { x: 50, y: 56, sx: "-80px", sy: "18px" },
    { x: 47, y: 56, sx: "-70px", sy: "8px" },
    { x: 53, y: 56, sx: "-60px", sy: "14px" }
  ];

  positions.forEach((pos, index) => {
    setTimeout(() => {
      const frank = document.createElement("div");
      frank.className = "profile frank frank-duty";
      frank.style.left = `calc(${pos.x}% - ${AVATAR_HALF}px)`;
      frank.style.top = `calc(${pos.y}% - ${AVATAR_HALF}px)`;
      frank.style.setProperty("--sx", pos.sx);
      frank.style.setProperty("--sy", pos.sy);
      frank.innerHTML = `<img src="AssetFRANK.PNG" alt="">`;
      profileField.appendChild(frank);
      frankDutyNode = frank;
    }, index * 760);
  });
}

function startFrankBlueSequence() {
  if (!frankDutyNode || !frankDutyNode.parentNode || frankBlueStarted) return;
  frankBlueStarted = true;

  const frank = frankDutyNode;
  frank.classList.add("frank-blue-sequence", "hive-reveal", "has-hive-asset");
  const image = frank.querySelector("img");

  frankBlueFrames.forEach((frame, index) => {
    setTimeout(() => {
      if (!image || !frank.parentNode) return;
      image.src = frame;
    }, index * 185);
  });

  setTimeout(() => {
    if (frank && frank.parentNode) frank.classList.add("hive-peel-away");
  }, frankBlueFrames.length * 185 + 550);
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

  if (navigator.vibrate) navigator.vibrate(17);
  signalNode.classList.add("pressed");
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
    idleMaze.classList.remove("active");
  }, 5600);
}

signalNode.addEventListener("click", openChannel);

signalNode.addEventListener("touchend", event => {
  event.preventDefault();
  openChannel();
}, {
  passive: false
});
