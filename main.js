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
const carlClose = document.getElementById("carlClose");
const carlPhotosButton = document.getElementById("carlPhotosButton");
const carlPhotoModal = document.getElementById("carlPhotoModal");
const carlPhotoClose = document.getElementById("carlPhotoClose");
const carlPhotoLarge = document.getElementById("carlPhotoLarge");
const carlPhotoCaption = document.getElementById("carlPhotoCaption");
const hiveWound = document.getElementById("hiveWound");
const hiveCarlFile = document.getElementById("hiveCarlFile");
const hiveClose = document.getElementById("hiveClose");

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
  { x: 50, y: 31, zone: "symbol" },
  { x: 47, y: 31, zone: "symbol" },
  { x: 53, y: 31, zone: "symbol" },
  { x: 50, y: 38, zone: "symbol" },
  { x: 44, y: 38, zone: "symbol" },
  { x: 56, y: 38, zone: "symbol" },

  { x: 42, y: 47, zone: "loader" },
  { x: 50, y: 47, zone: "loader" },
  { x: 58, y: 47, zone: "loader" },
  { x: 37, y: 49, zone: "loader" },
  { x: 63, y: 49, zone: "loader" },

  { x: 44, y: 57, zone: "homie" },
  { x: 50, y: 57, zone: "homie" },
  { x: 56, y: 57, zone: "homie" },

  { x: 32, y: 42, zone: "miss" },
  { x: 68, y: 42, zone: "miss" },
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

  if (progress >= 24 && !ghosted) {
    ghosted = true;
    signalGhost.classList.add("waking");
  }

  if (progress >= 38 && !hiveWaveStarted) {
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

  if (progress >= 62 && !wrenSeen) {
    wrenSeen = true;
    spawnWren();
  }

  if (progress >= 68 && !frankSeen) {
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
  spawnProfile("top", 0, { force: coverageTargets[0] });
  setTimeout(() => spawnProfile("right", 0, { force: coverageTargets[1] }), 240);
  setTimeout(() => spawnProfile("left", 0, { force: coverageTargets[2] }), 420);
  setTimeout(() => spawnProfile("top", 0, { force: coverageTargets[3] }), 610);

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

  if (progress > 42 && cls.includes("heart")) {
    text = "🩶";
    cls = "heart dead";
  }

  item.className = "engage " + cls;
  item.textContent = text;
  item.style.left = 70 + Math.random() * 23 + "%";
  item.style.top = 77 + Math.random() * 15 + "%";
  item.style.setProperty("--dur", 1.8 + Math.random() * 1.4 + "s");
  item.style.setProperty("--drift", Math.round(-30 + Math.random() * 60) + "px");

  engagementField.appendChild(item);
  engageCount++;

  setTimeout(() => item.remove(), 3400);
}

function pickTarget() {
  const count = profileCount;

  if (count < 7) {
    return coverageTargets[count % 6];
  }

  if (count < 14) {
    return coverageTargets[6 + (count % 8)];
  }

  return coverageTargets[count % coverageTargets.length];
}

function spawnProfile(side, delay = 0, opts = {}) {
  setTimeout(() => {
    const old = profileField.querySelectorAll(".profile:not(.carl):not(.frank):not(.wren)");
    if (old.length > 20) old[0].remove();

    const target = opts.force || pickTarget();

    const profile = document.createElement("div");
    profile.className = "profile";

    const asset = opts.asset || normalAssets[profileCount % normalAssets.length];
    const x = jitter(target.x, target.zone === "miss" ? 4.2 : 2.6);
    const y = jitter(target.y, target.zone === "miss" ? 4.6 : 2.8);

    profile.style.left = `calc(${x}% - 48px)`;
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

    if (progress > 38 && Math.random() > 0.42) {
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

  profile.classList.add("mask-dropping");

  setTimeout(() => {
    if (!profile || !profile.parentNode) return;
    profile.classList.add("hive-reveal");

    if (Math.random() > 0.45) {
      profile.classList.add("angry");
    }
  }, 280);
}

function beginHiveWave() {
  const nearSignal = [...profileField.querySelectorAll(".profile")].slice(0, 8);

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
  }, 2800);

  setTimeout(() => {
    if (!carl || !carl.parentNode) return;

    carl.classList.remove("carl-ring-death", "carl-ready");
    carl.classList.add("burying");

    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnProfile("left"), i * 60);
    }

    setTimeout(() => carl.remove(), 520);
  }, 3350);
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
  if (!hiveWound || hiveWoundUsed) return;
  stopWoundPulse();

  const pulse = () => {
    if (!carlProfile.classList.contains("open") || hiveWoundUsed) return;
    hiveWound.classList.add("pulse-open");
    setTimeout(() => {
      if (hiveWound) hiveWound.classList.remove("pulse-open");
    }, 1700);
  };

  setTimeout(pulse, 800);
  woundPulseTimer = setInterval(pulse, 17000);
}

