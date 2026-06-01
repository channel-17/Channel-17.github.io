const fill=document.getElementById("fill"),percent=document.getElementById("percent"),turtle=document.getElementById("turtle"),virusLayer=document.getElementById("virusLayer"),loader=document.getElementById("loader"),loaderScene=document.getElementById("loaderScene"),signalNode=document.getElementById("signalNode"),outerSymbol=document.getElementById("outerSymbol"),innerSymbol=document.getElementById("innerSymbol"),maze=document.getElementById("maze"),home=document.getElementById("home"),idleMaze=document.getElementById("idleMaze"),signalGhost=document.getElementById("signalGhost"),motionField=document.getElementById("motionField"),engagementField=document.getElementById("engagementField"),profileField=document.getElementById("profileField"),impactField=document.getElementById("impactField"),checkGenerals=document.getElementById("checkGenerals");
let progress=0,state="normal",completed=false,noticed=false,hidden=false,breached=false,ghosted=false,burning=false,generals=false,frankSeen=false;
let profileTimer=null,engageTimer=null,slashTimer=null,profileCount=0,engageCount=0;
const profileNames=["Sally W","Mike J","Terry P","Donna R","Kevin M","Mara K","Jules V","Mark T","Sue V","Tonya B","Derek L","Amy C","Chris P","Nina S","Paul R","Frank 1358"];
const palettes=[
["#e9c5aa","#f3d25d","#7e2b52"],["#d3a078","#2f211b","#314f8f"],["#cfae94","#111","#557a3a"],["#f1c6b0","#9b724d","#893f3f"],
["#b98563","#171717","#1f5d75"],["#e2b18b","#dedede","#7d3b8c"],["#c99678","#61412d","#222"],["#edd0b6","#b33f2c","#324f7a"]
];
const targets=[{
  x:50,y:31
},{
  x:50,y:48
},{
  x:50,y:55
},{
  x:42,y:47
},{
  x:58,y:47
},{
  x:37,y:31
},{
  x:63,y:31
},{
  x:48,y:39
},{
  x:54,y:38
},{
  x:43,y:58
},{
  x:60,y:58
},{
  x:50,y:31
}];
function setProgress(v){
  progress=Math.max(0,Math.min(100,v));
  fill.style.width=progress<=0?"0%":`calc(${progress}% - 12px)`;
  percent.textContent=`${Math.round(progress)}%`
}

const loading=setInterval(()=>{
  if(state==="normal")progress+=.16;
  if(state==="notice")progress+=.035;
  if(state==="hide")progress+=.23;
  if(progress>=17&&!noticed){
    noticed=true;
    state="notice";
    turtle.classList.remove("walk");
    turtle.classList.add("notice");
    loader.classList.add("offcourse")
  }if(progress>=18.4&&!hidden){
    hidden=true;
    state="hide";
    turtle.classList.remove("notice");
    turtle.classList.add("hide")
  }if(progress>=18.7&&!breached){
    breached=true;
    virusLayer.classList.add("active");
    startAttack()
  }if(progress>=24&&!ghosted){
    ghosted=true;
    signalGhost.classList.add("waking")
  }if(progress>=42&&!burning){
    burning=true;
    signalGhost.classList.add("burning");
    startBurnPulse()
  }if(progress>=55&&!generals){
    generals=true;
    deployGenerals()
  }if(progress>=66&&!frankSeen){
    frankSeen=true;
    spawnFrank()
  }if(progress>=100&&!completed){
    completed=true;
    progress=100;
    clearInterval(loading);
    completeSequence()
  }setProgress(progress)
},45);
function startAttack(){
  spawnProfile("top",0,true);
  setTimeout(()=>spawnProfile("right"),240);
  setTimeout(()=>spawnProfile("left"),420);
  setTimeout(()=>spawnProfile("top"),610);
  profileTimer=setInterval(()=>{
    if(completed)return;
    spawnProfile(randomSide())
  },360);
  engageTimer=setInterval(()=>{
    if(completed)return;
    spawnEngagement()
  },130);
  slashTimer=setInterval(()=>{
    if(completed)return;
    spawnSlash(randomSide())
  },180)
}

