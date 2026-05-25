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

let progress = 0;

let state = "normal";

function setProgress(value){

  progress = Math.max(0, Math.min(100, value));

  fill.style.width = `calc(${progress}% - 12px)`;

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

  if(progress >= 100){

    progress = 100;

    clearInterval(loading);

    completeSequence();

  }

  setProgress(progress);

}, 45);

setTimeout(() => {

  state = "notice";

  turtle.classList.remove("walk");

  turtle.classList.add("notice");

  loader.classList.add("offcourse");

}, 4500);

setTimeout(() => {

  state = "hide";

  turtle.classList.remove("notice");

  turtle.classList.add("hide");

}, 6100);

setTimeout(() => {

  virusLayer.classList.add("active");

}, 7200);

function completeSequence(){

  state = "done";

  loader.classList.remove("offcourse");

  loader.classList.add("complete");

  setTimeout(() => {

    virusLayer.classList.add("clear");

  }, 650);

  setTimeout(() => {

    signalNode.classList.add("ready");

  }, 1100);

  setTimeout(() => {

    turtle.classList.remove("hide");

    turtle.classList.add("peek");

  }, 1650);

  setTimeout(() => {

    turtle.classList.remove("peek");

    turtle.classList.add("escape");

  }, 2900);

  setTimeout(() => {

    loaderScene.classList.add("fade-out");

  }, 6900);

}

signalNode.addEventListener("click", () => {

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

});
