let noCount = 0;
function handleYes(){
 const result = document.getElementById("result");
 const actions = document.getElementById("actions");
 actions.style.opacity = "0.4";
 actions.style.pointerEvents = "none";
 result.innerHTML = `
<strong>I’m the luckiest — it’s you. ❤️</strong><br/><br/>
   Valentine’s with you.
   Dinner, a sweet surprise, and a long Istanbul walk —
   hand in hand, just us.
<br/><br/>
   And after Bali, Netherlands, Belgium, Kos & Rhodes…
   let’s choose our next destination together. 🌍✨
 `;
}
function handleNo(){
 const btn = document.getElementById("btnNo");
 const result = document.getElementById("result");
 noCount++;
 btn.style.transform =
   `translate(${Math.random()*200-100}px,${Math.random()*120-60}px)`;
 if(noCount >= 3){
   btn.style.opacity = "0";
   btn.style.pointerEvents = "none";
   result.innerHTML = `
     😄 Nice try.
     I’ll keep the <strong>Yes</strong> right there for you. 💘
   `;
 }
}