function randomSide(){
  return["top","left","right","bottom"][Math.floor(Math.random()*4)]
}

function spawnSlash(side){
  const s=document.createElement("div");
  s.className="slash";
  const y=Math.random()*100,x=Math.random()*100;
  s.style.left=x+"%";
  s.style.top=y+"%";
  let sx="0px",sy="0px",r="0deg";
  if(side==="top"){
    sy="-120px";
    r="90deg"
  }if(side==="bottom"){
    sy="120px";
    r="-90deg"
  }if(side==="left"){
    sx="-160px";
    r="0deg"
  }if(side==="right"){
    sx="160px";
    r="180deg"
  }s.style.setProperty("--sx",sx);
  s.style.setProperty("--sy",sy);
  s.style.setProperty("--r",r);
  motionField.appendChild(s);
  setTimeout(()=>s.remove(),700)
}

function spawnEngagement(){
  const e=document.createElement("div");
  const kind=engageCount%9;
  let txt="❤️",cls="heart";
  if(kind===3){
    txt="👍";
    cls="like"
  }if(kind===5){
    txt="🔔";
    cls="bell"
  }if(kind===7){
    txt="✔";
    cls="mark"
  }if(progress>45&&cls==="heart"){
    txt="🩶";
    cls="heart dead"
  }e.className="engage "+cls;
  e.textContent=txt;
  e.style.left=(72+Math.random()*22)+"%";
  e.style.top=(78+Math.random()*15)+"%";
  e.style.setProperty("--dur",(1.8+Math.random()*1.4)+"s");
  e.style.setProperty("--drift",((-30+Math.random()*60)|0)+"px");
  engagementField.appendChild(e);
  engageCount++;
  setTimeout(()=>e.remove(),3400)
}

function spawnProfile(side,delay=0,forceCenter=false){
  setTimeout(()=>{
    const old=profileField.querySelectorAll(".profile");
    if(old.length>13)old[0].remove();
    const p=document.createElement("div");
    const idx=profileCount%profileNames.length;
    const pal=palettes[idx%palettes.length];
    const t=targets[profileCount%targets.length];
    const stage=progress>58?" blue":progress>42?" stock":"";
    p.className="profile"+stage;
    p.style.left=`calc(${forceCenter?50:t.x}% - 41px)`;
    p.style.top=`calc(${forceCenter?31:t.y}% - 50px)`;
    p.style.setProperty("--face",pal[0]);
    p.style.setProperty("--hair",pal[1]);
    p.style.setProperty("--shirt",pal[2]);
    let sx="0px",sy="0px";
    if(side==="top")sy="-115vh";
    if(side==="bottom")sy="115vh";
    if(side==="left")sx="-115vw";
    if(side==="right")sx="115vw";
    p.style.setProperty("--sx",sx);
    p.style.setProperty("--sy",sy);
    p.innerHTML='<div class="hair"></div><div class="eyes"></div><div class="mouth"></div><div class="name">'+profileNames[idx]+'</div>';
    profileField.appendChild(p);
    profileCount++;
    spawnSlash(side);
    if(progress>44&&Math.random()>.35)setTimeout(()=>decayProfile(p),450+Math.random()*500);
    setTimeout(()=>{
      if(p&&p.parentNode&&!p.classList.contains("frank"))p.remove()
    },3600)
  },delay)
}

function decayProfile(p){
  if(!p||!p.parentNode)return;
  p.classList.add("decay");
  setTimeout(()=>{
    if(p&&p.parentNode){
      p.classList.remove("stock");
      p.classList.add("blue")
    }
  },260)
}

function startBurnPulse(){
  for(let i=0;
  i<5;
  i++){
    setTimeout(()=>{
      const b=document.createElement("div");
      b.className="burn-ring";
      impactField.appendChild(b);
      setTimeout(()=>b.remove(),950)
    },i*650)
  }
}

