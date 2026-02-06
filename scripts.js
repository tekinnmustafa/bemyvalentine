// 1) Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const io = ("IntersectionObserver" in window)
 ? new IntersectionObserver((entries) => {
     for (const e of entries) {
       if (e.isIntersecting) e.target.classList.add("show");
     }
   }, { threshold: 0.12 })
 : null;
if (io) revealEls.forEach(el => io.observe(el));
// Fallback: if IntersectionObserver doesn't fire, show everything anyway
setTimeout(() => {
 document.querySelectorAll(".reveal").forEach(el => el.classList.add("show"));
}, 700);
// 2) Music toggle (optional)
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
     toggleBtn.textContent = "🎵 Play music";
   }
 });
}
// 3) Yes/No behavior
const result = document.getElementById("result");
const yes = document.getElementById("btnYes");
const no = document.getElementById("btnNo");
if (yes && result) {
 yes.addEventListener("click", () => {
   confettiHearts();
   result.innerHTML = `
<span class="big">I’m the luckiest — it’s you. ❤️</span>
<span class="small">
       Then it’s a Valentine’s date.
<br />
       I’ll plan a beautiful night for us — a sweet surprise, your favorite vibes,
       and a long Istanbul walk where I get to hold your hand.
<br /><br />
       And after Bali, Netherlands, Belgium, Kos & Rhodes…
       let’s choose our next destination together. 🌍✨
</span>
   `;
 });
}
if (no && result && no) {
 let escapes = 0;
 const moveAway = () => {
   escapes++;
   // Move it somewhere random, but keep it near the button area
   const dx = (Math.random() * 220) - 110;
   const dy = (Math.random() * 140) - 70;
   no.style.transform = `translate(${dx}px, ${dy}px)`;
   // After a few attempts, fade it out (playful "vanish")
   if (escapes >= 4) {
     no.style.opacity = "0";
     no.style.pointerEvents = "none";
     result.innerHTML = `
<span class="big">Nice try 😄</span>
<span class="small">I’m keeping the “Yes” right there for you. 💘</span>
     `;
   }
 };
 // Run away when trying to hover OR click
 no.addEventListener("mouseenter", moveAway);
 no.addEventListener("mousedown", (e) => {
   e.preventDefault();
   moveAway();
 });
 no.addEventListener("click", (e) => {
   e.preventDefault();
   moveAway();
 });
}
// Tiny confetti hearts (no library)
function confettiHearts() {
 const count = 28;
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