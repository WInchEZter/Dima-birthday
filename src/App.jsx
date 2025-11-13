<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>С Днём Рождения, Дима!</title>

<!-- ШРИФТЫ -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;700&display=swap" rel="stylesheet" />

<style>
/* ========== ОБЩИЙ ФОН ========== */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
  background: radial-gradient(circle at top, #4b0082, #15002b);
  color: white;
  text-align: center;
}

/* канвас конфетти */
#confetti {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* подсказка для музыки */
#tapHint {
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.55);
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  z-index: 9999;
}

/* ========== ТЕКСТ ========== */

h1 {
  font-size: clamp(34px, 6vw, 65px);
  font-weight: 700;
  margin-top: 40px;
  background: linear-gradient(90deg, #ffea00, #ff46c4, #63f7ff);
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  z-index: 3;
}

.text {
  font-size: clamp(16px, 2vw, 24px);
  max-width: 900px;
  margin: 20px auto;
  line-height: 1.5;
  position: relative;
  z-index: 3;
}

/* ========== ФОТОБЛОК ========== */

.photos {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  z-index: 3;
  position: relative;
}

.photo-card {
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(6px);
  padding: 10px;
  border-radius: 20px;
  width: clamp(260px, 40vw, 380px);
}

.photo-card img {
  width: 100%;
  border-radius: 16px;
}

/* ========== АНИМАЦИЯ ВЫЕЗДА ========== */
.fadeIn {
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to { opacity: 1; transform: translateY(0); }
}

/* смайлики-клоуны */
.emoji-float {
  position: fixed;
  font-size: 40px;
  animation: floatEmoji infinite linear;
  opacity: 0.7;
  z-index: 3;
}

@keyframes floatEmoji {
  0% { transform: translateY(120vh) rotate(0deg); }
  100% { transform: translateY(-20vh) rotate(360deg); }
}

</style>
</head>

<body>

<canvas id="confetti"></canvas>
<div id="tapHint">🔊 Нажми на экран, чтобы включить музыку</div>

<!-- МУЗЫКА -->
<audio id="bgMusic" src="music.mp3" preload="auto"></audio>

<!-- ЭМОДЗИ-КЛОУНЫ ЛЕТЯТ -->
<script>
const emojis = ["🤡","🎉","🥳","🤡","🎊","🤹‍♂️"];
for (let i = 0; i < 15; i++) {
  const e = document.createElement("div");
  e.className = "emoji-float";
  e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  e.style.left = Math.random()*100 + "vw";
  e.style.animationDuration = (6 + Math.random()*6) + "s";
  document.body.appendChild(e);
}
</script>

<!-- ЗАГОЛОВОК -->
<h1 class="fadeIn">🎉 🤡 С Днём Рождения, Дима! 🤡 🎉</h1>

<!-- ТЕКСТ -->
<p class="text fadeIn" style="animation-delay:0.3s">
  Пусть зарплата в Сокаре растёт как ракета 🚀 настроение будет всегда на 💯  
  <br />а удача каждый день будет рядом!  
  <br />От братишки Исмаила 😎🔥
</p>

<!-- ФОТО -->
<div class="photos fadeIn" style="animation-delay:0.6s">
  <div class="photo-card"><img src="dima1.jpg" /></div>
  <div class="photo-card"><img src="dima2.jpg" /></div>
</div>

<!-- КОНФЕТТИ -->
<script>
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

for (let i = 0; i < 200; i++) {
  confetti.push({
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: Math.random()*6 + 2,
    dx: (Math.random() - 0.5)*2,
    dy: Math.random()*3 + 1,
    color: `hsl(${Math.random()*360}, 100%, 60%)`
  });
}

function drawConfetti() {
  ctx.clearRect(0,0,innerWidth,innerHeight);

  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;

    if (c.y > innerHeight) {
      c.y = -10;
      c.x = Math.random()*innerWidth;
    }
  });

  requestAnimationFrame(drawConfetti);
}

drawConfetti();
</script>

<!-- АВТОЗАПУСК МУЗЫКИ -->
<script>
const audio = document.getElementById("bgMusic");
function tryPlay() {
  audio.play().then(() => {
    document.getElementById("tapHint").style.display = "none";
  }).catch(()=>{});
}

["click","touchstart","pointerdown","keydown"].forEach(ev =>
  document.addEventListener(ev, tryPlay, { once:true })
);

setTimeout(tryPlay, 1000);
</script>

</body>
</html>