function deployGenerals(){
  checkGenerals.classList.add("active");
  const gens=[...checkGenerals.querySelectorAll(".general")];
  setTimeout(()=>gens.forEach(g=>g.classList.add("verify")),700);
  setTimeout(()=>gens.forEach(g=>{
    g.classList.remove("verify");
    g.classList.add("target");
    g.querySelector("small").textContent="target"
  }),1300);
  [0,1,2].forEach((n)=>setTimeout(()=>fireBlast(n),1700+n*260))
}

function fireBlast(n){
  const b=document.createElement("div");
  b.className="blast";
  b.style.setProperty("--a",[-18,0,18][n]+"deg");
  impactField.appendChild(b);
  setTimeout(()=>b.remove(),430);
  for(let i=0;
  i<3;
  i++)setTimeout(()=>spawnProfile(["left","right","top"][i]),i*80)
}

function spawnFrank(){
  const p=document.createElement("div");
  p.className="profile frank stock";
  p.style.left="calc(22% - 41px)";
  p.style.top="calc(68% - 50px)";
  p.style.setProperty("--face","#d0ad91");
  p.style.setProperty("--hair","#3c332b");
  p.style.setProperty("--shirt","#426aa0");
  p.style.setProperty("--sx","-60px");
  p.style.setProperty("--sy","40px");
  p.innerHTML='<div class="hair"></div><div class="eyes"></div><div class="mouth"></div><div class="name">Frank 1358</div>';
  profileField.appendChild(p);
  setTimeout(()=>p.classList.add("pause"),420);
  setTimeout(()=>{
    p.classList.remove("stock");
    p.classList.add("blue")
  },980);
  setTimeout(()=>{
    for(let i=0;
    i<6;
    i++)setTimeout(()=>spawnProfile(randomSide()),i*70)
  },1100);
  setTimeout(()=>p.remove(),1900)
}

function stopAttack(){
  clearInterval(profileTimer);
  clearInterval(engageTimer);
  clearInterval(slashTimer);
  profileTimer=engageTimer=slashTimer=null;
  virusLayer.classList.add("retreat");
  setTimeout(()=>{
    profileField.innerHTML="";
    engagementField.innerHTML="";
    motionField.innerHTML="";
    impactField.innerHTML="";
    checkGenerals.classList.remove("active");
    virusLayer.classList.remove("active","retreat");
    signalGhost.classList.remove("waking","burning")
  },1250)
}

function completeSequence(){
  state="done";
  loader.classList.remove("offcourse");
  loader.classList.add("complete");
  setTimeout(()=>{
    stopAttack();
    signalNode.classList.add("ready")
  },350);
  setTimeout(()=>{
    turtle.classList.remove("hide");
    turtle.classList.add("peek")
  },1500);
  setTimeout(()=>loaderScene.classList.add("portal-open"),2500);
  setTimeout(()=>{
    turtle.classList.remove("peek");
    turtle.classList.add("escape")
  },3150);
  setTimeout(()=>loaderScene.classList.add("portal-close"),7650);
  setTimeout(()=>loader.classList.add("homie-cut-out"),7900);
  setTimeout(()=>loaderScene.classList.add("fade-out"),8700)
}

function openChannel(){
  if(!signalNode.classList.contains("ready"))return;
  signalNode.style.pointerEvents="none";
  outerSymbol.classList.add("dissolve");
  innerSymbol.classList.add("alive");
  maze.classList.remove("active");
  void maze.offsetWidth;
  maze.classList.add("active");
  setTimeout(()=>signalNode.classList.add("fade-out"),4700);
  setTimeout(()=>{
    home.classList.add("open");
    idleMaze.classList.add("active")
  },5600)
}
signalNode.addEventListener("click",openChannel);
signalNode.addEventListener("touchend",e=>{
  e.preventDefault();
  openChannel()
},{
  passive:false
});
