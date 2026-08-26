window.addEventListener("load",()=>setTimeout(()=>{document.getElementById("loader").style.opacity="0";setTimeout(()=>document.getElementById("loader").remove(),800)},900));

const items=document.querySelectorAll(".reveal");
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
items.forEach(x=>io.observe(x));

document.getElementById("openBtn").onclick=()=>document.getElementById("letter").scrollIntoView({behavior:"smooth"});

const cur=document.querySelector(".cursor");
addEventListener("pointermove",e=>{cur.style.left=e.clientX+"px";cur.style.top=e.clientY+"px"});

const modal=document.getElementById("modal");
document.getElementById("wishBtn").onclick=()=>{modal.classList.add("show");confetti(180)};
document.getElementById("close").onclick=()=>modal.classList.remove("show");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};
document.getElementById("celebrateBtn").onclick=()=>confetti(260);

const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");
let W,H,stars=[],conf=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;stars=Array.from({length:90},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.2,a:Math.random(),s:Math.random()*.015+.004}))}
resize();addEventListener("resize",resize);
function confetti(n){
 for(let i=0;i<n;i++)conf.push({x:W/2+(Math.random()-.5)*100,y:H*.35,vx:(Math.random()-.5)*10,vy:-Math.random()*9-3,s:Math.random()*8+3,r:Math.random()*6,l:100+Math.random()*100});
}
function draw(){
 ctx.clearRect(0,0,W,H);
 stars.forEach(s=>{s.a+=s.s;if(s.a>1||s.a<0)s.s*=-1;ctx.globalAlpha=s.a;ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,7);ctx.fill()});
 conf=conf.filter(p=>p.l>0);conf.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.r+=.2;p.l--;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.globalAlpha=Math.max(0,p.l/130);ctx.fillStyle=["#ff6d9f","#ffd982","#a984ff","#fff","#7ee8ff"][Math.floor(Math.random()*5)];ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.55);ctx.restore()});
 requestAnimationFrame(draw);
}
draw();setTimeout(()=>confetti(60),1300);

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

bgMusic.volume = 0.5;

musicBtn.addEventListener("click", () => {

    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "❚❚";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "♫";
    }

});
let ni=0;
function note(f){if(!audio)return;let o=audio.createOscillator(),g=audio.createGain();o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(.0001,audio.currentTime);g.gain.exponentialRampToValueAtTime(.035,audio.currentTime+.04);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.62);o.connect(g);g.connect(master);o.start();o.stop(audio.currentTime+.65)}
function musicStart(){audio=new(window.AudioContext||window.webkitAudioContext)();master=audio.createGain();master.gain.value=.6;master.connect(audio.destination);on=true;document.getElementById("musicBtn").innerHTML="♫ <span>on</span>";timer=setInterval(()=>note(melody[ni++%melody.length]),520)}
function musicStop(){clearInterval(timer);if(audio)audio.close();audio=null;on=false;document.getElementById("musicBtn").innerHTML="♫ <span>music</span>"}
document.getElementById("musicBtn").onclick=()=>on?musicStop():musicStart();
