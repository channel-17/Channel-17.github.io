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
const authCascade = document.getElementById("authCascade");
const authWarning = document.getElementById("authWarning");

let progress = 0;
let state = "normal";
let completed = false;

function setProgress(value){

  progress = Math.max(0, Math.min(100, value));

  fill.style.width =
    progress <= 0
      ? "0%"
      : `calc(${progress}% - 12px)`;

  percent.textContent = `${Math.round(progress)}%`;

}

const loading = setInterval(() => {

  if(state === "normal"){
    progress += .16;
  }

  if(state === "notice"){
    progress += .038;
  }

  if(state === "hide"){
    progress += .26;
  }

  if(progress >= 100 && !completed){

    completed = true;

    progress = 100;

    clearInterval(loading);

    completeSequence();

  }

  setProgress(progress);

}, 45);

/* LITTLE HOMIE senses it earlier */

setTimeout(() => {

  if(completed) return;

  state = "notice";

  turtle.classList.remove("walk");
  turtle.classList.add("notice");

  loader.classList.add("offcourse");

}, 3200);

/* hide/shiver */

setTimeout(() => {

  if(completed) return;

  state = "hide";

  turtle.classList.remove("notice");
  turtle.classList.add("hide");

}, 7600);

/* virus begins */

setTimeout(() => {

  if(completed) return;

  virusLayer.classList.add("active");

  addExtraVirusSpam();

}, 8300);

function completeSequence(){

  state = "done";

  loader.classList.remove("offcourse");
  loader.classList.add("complete");

  /* signal begins clearing noise sooner */

  setTimeout(() => {

    virusLayer.classList.add("clear");

    runAuthCascade();

  }, 50);

  /* symbol appears faster */

  setTimeout(() => {

    signalNode.classList.add("ready");

  }, 650);

  /* little homie peeks */

  setTimeout(() => {

    turtle.classList.remove("hide");
    turtle.classList.add("peek");

  }, 1450);

  /* little homie commits and escapes */

  setTimeout(() => {

    turtle.classList.remove("peek");
    turtle.classList.add("escape");

  }, 2400);

  /* loader disappears faster */

  setTimeout(() => {

    loaderScene.classList.add("fade-out");

  }, 5000);

}

/* CASCADE */

function runAuthCascade(){

  authCascade.innerHTML = "";

  authCascade.classList.add("active");

  authWarning.classList.remove("active");

  const total = 22;

  for(let i = 0; i < total; i++){

    const win = document.createElement("div");

    win.className = "cascade-window";

    const x = -10 + (i * 4.8);
    const y = 5 + (i * 3.9);

    win.style.left = `${x}%`;
    win.style.top = `${y}%`;

    /* slower bomb countdown pacing */

    win.style.animationDelay = `${i * .62}s`;

    authCascade.appendChild(win);

  }

  /* authentic source warning */

  setTimeout(() => {

    authWarning.classList.add("active");

  }, 3200);

  /* clear cascade */

  setTimeout(() => {

    authCascade.classList.remove("active");

    authCascade.innerHTML = "";

  }, 12200);

}

/* EXTRA VIRUS CHAOS */

function addExtraVirusSpam(){

  const labels = [

    ["AUTH","external meaning rejected"],
    ["SIGNAL","human packet resisting"],
    ["MASK","forced identity loop"],
    ["FEED","compression overload"],
    ["SOURCE","private signal detected"],
    ["ERROR","synthetic pressure rising"],
    ["ALERT","carrier instability"],
    ["STACK","emotional suppression"]

  ];

  labels.forEach((item, i) => {

    setTimeout(() => {

      const box = document.createElement("div");

      box.className = "pop extra-pop";

      box.setAttribute("data-title", item[0]);

      box.innerHTML = `
        <p><strong>${item[0]} INTERRUPT</strong></p>
        <p>${item[1]}</p>
        <em>signal contaminated</em>
      `;

      box.style.left = `${6 + (i * 9)}%`;
      box.style.top = `${10 + (i * 7)}%`;

      box.style.width =
        `${220 + ((i % 2) * 40)}px`;

      virusLayer.appendChild(box);

      setTimeout(() => {

        box.style.opacity = ".82";

      }, 30);

    }, 350 + (i * 260));

  });

}

/* OPEN CHANNEL */

function openChannel(){

  if(!signalNode.classList.contains("ready")) return;

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

}, { passive:false });