function stopWoundPulse() {
  clearInterval(woundPulseTimer);
  woundPulseTimer = null;
  if (hiveWound) hiveWound.classList.remove("pulse-open");
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

function openHiveFile() {
  if (!hiveWound || !hiveWound.classList.contains("pulse-open") || hiveWoundUsed) return;
  hiveCarlFile.classList.add("open");
  hiveCarlFile.setAttribute("aria-hidden", "false");
  hiveWoundUsed = true;
  hiveWound.classList.add("used");
  stopWoundPulse();
}

function closeHiveFile() {
  if (!hiveCarlFile) return;
  hiveCarlFile.classList.remove("open");
  hiveCarlFile.setAttribute("aria-hidden", "true");
}

carlClose.addEventListener("click", closeCarlProfile);
if (carlPhotosButton) carlPhotosButton.addEventListener("click", openCarlPhotos);
if (carlPhotoClose) carlPhotoClose.addEventListener("click", closeCarlPhotos);
if (hiveWound) hiveWound.addEventListener("click", openHiveFile);
if (hiveClose) hiveClose.addEventListener("click", closeHiveFile);

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

  wren.style.left = "calc(72% - 48px)";
  wren.style.top = "calc(30% - 48px)";
  wren.style.setProperty("--sx", "80px");
  wren.style.setProperty("--sy", "-35px");
  wren.innerHTML = `<img src="AssetWREN.PNG" alt="">`;

  profileField.appendChild(wren);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    wren.style.opacity = "0.98";
    wren.style.filter = "drop-shadow(0 0 7px rgba(223,255,63,0.18))";
  }, 1400);

  setTimeout(() => {
    if (!wren || !wren.parentNode) return;
    const pulse = document.createElement("div");
    pulse.className = "wren-exit-pulse";
    pulse.style.left = wren.style.left;
    pulse.style.top = wren.style.top;
    impactField.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1800);
  }, 2850);

  setTimeout(() => {
    if (wren && wren.parentNode) {
      wren.classList.add("burying");
      setTimeout(() => wren.remove(), 520);
    }
  }, 3000);
}

function spawnFrank() {
  const frank = document.createElement("div");
  frank.className = "profile frank";

  frank.style.left = "calc(22% - 48px)";
  frank.style.top = "calc(66% - 48px)";
  frank.style.setProperty("--sx", "-60px");
  frank.style.setProperty("--sy", "40px");
  frank.innerHTML = `<img src="AssetFRANK.PNG" alt="">`;

  profileField.appendChild(frank);

  setTimeout(() => frank.classList.add("realize"), 620);

  setTimeout(() => {
    revealHive(frank);
  }, 1100);

  setTimeout(() => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => spawnProfile(randomSide()), i * 70);
    }
  }, 1350);

  setTimeout(() => {
    if (frank && frank.parentNode) {
      frank.classList.add("burying");
      setTimeout(() => frank.remove(), 520);
    }
  }, 2600);
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
}, {
  passive: false
});
