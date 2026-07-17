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
let snowflakeReleased = false;
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
  "blue.frank0.PNG",
  "blue.frank1.PNG",
  "blue.frank2.PNG",
  "blue.frank3.PNG",
  "blue.frank4.PNG",
  "blue.frank5.PNG",
  "blue.frank6.PNG"
];
let activeFrankStack = [];


function ensurePoemNoteOverlay() {
  // Red poem safety: if an older placeholder overlay survived a mobile back/forward cache,
  // destroy it and rebuild this note from the current source.
  const existingPoemNote = document.getElementById("poemNoteOverlay");
  if (poemNoteOverlay && poemNoteOverlay.textContent && poemNoteOverlay.textContent.includes("Walked into your office")) {
    return poemNoteOverlay;
  }
  if (existingPoemNote) existingPoemNote.remove();
  poemNoteOverlay = null;

  poemNoteOverlay = document.createElement("aside");
  poemNoteOverlay.className = "poem-note-overlay";
  poemNoteOverlay.id = "poemNoteOverlay";
  poemNoteOverlay.setAttribute("aria-hidden", "true");
  poemNoteOverlay.innerHTML = `
    <section class="poem-note-card red-poem-card" role="dialog" aria-modal="true" aria-label="Red poem">
      <button class="poem-note-close" id="poemNoteClose" type="button" aria-label="close poem note">×</button>
      <div class="poem-note-kicker">private frequency</div>
      <h2>Red.</h2>
      <div class="poem-note-paper red-poem-paper">
        <p>Walked into your office, saw the fire in your hair<br>
        Bright red like a warning, but I didn’t even care<br>
        You sat at that desk, whole room shifted tone<br>
        Like I stepped into a palace that was never my own</p>

        <p>You looked up for a second, I was caught in the frame<br>
        Started callin’ you Jasmine, just didn’t say it by name<br>
        It was a joke in my head.<br>
        Started feelng surreal.<br>
        Like there was a crown in my future I might not have to steal</p>

        <p>Every visit turned a moment into somethin’ more deep<br>
        I was buildin’ whole worlds while you were talkin’ to me<br>
        Had a carpet in my mind, had a plan, had a pace<br>
        Had a version of forever when I saw your face</p>

        <p>Never crossed any lines, kept it cool, kept it tight<br>
        But I felt somethin’ shift with you in my sight.<br>
        Thought the door might be open<br>
        just a crack, just enough…<br>
        Thought maybe… just maybe,<br>
        This was fairytail kind of stuff.</p>

        <p>The silence got louder, you were driftin’ away<br>
        Conversations got shorter, different look in your gaze<br>
        Didn’t see it all happen, never watched you choose him<br>
        Just held it inside.<br>
        While my walls were caving in.</p>

        <p>He was part of your story, Im not even a page<br>
        Just a thought scribbled down<br>
        And then quickly erased<br>
        That’s the part I can’t get over, missing this win.<br>
        I never lost you to him—I just never got to begin</p>

        <p>Now I’m stuck with a palace that I built in my head<br>
        Walkin’ down empty hallways,<br>
        where the words went unsaid<br>
        Scrabbling for a genie<br>
        My wish was never spoke<br>
        I Feel like the punchline without a setup, just a half-finished joke</p>

        <p>I still picture your hair and how the light shaded those strands.<br>
        You smiled at me and I thought fate had a plan<br>
        Now it flickers like a memory that burns when I sleep<br>
        The crown I imagined that I never could keep</p>

        <p class="red-poem-signature">— jinx</p>
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
  // Nine regular profiles bury the loader. Carl is the tenth and final far-left hit.
  { x: 44.2, y: 34.02, zone: "loader", cluster: "loader-mid-left" },
  { x: 73.4, y: 34.20, zone: "loader", cluster: "loader-far-right" },
  { x: 56.0, y: 34.08, zone: "loader", cluster: "loader-center" },
  { x: 66.2, y: 34.26, zone: "loader", cluster: "loader-right-mid" },
  { x: 36.8, y: 34.18, zone: "loader", cluster: "loader-left-safe" },
  { x: 61.4, y: 34.00, zone: "loader", cluster: "loader-center-right" },
  { x: 49.8, y: 34.30, zone: "loader", cluster: "loader-mid-low" },
  { x: 78.1, y: 34.06, zone: "loader", cluster: "loader-right-cap" },
  { x: 29.6, y: 34.12, zone: "loader", cluster: "loader-carl-old-position" }
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
const CARL_ZONE = { x: 21.4, y: 34.18 };
const CARL_HEART_START = { x: 82, y: 98 };
const CARL_HEART_CONTACT = { x: CARL_ZONE.x + 3.6, y: CARL_ZONE.y + 0.04 };
const CARL_HEART_PATH = [
  /*
    Actor Two begins at the bottom-left round-robin point.
    Existing left-side coordinates and timing proportions are preserved.
  */
  {
    left: "12%",
    top: "103%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 0,
    offset: 0
  },
  {
    left: "14%",
    top: "96%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .028
  },
  {
    left: "15%",
    top: "87%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .158
  },
  {
    left: "16%",
    top: "76%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .299
  },
  {
    left: "18%",
    top: "64%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .439
  },
  {
    left: "20%",
    top: "53%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .579
  },
  {
    left: "23%",
    top: "44%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .719
  },
  {
    left: "26%",
    top: "38%",
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: .860
  },
  {
    left: `${CARL_HEART_CONTACT.x}%`,
    top: `${CARL_HEART_CONTACT.y}%`,
    transform: "translate(-50%,-50%) scale(1)",
    opacity: 1,
    offset: 1
  }
];

  function setProgress(value) {
  progress = Math.max(0, Math.min(100, value));
  fill.style.width = progress <= 0 ? "0%" : `${progress}%`;
  percent.textContent = `${Math.round(progress)}%`;
}

const loading = setInterval(() => {
  if (frostHolding || frostLocked) {
    return;
  }

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

  if (progress >= 40 && !ghosted) {
    ghosted = true;
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
    if (progress >= 80 && !generals) {
    generals = true;
    deployGenerals();
  }
  if (progress >= 52 && !symbolBattleStarted) {
    startSymbolBattle();
  }

  if (progress >= 86 && !wrenSeen) {
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

function startHeartSmoke() {
  // FOREMAN MODE — HEART FIELD ONLY.
  // Start with one validation heart, then let the field grow naturally: and then another... and another.
  // Pink/red only. No Carl heart. No broken-heart event. No zones.
  if (engageTimer) return;
  heartSmokeSpawnCount = 0;
  spawnEngagement({ guaranteed: true });

  // Let the normal stream establish itself first.
  // Actor One is then injected as one ordinary broken-heart emoji.
  setTimeout(() => {
    if (completed || deadHeartReleased) return;

    deadHeartReleased = true;

    spawnEngagement({
      guaranteed: true,
      carlBroken: true
    });
  }, 1700);

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
  // Tight, irregular magnetic hits. Nine regular profiles, then Carl seals the far-left.
  if (profileTimer) return;

  const slamDelays = [
    260,
    540,
    850,
    1180,
    1510,
    1870,
    2240,
    2660,
    3090
  ];

  loaderTargets.forEach((target, index) => {
    setTimeout(() => {
      spawnProfile("top", 0, {
        force: target,
        noAutoRemove: true,
        loaderBurial: true
      });
    }, slamDelays[index]);
  });

  setTimeout(() => {
    if (!carlSeen) {
      carlSeen = true;
      spawnCarl();
    }

    loaderCoverageDone = true;
  }, 3520);

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

  // Faces are now a real part of the social noise.
  // Hearts still dominate, but faces appear frequently and randomly.
  if (heartSmokeSpawnCount > 2) {
    const faceSymbols = [
      "😂", "😉", "😀", "😆", "😃",
      "😁", "🤣", "😍", "🥰", "😘",
      "😜", "😙"
    ];

    const platformSymbols = [
      { symbol: "👍", className: "like" },
      { symbol: "🔔", className: "bell" },
      { symbol: "💯", className: "agree" },
      { symbol: "▶️", className: "subscribe" }
    ];

    const guaranteedFace =
      ((heartSmokeSpawnCount - 3) % 3) === 0;

    const randomFace =
      !guaranteedFace && Math.random() < 0.38;

    const randomPlatformIcon =
      !guaranteedFace &&
      !randomFace &&
      Math.random() < 0.14;

    if (guaranteedFace || randomFace) {
      symbol =
        faceSymbols[
          Math.floor(Math.random() * faceSymbols.length)
        ];

      iconClass = "social-face";
    } else if (randomPlatformIcon) {
      const platformIcon =
        platformSymbols[
          Math.floor(Math.random() * platformSymbols.length)
        ];

      symbol = platformIcon.symbol;
      iconClass = platformIcon.className;
    }
  }

  // Exactly one snowflake per intro.
  if (
    !snowflakeReleased &&
    heartSmokeSpawnCount >= 7
  ) {
    snowflakeReleased = true;
    symbol = "❄️";
    iconClass = "snowflake";
  }

    if (!secretFlameReleased && heartSmokeSpawnCount > 9) {
    secretFlameReleased = true;
    symbol = "🔥";
    iconClass = "secret-flame";
  }

  /*
    Actor One: a completely ordinary right-lane heart.
    Same class, timing system, drift and CSS animation as every other heart.
    The crack is its only visible difference.
  */
  if (options.carlBroken) {
    symbol = "💔";
    iconClass = "heart";
  }

    item.className = `engage heart-story social-smoke ${iconClass}`;
    item.textContent = symbol;

  if (iconClass === "snowflake") {
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "hold");
    item.style.pointerEvents = "auto";
    item.style.touchAction = "none";

    item.addEventListener("pointerdown", event => {
      event.preventDefault();
      event.stopPropagation();

      const pointX = event.clientX;
      const pointY = event.clientY;

      beginFrostHold(item, pointX, pointY);
    });
  }
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

  setTimeout(() => {
    if (item.parentNode) {
      item.classList.add("heart-fade-black");
    }
  }, fadeAt);

  /*
    When Actor One naturally disappears above the screen,
    immediately begin Actor Two at the bottom-left round robin.
  */
    if (options.carlBroken) {
    setTimeout(() => {
      releaseDeadHeartTowardCarl();
    }, Math.max(0, (dur * 1000) - 650));
  }

  setTimeout(() => {
    if (item.parentNode) item.remove();
  }, (dur * 1000) + 900);
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

    const asset = opts.asset || (
  target.zone === "symbol"
    ? hiveAssets[profileCount % hiveAssets.length]
    : normalAssets[profileCount % normalAssets.length]
);
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
      // Loader avatars drop like heavy system stamps, not coins sliding in from the side.
      const loaderSmash = [
        { sx: "-10px", sy: "-170px", rot: "-7deg" },
        { sx: "18px", sy: "-188px", rot: "5deg" },
        { sx: "4px", sy: "-158px", rot: "-2deg" },
        { sx: "-16px", sy: "-196px", rot: "8deg" },
        { sx: "10px", sy: "-176px", rot: "3deg" }
      ][profileCount % 5];
      sx = loaderSmash.sx;
      sy = loaderSmash.sy;
      profile.style.setProperty("--rot", loaderSmash.rot);
      profile.classList.add("loader-slam");
    }

    profile.style.setProperty("--sx", sx);
    profile.style.setProperty("--sy", sy);
    if (!profile.style.getPropertyValue("--rot")) profile.style.setProperty("--rot", "0deg");
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
  const cards = [...checkGenerals.querySelectorAll(".general")];

  checkGenerals.classList.add("active");

  cards.forEach(card => {
    card.classList.remove("verify", "target");
  });

  /*
    VERIFIED...
    APPROVED...
    AUTHORIZED...
  */
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("verify");
    }, 260 + index * 280);
  });

  /*
    The approval cards become targeting commands,
    then discharge individually.
  */
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove("verify");
      card.classList.add("target");
      fireBlast(index);
    }, 1650 + index * 320);
  });
}

function fireBlast(index) {
  const blast = document.createElement("div");
  blast.className = "blast";

  const angles = ["-18deg", "0deg", "18deg"];
  blast.style.setProperty("--a", angles[index] || "0deg");

  impactField.appendChild(blast);

  setTimeout(() => {
    if (blast.parentNode) blast.remove();
  }, 500);
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
  carl.style.setProperty("--sx", "-6px");
  carl.style.setProperty("--sy", "-210px");
  carl.style.setProperty("--rot", "-4deg");
  carl.classList.add("loader-slam", "loader-final-slam");
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
  let contactHandled = false;
  let collisionFrame = 0;

  const heart = document.createElement("div");
  heart.className = "engage carl-trigger-heart asset-heart pink-stage matrix-error-heart";
  heart.style.left = "12%";
  heart.style.top = "103%";
  heart.style.opacity = "0";
  heart.style.setProperty("animation", "none", "important");
  heart.style.setProperty("width", "34px", "important");
  heart.style.setProperty("height", "34px", "important");
  heart.innerHTML = `
    <span class="carl-heart-layer carl-heart-red" aria-hidden="true">💔</span>
    <img class="carl-heart-layer carl-heart-grey" src="${HEART_GREY}" alt="">
  `;

  engagementField.appendChild(heart);

  const flightDuration = 9000;
  const flight = heart.animate(CARL_HEART_PATH, {
    duration: flightDuration,
    easing: "linear",
    fill: "forwards"
  });

  setTimeout(() => {
    if (!heart.parentNode) return;
    carl = profileField.querySelector(".profile.carl") || spawnCarl();
    carlSeen = true;
  }, 11200);

  let returnClimbStarted = false;
  let greyFadeComplete = false;

  const redLayer = heart.querySelector(".carl-heart-red");
  const greyLayer = heart.querySelector(".carl-heart-grey");
  if (redLayer) {
    redLayer.style.setProperty("opacity", "1", "important");
    redLayer.style.setProperty("visibility", "visible", "important");
    redLayer.style.setProperty("transition", "none", "important");
  }

  if (greyLayer) {
    greyLayer.style.setProperty("display", "block", "important");
    greyLayer.style.setProperty("visibility", "visible", "important");
    greyLayer.style.setProperty("opacity", "0", "important");
    greyLayer.style.setProperty("transform", "scale(2.28)", "important");
    greyLayer.style.setProperty("transition", "none", "important");
  }

    const syncGreyHeartToPosition = () => {
    if (!heart.isConnected || contactHandled) return;

    const rect = heart.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight ||
      document.documentElement.clientHeight;

    const viewportWidth =
      window.innerWidth ||
      document.documentElement.clientWidth;

    const heartCenterY = rect.top + rect.height / 2;
    const heartCenterX = rect.left + rect.width / 2;

    const yRatio = heartCenterY / viewportHeight;
    const xRatio = heartCenterX / viewportWidth;

    /*
      The fade is allowed to begin only after Little Miss Grey
      has completed the invisible reset and re-entered on the left.
    */
    if (
      !returnClimbStarted &&
      xRatio <= 0.35 &&
      yRatio <= 0.96 &&
      yRatio >= 0.86
    ) {
      returnClimbStarted = true;
    }

    if (returnClimbStarted && !greyFadeComplete) {
      const FADE_START_Y = 0.89;
      const FADE_FULL_Y = 0.61;

      const rawProgress = Math.max(
        0,
        Math.min(
          1,
          (FADE_START_Y - yRatio) /
            (FADE_START_Y - FADE_FULL_Y)
        )
      );

      /*
        Smootherstep removes the visible halfway hitch while
        preserving the two approved fade lines.
      */
      const easedFade =
        rawProgress *
        rawProgress *
        rawProgress *
        (
          rawProgress *
          (rawProgress * 6 - 15) +
          10
        );

      if (redLayer) {
        redLayer.style.setProperty(
          "opacity",
          String(1 - easedFade),
          "important"
        );

        redLayer.style.setProperty(
          "visibility",
          easedFade >= 0.995 ? "hidden" : "visible",
          "important"
        );
      }

      if (greyLayer) {
        greyLayer.style.setProperty(
          "opacity",
          String(easedFade),
          "important"
        );

        greyLayer.style.setProperty(
          "visibility",
          "visible",
          "important"
        );

        /*
          Keep the gray asset from visibly jumping in size
          while it takes over from the emoji.
        */
        greyLayer.style.setProperty(
          "transform",
          `scale(${2.28 - easedFade * 0.18})`,
          "important"
        );
      }

      if (rawProgress >= 1) {
        greyFadeComplete = true;

        heart.classList.remove(
          "pink-stage",
          "grey-taking-over",
          "grey-return-visible"
        );

        heart.classList.add("dead-stage");

        if (redLayer) {
          redLayer.style.setProperty(
            "opacity",
            "0",
            "important"
          );

          redLayer.style.setProperty(
            "visibility",
            "hidden",
            "important"
          );
        }

        if (greyLayer) {
          greyLayer.style.setProperty(
            "opacity",
            "1",
            "important"
          );

          greyLayer.style.setProperty(
            "visibility",
            "visible",
            "important"
          );

          greyLayer.style.setProperty(
            "transform",
            "scale(1.98)",
            "important"
          );
        }
      }
    }

    requestAnimationFrame(syncGreyHeartToPosition);
  };

  requestAnimationFrame(syncGreyHeartToPosition);

  const popOnPixelContact = () => {
    if (contactHandled || !heart.isConnected) return;

    carl =
      carl ||
      profileField.querySelector(".profile.carl");

    if (carl && carl.isConnected) {
      const heartRect = heart.getBoundingClientRect();
      const carlRect = carl.getBoundingClientRect();

      /*
        Ignore the transparent padding around the gray PNG.
        These inner rectangles represent the visible heart and
        visible Carl profile instead of their oversized boxes.
      */
      const heartInsetX = heartRect.width * 0.34;
      const heartInsetY = heartRect.height * 0.28;

      const visibleHeart = {
        left: heartRect.left + heartInsetX,
        right: heartRect.right - heartInsetX,
        top: heartRect.top + heartInsetY,
        bottom: heartRect.bottom - heartInsetY
      };

      const carlInset = 2;

      const visibleCarl = {
        left: carlRect.left + carlInset,
        right: carlRect.right - carlInset,
        top: carlRect.top + carlInset,
        bottom: carlRect.bottom - carlInset
      };

      const touching =
        visibleHeart.right >= visibleCarl.left &&
        visibleHeart.left <= visibleCarl.right &&
        visibleHeart.bottom >= visibleCarl.top &&
        visibleHeart.top <= visibleCarl.bottom;

      if (touching) {
        contactHandled = true;
        cancelAnimationFrame(collisionFrame);

        /*
          Freeze on the exact first-contact frame.
          No landing, hovering or sliding across Carl.
        */
        flight.pause();

        try {
          flight.commitStyles();
        } catch (error) {
          // Safari may not expose commitStyles; pause still freezes it.
        }

        heart.classList.remove(
          "pink-stage",
          "grey-taking-over",
          "grey-return-visible"
        );

        heart.classList.add(
          "dead-stage",
          "carl-heart-pop"
        );

        if (redLayer) {
          redLayer.style.setProperty(
            "opacity",
            "0",
            "important"
          );

          redLayer.style.setProperty(
            "visibility",
            "hidden",
            "important"
          );
        }

        if (greyLayer) {
          greyLayer.style.setProperty(
            "opacity",
            "1",
            "important"
          );

          greyLayer.style.setProperty(
            "visibility",
            "visible",
            "important"
          );
        }

        const contactX = Math.max(
          visibleHeart.left,
          Math.min(
            visibleHeart.right,
            visibleCarl.left
          )
        );

        const contactY = Math.max(
          visibleHeart.top,
          Math.min(
            visibleHeart.bottom,
            visibleCarl.top +
              (visibleCarl.bottom - visibleCarl.top) / 2
          )
        );

                /*
          Love at first pixel:
          contact creates the visible pop first.
          Carl's triple RROD begins only after the pop registers.
        */
        spawnCarlZap(contactX, contactY);

        setTimeout(() => {
          triggerCarl(carl);
        }, 90);

        setTimeout(() => {
          if (heart.isConnected) {
            heart.remove();
          }
        }, 150);

        return;
      }
    }

    collisionFrame =
      requestAnimationFrame(popOnPixelContact);
  };

  collisionFrame =
    requestAnimationFrame(popOnPixelContact);

  flight.onfinish = () => {
    cancelAnimationFrame(collisionFrame);

    if (!contactHandled) {
      carl =
        carl ||
        profileField.querySelector(".profile.carl") ||
        spawnCarl();

      contactHandled = true;

      heart.classList.add("heart-pop");
      heart.classList.remove("grey-taking-over");
      heart.classList.add(
        "dead-stage",
        "carl-heart-pop"
      );

            if (carl && carl.isConnected) {
        const c = carl.getBoundingClientRect();

        spawnCarlZap(
          c.left,
          c.top + c.height / 2
        );

        setTimeout(() => {
          triggerCarl(carl);
        }, 90);
      }

      setTimeout(() => {
        if (heart.isConnected) heart.remove();
      }, 300);
    }
  };

  setTimeout(() => {
    cancelAnimationFrame(collisionFrame);

    if (heart.isConnected) heart.remove();
  }, flightDuration + 1200);
}

function spawnCarlZap(viewportX, viewportY) {
  const zap = document.createElement("div");
  zap.className = "carl-zap-spark carl-contact-pop";
  zap.innerHTML = `<span class="carl-zap-core"></span><span class="carl-zap-arc"></span>`;

  const fieldRect = impactField.getBoundingClientRect();
  const x = Number.isFinite(viewportX) ? viewportX - fieldRect.left : fieldRect.width * ((CARL_ZONE.x - 6.2) / 100);
  const y = Number.isFinite(viewportY) ? viewportY - fieldRect.top : fieldRect.height * (CARL_ZONE.y / 100);

  zap.style.left = `${x}px`;
  zap.style.top = `${y}px`;
  impactField.appendChild(zap);
  setTimeout(() => zap.remove(), 520);
}

function triggerCarl(carl) {
  if (!carl || !carl.parentNode || carlTriggered) return;

  carlTriggered = true;
  carl.classList.add("carl-impact-visible", "carl-ready");

  const oldRing = carl.querySelector(".carl-rrod-ring");
  if (oldRing) oldRing.remove();

  const ring = document.createElement("span");
  ring.className = "carl-rrod-ring";
  ring.setAttribute("aria-hidden", "true");
  carl.appendChild(ring);

  /*
    Real RROD:
    thin red ring flickers 3 times, then holds faintly
    for the remaining click window.
  */
    /*
    Love at first pixel:
    pop finishes first, then exactly three unmistakable red flashes.
  */
  ring.animate(
    [
      { opacity: 0, transform: "scale(.97)", offset: 0 },

      { opacity: 1, transform: "scale(1)", offset: .06 },
      { opacity: 1, transform: "scale(1)", offset: .18 },
      { opacity: 0, transform: "scale(.985)", offset: .19 },

      { opacity: 1, transform: "scale(1)", offset: .34 },
      { opacity: 1, transform: "scale(1)", offset: .47 },
      { opacity: 0, transform: "scale(.985)", offset: .48 },

      { opacity: 1, transform: "scale(1)", offset: .64 },
      { opacity: 1, transform: "scale(1)", offset: .79 },
      { opacity: 0, transform: "scale(.985)", offset: .80 },

      { opacity: .30, transform: "scale(1)", offset: 1 }
    ],
    {
      duration: 1250,
      easing: "steps(1, end)",
      fill: "forwards"
    }
  );

  carl.animate(
    [
      { filter: "none" },
      { filter: "brightness(1.35) saturate(1.4)" },
      { filter: "none" },
      { filter: "brightness(1.2) saturate(1.25)" },
      { filter: "none" }
    ],
    {
      duration: 520,
      easing: "steps(1, end)"
    }
  );

  setTimeout(() => {
    if (!carlOpened && carl && carl.parentNode) {
      carl.classList.remove(
        "carl-ready",
        "carl-ring-death",
        "carl-impact-visible",
        "carl-dead-profile"
      );

      const activeRing =
        carl.querySelector(".carl-rrod-ring");

      if (activeRing) activeRing.remove();
    }
  }, 2300);
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
  wren.style.top = `calc(22% - ${AVATAR_HALF}px)`;
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
    pulse.style.top = "22%";
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
/* =========================================================
   FROST TIMELINE — HIDDEN SNOWFLAKE HOLD
========================================================= */

let frostHolding = false;
let frostLocked = false;
let frostHoldTimer = null;
let frostOverlay = null;
let frostOriginX = 50;
let frostOriginY = 50;
let frostPausedAnimations = [];

const FROST_HOLD_MS = 7000;
const TAWNYA_ASSET = "Tawnya.profile.PNG";

function pauseFrostTimeline() {
  document.documentElement.classList.add("frost-time-stop");

  frostPausedAnimations = document
    .getAnimations({ subtree: true })
    .filter(animation => animation.playState === "running");

  frostPausedAnimations.forEach(animation => {
    try {
      animation.pause();
    } catch (error) {
      // Safari safety.
    }
  });
}

function resumeFrostTimeline() {
  if (frostLocked) return;

  document.documentElement.classList.remove(
    "frost-time-stop",
    "frost-conquering",
    "frost-dead-world"
  );

  frostPausedAnimations.forEach(animation => {
    try {
      animation.play();
    } catch (error) {
      // Safari safety.
    }
  });

  frostPausedAnimations = [];

  if (frostOverlay) {
    frostOverlay.remove();
    frostOverlay = null;
  }
}

function createFrostOverlay(pointX, pointY) {
  if (frostOverlay) frostOverlay.remove();

  frostOriginX = Math.max(
    0,
    Math.min(100, (pointX / window.innerWidth) * 100)
  );

  frostOriginY = Math.max(
    0,
    Math.min(100, (pointY / window.innerHeight) * 100)
  );

  frostOverlay = document.createElement("div");
  frostOverlay.className = "c17-frost-overlay";

  frostOverlay.style.setProperty(
    "--frost-x",
    `${frostOriginX}%`
  );

  frostOverlay.style.setProperty(
    "--frost-y",
    `${frostOriginY}%`
  );

  frostOverlay.innerHTML = `
  <canvas
    class="c17-frost-canvas"
    aria-hidden="true"
  ></canvas>
`;

  document.body.appendChild(frostOverlay);
}

function beginFrostHold(snowflake, pointX, pointY) {
  if (frostLocked || frostHolding) return;

  frostHolding = true;

  createFrostOverlay(pointX, pointY);
  pauseFrostTimeline();

  const cancelHold = () => {
    document.removeEventListener(
      "pointerup",
      cancelHold,
      true
    );

    document.removeEventListener(
      "pointercancel",
      cancelHold,
      true
    );

    if (!frostHolding || frostLocked) return;

    frostHolding = false;

    clearTimeout(frostHoldTimer);
    frostHoldTimer = null;

    resumeFrostTimeline();
  };

  document.addEventListener(
    "pointerup",
    cancelHold,
    true
  );

  document.addEventListener(
    "pointercancel",
    cancelHold,
    true
  );

  frostHoldTimer = setTimeout(() => {
    if (!frostHolding || frostLocked) return;

    frostLocked = true;
    frostHolding = false;

    document.removeEventListener(
      "pointerup",
      cancelHold,
      true
    );

    document.removeEventListener(
      "pointercancel",
      cancelHold,
      true
    );

    launchFrostTimeline();
  }, FROST_HOLD_MS);
}

function launchFrostTimeline() {
  if (!frostOverlay) return;

  document.documentElement.classList.add(
    "frost-conquering"
  );

  frostOverlay.classList.add("frost-grow");

  const canvas =
    frostOverlay.querySelector(".c17-frost-canvas");

  if (!canvas) return;

  growFrostAcrossScreen(canvas);
}

function growFrostAcrossScreen(canvas) {
  const context = canvas.getContext("2d");

  if (!context) return;

  const pixelRatio =
    Math.min(window.devicePixelRatio || 1, 2);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  canvas.width = Math.round(
    screenWidth * pixelRatio
  );

  canvas.height = Math.round(
    screenHeight * pixelRatio
  );

  canvas.style.width = `${screenWidth}px`;
  canvas.style.height = `${screenHeight}px`;

  context.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

  const originX =
    screenWidth * (frostOriginX / 100);

  const originY =
    screenHeight * (frostOriginY / 100);

  const maskCanvas =
    document.createElement("canvas");

  maskCanvas.width = canvas.width;
  maskCanvas.height = canvas.height;

  const mask =
    maskCanvas.getContext("2d");

  mask.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

  const edgeCanvas =
    document.createElement("canvas");

  edgeCanvas.width = canvas.width;
  edgeCanvas.height = canvas.height;

  const edge =
    edgeCanvas.getContext("2d");

  edge.setTransform(
    pixelRatio,
    0,
    0,
    pixelRatio,
    0,
    0
  );

  const tips = [];
  const startTime = performance.now();
  const growthDuration = 11800;

  const farthestDistance = Math.max(
    Math.hypot(originX, originY),
    Math.hypot(
      screenWidth - originX,
      originY
    ),
    Math.hypot(
      originX,
      screenHeight - originY
    ),
    Math.hypot(
      screenWidth - originX,
      screenHeight - originY
    )
  );

  function createTip(
    x,
    y,
    angle,
    speed,
    width,
    generation = 0
  ) {
    return {
      x,
      y,
      previousX: x,
      previousY: y,
      angle,
      speed,
      width,
      generation,
      life: 0,
      dead: false,
      branchChance:
        generation === 0 ? 0.032 : 0.018
    };
  }

  /*
    Many separate crystal tips are born beneath the user's
    fingertip. Their different speeds prevent a circular wipe.
  */
  const originalTipCount = 42;

  for (
    let index = 0;
    index < originalTipCount;
    index += 1
  ) {
    const baseAngle =
      (Math.PI * 2 * index) /
      originalTipCount;

    const angleJitter =
      (Math.random() - 0.5) * 0.28;

    tips.push(
      createTip(
        originX,
        originY,
        baseAngle + angleJitter,
        0.72 + Math.random() * 1.18,
        8 + Math.random() * 15
      )
    );
  }

  /*
    The first frozen seed directly beneath the fingertip.
  */
  mask.fillStyle = "rgba(255,255,255,1)";
  mask.beginPath();
  mask.arc(
    originX,
    originY,
    12,
    0,
    Math.PI * 2
  );
  mask.fill();

  function drawFrozenMaterial() {
    context.clearRect(
      0,
      0,
      screenWidth,
      screenHeight
    );

    /*
      Pale blue frozen glass revealed only where the growth
      mask has physically reached.
    */
    context.save();

    context.drawImage(
      maskCanvas,
      0,
      0,
      screenWidth,
      screenHeight
    );

    context.globalCompositeOperation =
      "source-in";

    const frozenGradient =
      context.createLinearGradient(
        0,
        0,
        screenWidth,
        screenHeight
      );

    frozenGradient.addColorStop(
      0,
      "rgba(224,249,255,0.97)"
    );

    frozenGradient.addColorStop(
      0.28,
      "rgba(154,215,237,0.96)"
    );

    frozenGradient.addColorStop(
      0.52,
      "rgba(207,241,249,0.98)"
    );

    frozenGradient.addColorStop(
      0.76,
      "rgba(113,184,216,0.97)"
    );

    frozenGradient.addColorStop(
      1,
      "rgba(226,248,252,0.98)"
    );

    context.fillStyle = frozenGradient;

    context.fillRect(
      0,
      0,
      screenWidth,
      screenHeight
    );

    /*
      Milky clouding trapped inside the frozen glass.
    */
    context.globalCompositeOperation =
      "source-atop";

    context.fillStyle =
      "rgba(242,253,255,0.24)";

    for (
      let cloudIndex = 0;
      cloudIndex < 26;
      cloudIndex += 1
    ) {
      const cloudX =
        originX +
        Math.cos(cloudIndex * 2.39) *
        farthestDistance *
        ((cloudIndex % 9) / 9);

      const cloudY =
        originY +
        Math.sin(cloudIndex * 1.73) *
        farthestDistance *
        ((cloudIndex % 11) / 11);

      const cloudRadius =
        34 + (cloudIndex % 6) * 19;

      const cloudGradient =
        context.createRadialGradient(
          cloudX,
          cloudY,
          0,
          cloudX,
          cloudY,
          cloudRadius
        );

      cloudGradient.addColorStop(
        0,
        "rgba(255,255,255,0.28)"
      );

      cloudGradient.addColorStop(
        1,
        "rgba(255,255,255,0)"
      );

      context.fillStyle = cloudGradient;
      context.beginPath();

      context.arc(
        cloudX,
        cloudY,
        cloudRadius,
        0,
        Math.PI * 2
      );

      context.fill();
    }

    context.restore();

    /*
      Bright crystal veins and active glowing tips stay above
      the pale-blue frozen backdrop.
    */
    context.save();

    context.globalCompositeOperation =
      "screen";

    context.shadowColor =
      "rgba(194,236,255,0.95)";

    context.shadowBlur = 9;

    context.drawImage(
      edgeCanvas,
      0,
      0,
      screenWidth,
      screenHeight
    );

    context.restore();
  }

  function growFrame(now) {
    const elapsed = now - startTime;

    const progress =
      Math.min(1, elapsed / growthDuration);

    /*
      Several tiny growth steps per rendered frame make the
      branches crawl instead of jumping.
    */
    const stepsThisFrame =
      progress < 0.32 ? 3 : 4;

    for (
      let step = 0;
      step < stepsThisFrame;
      step += 1
    ) {
      const currentTips = [...tips];

      currentTips.forEach(tip => {
        if (tip.dead) return;

        tip.life += 1;

        tip.previousX = tip.x;
        tip.previousY = tip.y;

        /*
          Gentle wandering creates organic frost veins.
        */
        tip.angle +=
          (Math.random() - 0.5) *
          (tip.generation === 0 ? 0.11 : 0.17);

        /*
          Some branches hesitate while others briefly surge.
        */
        const movement =
          tip.speed *
          (
            0.68 +
            Math.random() * 1.12
          );

        tip.x += Math.cos(tip.angle) * movement;
        tip.y += Math.sin(tip.angle) * movement;

        const distanceFromOrigin =
          Math.hypot(
            tip.x - originX,
            tip.y - originY
          );

        const distanceProgress =
          Math.min(
            1,
            distanceFromOrigin /
            farthestDistance
          );

        /*
          The branch widens behind its bright leading tip.
          This is the frozen backdrop physically filling in.
        */
        const fillWidth =
          tip.width +
          8 +
          distanceProgress * 27;

        mask.lineCap = "round";
        mask.lineJoin = "round";
        mask.strokeStyle =
          "rgba(255,255,255,0.98)";
        mask.lineWidth = fillWidth;

        mask.beginPath();
        mask.moveTo(
          tip.previousX,
          tip.previousY
        );
        mask.lineTo(tip.x, tip.y);
        mask.stroke();

        mask.fillStyle =
          "rgba(255,255,255,0.96)";

        mask.beginPath();

        mask.arc(
          tip.x,
          tip.y,
          fillWidth * (
            0.42 +
            Math.random() * 0.18
          ),
          0,
          Math.PI * 2
        );

        mask.fill();

        /*
          White-blue crystal line at the moving edge.
        */
        edge.lineCap = "round";
        edge.lineJoin = "round";

        edge.strokeStyle =
          Math.random() > 0.34
            ? "rgba(247,254,255,0.90)"
            : "rgba(171,224,246,0.82)";

        edge.lineWidth =
          Math.max(
            0.8,
            2.6 - distanceProgress * 1.2
          );

        edge.beginPath();
        edge.moveTo(
          tip.previousX,
          tip.previousY
        );
        edge.lineTo(tip.x, tip.y);
        edge.stroke();

        /*
          Forking crystal fingers.
        */
        if (
          tips.length < 190 &&
          tip.life > 10 &&
          tip.generation < 4 &&
          Math.random() < tip.branchChance
        ) {
          const forkDirection =
            Math.random() > 0.5 ? 1 : -1;

          const forkAngle =
            tip.angle +
            forkDirection *
            (
              0.34 +
              Math.random() * 0.66
            );

          tips.push(
            createTip(
              tip.x,
              tip.y,
              forkAngle,
              tip.speed *
                (0.72 + Math.random() * 0.34),
              Math.max(
                4,
                tip.width * 0.68
              ),
              tip.generation + 1
            )
          );
        }

        /*
          Some minor branches naturally stop, leaving uneven
          crystal shapes instead of perfect spokes.
        */
        if (
          tip.generation > 0 &&
          tip.life > 24 &&
          Math.random() < 0.0028
        ) {
          tip.dead = true;
        }

        const outsideScreen =
          tip.x < -90 ||
          tip.x > screenWidth + 90 ||
          tip.y < -90 ||
          tip.y > screenHeight + 90;

        if (outsideScreen) {
          tip.dead = true;
        }
      });
    }

    drawFrozenMaterial();

    const livingOriginalTips =
      tips.filter(
        tip =>
          !tip.dead &&
          tip.generation === 0
      ).length;

    if (
      progress < 1 &&
      livingOriginalTips > 0
    ) {
      requestAnimationFrame(growFrame);
      return;
    }

    /*
      Final frozen glass settles after the crawling front has
      conquered the display.
    */
    mask.fillStyle =
      "rgba(255,255,255,0.92)";

    mask.fillRect(
      0,
      0,
      screenWidth,
      screenHeight
    );

    drawFrozenMaterial();

    frostOverlay.classList.add(
      "frost-complete"
    );

    document.documentElement.classList.add(
      "frost-dead-world"
    );
  }

  requestAnimationFrame(growFrame);
}

function revealTawnyaFromGreyHeart() {
  if (!frostOverlay) return;

  const greyHeart =
    document.querySelector(".carl-trigger-heart");

  const tawnya =
    frostOverlay.querySelector(".c17-tawnya-avatar");

  if (!tawnya) return;

  let centerX = window.innerWidth * 0.22;
  let centerY = window.innerHeight * 0.36;

  if (greyHeart && greyHeart.isConnected) {
    const greyLayer =
      greyHeart.querySelector(".carl-heart-grey");

    const target =
      greyLayer || greyHeart;

    const rect =
      target.getBoundingClientRect();

    centerX =
      rect.left + rect.width / 2;

    centerY =
      rect.top + rect.height / 2;
  }

  tawnya.style.left = `${centerX}px`;
  tawnya.style.top = `${centerY}px`;

  tawnya.classList.add("tawnya-rewriting");

  setTimeout(() => {
    tawnya.classList.add("tawnya-complete");
    tawnya.disabled = false;
  }, 3300);

  tawnya.addEventListener(
    "click",
    () => {
      if (
        !tawnya.classList.contains(
          "tawnya-complete"
        )
      ) {
        return;
      }

      document.dispatchEvent(
        new CustomEvent("c17:tawnya-open")
      );
    },
    { once: true }
  );
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

/* heart57: red return fades grey, pop triggers carl flicker - timing patch marker */
