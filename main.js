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
const takeCampTest = document.getElementById("takeCampTest");
const campTestModal = document.getElementById("campTestModal");
const campTestClose = document.getElementById("campTestClose");
const campResult = document.getElementById("campResult");
const expandTestimonials = document.getElementById("expandTestimonials");
const testimonialMore = document.getElementById("testimonialMore");

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
let frankBlueStarted = false;
let frankStack = [];
let woundPulseTimer = null;
let hiveWoundUsed = false;

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
  // Loader first: center percentage, then left/right, then overlap the pill without making one blob.
  { x: 50, y: 60, zone: "loader" },
  { x: 40, y: 60, zone: "loader" },
  { x: 60, y: 60, zone: "loader" },
  { x: 45, y: 58.7, zone: "loader" },
  { x: 55, y: 61.2, zone: "loader" },
  { x: 35, y: 59.4, zone: "loader" },
  { x: 65, y: 60.8, zone: "loader" },

  // Homie is Frank-only. Generic avatars do not get turtle duty.
  { x: 50, y: 68, zone: "homie" },

  // Symbol later. They attack it, but never fully erase the three pyramid points.
  { x: 50, y: 18, zone: "symbol" },
  { x: 43.5, y: 26, zone: "symbol" },
  { x: 56.5, y: 26, zone: "symbol" },
  { x: 50, y: 30, zone: "symbol" },
  { x: 47, y: 22, zone: "symbol" },

  { x: 28, y: 43, zone: "miss" },
  { x: 72, y: 43, zone: "miss" },
  { x: 31, y: 68, zone: "miss" },
  { x: 69, y: 68, zone: "miss" }
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

  if (progress >= 24 && !ghosted) {
    ghosted = true;
    signalGhost.classList.add("waking");
  }

  if (progress >= 50 && !hiveWaveStarted) {
    hiveWaveStarted = true;
    beginHiveWave();
  }

  if (progress >= 50 && !burning) {
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

  if (progress >= 61 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 26 && !frankSeen) {
    frankSeen = true;
    spawnFrank();
  }

  if (progress >= 61 && frankSeen && !frankBlueStarted) {
    frankBlueStarted = true;
    startBlueFrankSequence();
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
  // First strike hits what exists: the loader bar and percentage.
  spawnProfile("top", 0, { force: coverageTargets[0] });
  setTimeout(() => spawnProfile("left", 0, { force: coverageTargets[1] }), 260);
  setTimeout(() => spawnProfile("right", 0, { force: coverageTargets[2] }), 520);
  setTimeout(() => spawnProfile("left", 0, { force: coverageTargets[3] }), 820);
  setTimeout(() => spawnProfile("right", 0, { force: coverageTargets[4] }), 1120);

  profileTimer = setInterval(() => {
    if (completed) return;
    spawnProfile(randomSide());
  }, 640);

  engageTimer = setInterval(() => {
    if (completed) return;
    spawnEngagement();
  }, 1500);

  slashTimer = setInterval(() => {
    if (completed) return;
    spawnSlash(randomSide());
  }, 310);
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
  // Hearts: clean emoji hearts climb the right side. Before the signal they stay red.
  // Once the symbol appears, new hearts tell the whole exposed story: red -> pink -> gray -> black -> gone.
  const item = document.createElement("div");
  item.className = "engage heart";
  item.textContent = "❤️";
  item.style.left = 82 + Math.random() * 12 + "%";
  item.style.top = 106 + Math.random() * 9 + "%";
  item.style.setProperty("--dur", (progress < 50 ? 8.4 : 7.2) + Math.random() * 1.9 + "s");
  item.style.setProperty("--drift", Math.round(-18 + Math.random() * 36) + "px");
  if (progress >= 50) item.classList.add("exposed");
  engagementField.appendChild(item);
  engageCount++;
  setTimeout(() => item.remove(), 10500);
}
function pickTarget() {
  const count = profileCount;

  if (progress < 38) {
    // Smother the loading bar without creating one giant blob.
    return coverageTargets[count % 7];
  }

  if (progress < 50) {
    return coverageTargets[count % 7];
  }

  // Once the symbol appears, the system throws masks at it.
  // Keep the target pattern sparse enough that the emblem never fully disappears.
  const symbolTargets = coverageTargets.filter(t => t.zone === "symbol");
  const missTargets = coverageTargets.filter(t => t.zone === "miss");
  return Math.random() < 0.76
    ? symbolTargets[count % symbolTargets.length]
    : missTargets[count % missTargets.length];
}
function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 10) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";
    if (target.zone === "symbol") profile.classList.add("on-symbol");
    if (target.zone === "loader") profile.classList.add("on-loader");

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const x = jitter(target.x, target.zone === "symbol" ? 1.8 : target.zone === "loader" ? 2.2 : 3.2);
    const y = jitter(target.y, target.zone === "symbol" ? 1.8 : target.zone === "loader" ? 2.0 : 3.2);

    profile.style.left = `calc(${x}% - 27px)`;
    profile.style.top = `calc(${y}% - 27px)`;

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

    if (target.zone === "symbol" && progress >= 50) {
      setTimeout(() => revealHive(profile), 80 + Math.random() * 120);
    }

    setTimeout(() => {
      if (profile && profile.parentNode && !profile.classList.contains("carl")) {
        profile.remove();
      }
    }, target.zone === "symbol" ? 9200 : 5600);
  }, delay);
}
function revealHive(profile) {
  if (!profile || !profile.parentNode) return;
  if (profile.classList.contains("wren")) return;
  if (profile.classList.contains("hive-reveal")) return;

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

    setTimeout(() => {
      if (profile && profile.parentNode) profile.classList.add("hive-dissolve");
    }, 3100);
  }, 180);
}
function beginHiveWave() {
  const nearSignal = [...profileField.querySelectorAll(".profile.on-symbol:not(.wren):not(.frank)")].slice(0, 5);
  nearSignal.forEach((profile, index) => {
    setTimeout(() => revealHive(profile), index * 130);
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
    if (campResult) campResult.textContent = "Camp Compatibility: APPROVED. Human selected yes.";
  });
});
if (expandTestimonials && testimonialMore) {
  expandTestimonials.addEventListener("click", () => {
    testimonialMore.classList.toggle("open");
    expandTestimonials.textContent = testimonialMore.classList.contains("open") ? "COLLAPSE TESTIMONIALS" : "EXPAND TESTIMONIALS";
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

  wren.style.left = "calc(52% - 27px)";
  wren.style.top = "calc(24% - 27px)";
  wren.style.setProperty("--sx", "86px");
  wren.style.setProperty("--sy", "-42px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-notice");
  }, 1250);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.classList.add("wren-fade-home");
  }, 2650);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = "52%";
    pulse.style.top = "31%";
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 3600);
  }, 3200);

  setTimeout(() => {
    if (wren && wren.parentNode) {
      wren.remove();
    }
  }, 3800);
}
function spawnFrank() {
  const spots = [
    { x: 50.0, y: 67.0, dx: 0, dy: 0 },
    { x: 48.7, y: 67.2, dx: -4, dy: 1 },
    { x: 51.0, y: 66.8, dx: 4, dy: -1 },
    { x: 49.6, y: 67.7, dx: -1, dy: 3 }
  ];

  spots.forEach((spot, index) => {
    setTimeout(() => {
      const frank = document.createElement("div");
      frank.className = "profile frank turtle-duty";
      frank.style.left = `calc(${spot.x}% - 34px)`;
      frank.style.top = `calc(${spot.y}% - 34px)`;
      frank.style.setProperty("--sx", `${-48 + index * 8}px`);
      frank.style.setProperty("--sy", `${32 - index * 3}px`);
      frank.style.setProperty("--overlapX", `${spot.dx}px`);
      frank.style.setProperty("--overlapY", `${spot.dy}px`);
      frank.innerHTML = `<img src="AssetFRANK.PNG" alt="">`;
      profileField.appendChild(frank);
      frankStack.push(frank);
    }, index * 560);
  });
}

