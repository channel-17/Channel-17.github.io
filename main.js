const fill = document.getElementById("fill");
const percent = document.getElementById("percent");
const turtle = document.getElementById("turtle");
const virusLayer = document.getElementById("virusLayer");
const loader = document.getElementById("loader");
const loaderScene = document.getElementById("loaderScene");
const signalNode = document.getElementById("signalNode");

let progress = 0;
let state = "normal";
let completed = false;

function setProgress(value){

  progress = Math.max(0, Math.min(100, value));

  fill.style.width = progress <= 0
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

setTimeout(() => {

  if(completed) return;

  state = "notice";

  turtle.classList.remove("walk");
  turtle.classList.add("notice");

  loader.classList.add("offcourse");

}, 3400);

setTimeout(() => {

  if(completed) return;

  state = "hide";

  turtle.classList.remove("notice");
  turtle.classList.add("hide");

}, 7200);

setTimeout(() => {

  if(completed) return;

  virusLayer.classList.add("active");

}, 8000);

function completeSequence(){

  state = "done";

  loader.classList.remove("offcourse");

  loader.classList.add("complete");

  setTimeout(() => {

    signalNode.classList.add("ready");

  }, 1100);

}
