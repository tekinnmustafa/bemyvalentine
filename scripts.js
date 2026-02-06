// 1) Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
 for (const e of entries) {
   if (e.isIntersecting) e.target.classList.add("show");
 }
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));
// 2) Name from URL ?name=Stasya (optional, safe)
const params = new URLSearchParams(location.search);
const name = params.get("name");
if (name) {
 const safe = name.replace(/[<>]/g, "");
 const toNameEl = document.getElementById("toName");
 // If the element exists (older versions), update it
 if (toNameEl) toNameEl.textContent = safe;
 // Also update the first .name in the header if present
 const firstNameEl = document.querySelector(".name");
 if (firstNameEl) firstNameEl.textContent = safe;
}
// 3) Music toggle (optional)
const audio = document.getElementById("bgm");
const toggleBtn = document.getElementById("toggleMusic");
let musicOn = false;
if (toggleBtn && audio) {
 toggleBtn.addEventListener("click", async () => {
   try {
     if (!musicOn) {
       await audio.play();
       musicOn = true;
       toggleBtn.textContent = "🔇 Pause music";
     } else {
       audio.pause();
       musicOn = false;
       toggleBtn.textContent = "🎵 Play music";
     }
   } catch {
     // iOS/Browser may block autoplay until user interacts (we already did)
     toggleBtn.textContent = "🎵 Play music";
   }
 });
}
// 4) Yes/No behavior (romantic + playful)
const result = document.getElementById("result");
const yes = document.getElementById("btnYes");
const no = document.getElementById("btnNo");
if (yes && result) {
 yes.addEventListener("click", () => {
   confettiHearts();
   result.innerHTML = `
<span class="big">You just made my heart very, very happy. ❤️</span>
<span class="small">
       Then it’s official — Valentine’s with you.
<br />
       Istanbul can wait… tonight is ours. ✨
</span>
   `;
 });
}
if (no && result) {
 // No button runs away a little (cute, not rude)
 no.addEventListener("mouseenter", () => {
   const dx = (Math.random() * 160) - 80;
   const dy = (Math.random() * 120) - 60;
   no.style.transform = `translate(${dx}px, ${dy}px)`;
 });
 no.addEventListener("click", () => {
   result.innerHTML = `
<span class="big">Okay… 🙈</span>
<span class="small">But I’m still choosing you — every day.</span>
   `;
 });
}
// Tiny confetti hearts (no library)
function confettiHearts() {
 const count = 26;
 for (let i = 0; i < count; i++) {
   const s = document.createElement("span");
   s.textContent = Math.random() < 0.5 ? "💖" : "💗";
   s.style.position = "fixed";
   s.style.left = (Math.random() * 100) + "vw";
   s.style.top = "-20px";
   s.style.fontSize = (14 + Math.random() * 18) + "px";
   s.style.zIndex = 9999;
   s.style.transition = "transform 1.8s ease, opacity 1.8s ease";
   s.style.opacity = "1";
   document.body.appendChild(s);
   const fall = 120 + Math.random() * 140;
   const drift = (Math.random() * 200) - 100;
   requestAnimationFrame(() => {
     s.style.transform = `translate(${drift}px, ${fall}vh) rotate(${(Math.random() * 240) - 120}deg)`;
     s.style.opacity = "0";
   });
   setTimeout(() => s.remove(), 1900);
 }
}