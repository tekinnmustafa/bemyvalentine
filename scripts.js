// 1) Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
 for (const e of entries) {
   if (e.isIntersecting) e.target.classList.add("show");
 }
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));
// 2) Name from URL ?name=Stasya
const params = new URLSearchParams(location.search);
const name = params.get("name");
if (name) {
 const safe = name.replace(/[<>]/g, "");
 document.getElementById("toName").textContent = safe;
}
// 3) Music toggle (optional)
const audio = document.getElementById("bgm");
const toggleBtn = document.getElementById("toggleMusic");
let musicOn = false;
toggleBtn.addEventListener("click", async () => {
 try {
   if (!musicOn) {
     await audio.play();
     musicOn = true;
     toggleBtn.textContent = "🔇 Müziği kapat";
   } else {
     audio.pause();
     musicOn = false;
     toggleBtn.textContent = "🎵 Müziği aç";
   }
 } catch {
   // iOS/Browser may block autoplay until user interacts (we already did)
   toggleBtn.textContent = "🎵 Müziği aç";
 }
});
// 4) Yes/No behavior (romantic + playful)
const result = document.getElementById("result");
const yes = document.getElementById("btnYes");
const no = document.getElementById("btnNo");
yes.addEventListener("click", () => {
 confettiHearts();
 result.innerHTML = `
<span class="big">Yaa… ❤️ O zaman anlaşma tamam.</span>
<span class="small">14 Şubat için küçük bir plan yapıyorum. Hazır ol 🙂</span>
 `;
});
// No button runs away a little (cute, not rude)
no.addEventListener("mouseenter", () => {
 const dx = (Math.random() * 160) - 80;
 const dy = (Math.random() * 120) - 60;
 no.style.transform = `translate(${dx}px, ${dy}px)`;
});
no.addEventListener("click", () => {
 result.innerHTML = `
<span class="big">Tamam… 🙈</span>
<span class="small">Ama ben yine de seni seçiyorum.</span>
 `;
});
// Tiny confetti hearts (no library)
function confettiHearts(){
 const count = 26;
 for(let i=0;i<count;i++){
   const s = document.createElement("span");
   s.textContent = Math.random() < .5 ? "💖" : "💗";
   s.style.position = "fixed";
   s.style.left = (Math.random()*100) + "vw";
   s.style.top = "-20px";
   s.style.fontSize = (14 + Math.random()*18) + "px";
   s.style.zIndex = 9999;
   s.style.transition = "transform 1.8s ease, opacity 1.8s ease";
   s.style.opacity = "1";
   document.body.appendChild(s);
   const fall = 120 + Math.random()*140;
   const drift = (Math.random()*200)-100;
   requestAnimationFrame(() => {
     s.style.transform = `translate(${drift}px, ${fall}vh) rotate(${(Math.random()*240)-120}deg)`;
     s.style.opacity = "0";
   });
   setTimeout(() => s.remove(), 1900);
 }
}