function startBlueFrankSequence() {
  const liveFranks = frankStack.filter(f => f && f.parentNode);
  if (!liveFranks.length) return;

  const topFrank = liveFranks[liveFranks.length - 1];
  topFrank.classList.add("blue-frank", "auth-field-hit");
  const img = topFrank.querySelector("img");
  const frames = [
    "blue.frank1.PNG",
    "blue.frank2.PNG",
    "blue.frank3.PNG",
    "blue.frank4.PNG",
    "blue.frank5.PNG",
    "blue.frank6.PNG"
  ];

  frames.forEach((frame, index) => {
    setTimeout(() => {
      if (img) img.src = frame;
    }, index * 560);
  });

  setTimeout(() => {
    liveFranks.forEach(frank => {
      if (frank && frank.parentNode) frank.classList.add("frank-dissolve");
    });
  }, frames.length * 560 + 1450);

  setTimeout(() => {
    liveFranks.forEach(frank => {
      if (frank && frank.parentNode) frank.remove();
    });
    frankStack = [];
  }, frames.length * 560 + 2850);
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
    profileField.querySelectorAll(".profile:not(.wren):not(.frank)").forEach(node => node.remove());
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
  }, 1850);

  setTimeout(() => {
    loaderScene.classList.add("portal-open");
  }, 2950);

  setTimeout(() => {
    turtle.classList.remove("peek");
    turtle.classList.add("escape");
  }, 3650);

  setTimeout(() => {
    loaderScene.classList.add("portal-close");
  }, 6700);

  setTimeout(() => {
    loader.classList.add("homie-cut-out");
  }, 7050);

  setTimeout(() => {
    loaderScene.classList.add("fade-out");
  }, 7700);
}

function openChannel() {
  if (!signalNode.classList.contains("ready")) return;

  signalNode.style.pointerEvents = "none";
  if (navigator.vibrate) navigator.vibrate(17);

  signalNode.classList.add("pressed");
  outerSymbol.classList.add("dissolve");
  innerSymbol.classList.add("alive");

  maze.classList.remove("active");

  setTimeout(() => {
    signalNode.classList.add("fade-out");
  }, 1900);

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
