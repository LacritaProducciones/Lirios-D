const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W,H;
function resize(){
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
}
resize();
addEventListener("resize",resize);

let t = 0;

// ---------- LIRIO ----------
function petalo(size, ang, ph){
  ctx.save();
  ctx.rotate(ang + Math.sin(t+ph)*0.03);
  const g = ctx.createLinearGradient(0,0,0,-size);
  g.addColorStop(0,"#ffe6f2");
  g.addColorStop(.5,"#d66ab1");
  g.addColorStop(1,"#8c2a73");
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.bezierCurveTo(size*.3,-size*.4,size*.2,-size*.9,0,-size);
  ctx.bezierCurveTo(-size*.2,-size*.9,-size*.3,-size*.4,0,0);
  ctx.fillStyle=g;
  ctx.shadowBlur=15;
  ctx.shadowColor="rgba(180,80,160,.7)";
  ctx.fill();
  ctx.restore();
}

function pistilos(){
  for(let i=0;i<6;i++){
    ctx.save();
    ctx.rotate((Math.PI*2/6)*i);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,-45);
    ctx.strokeStyle="#f5d76e";
    ctx.lineWidth=2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,-48,4,0,Math.PI*2);
    ctx.fillStyle="#d18b00";
    ctx.fill();
    ctx.restore();
  }
}

function lirio(x,y,s,p){
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(s,s);
  for(let i=0;i<3;i++) petalo(120,(Math.PI*2/3)*i+.3,p+i);
  for(let i=0;i<3;i++) petalo(115,(Math.PI*2/3)*i-.3,p+i+2);
  pistilos();
  ctx.restore();
}

// ---------- ENVOLTURA (BRILLO + DOBLES + LÍNEAS ARRIBA) ----------
function envoltura(){
  ctx.save();
  ctx.translate(0, 140);

  // forma principal
  ctx.beginPath();
  ctx.moveTo(-220, -70);
  ctx.lineTo(0, 280);
  ctx.lineTo(220, -70);
  ctx.closePath();
  ctx.fillStyle = "#0b0b0b";
  ctx.fill();

  // brillo suave en bordes
  ctx.strokeStyle = "rgba(180, 90, 200, 0.25)";
  ctx.lineWidth = 2;
  ctx.shadowBlur = 12;
  ctx.shadowColor = "rgba(180, 90, 200, 0.6)";
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.lineWidth = 1.4;
  ctx.strokeStyle = "rgba(255,255,255,0.14)";

  // ===== DOBLES LATERALES =====
  // izquierdo
  ctx.beginPath();
  ctx.moveTo(-140, -40);
  ctx.lineTo(-40, 230);
  ctx.stroke();

  // línea superior izquierda
  ctx.beginPath();
  ctx.moveTo(-155, -40);
  ctx.lineTo(-125, -40);
  ctx.stroke();

  // derecho
  ctx.beginPath();
  ctx.moveTo(140, -40);
  ctx.lineTo(40, 230);
  ctx.stroke();

  // línea superior derecha
  ctx.beginPath();
  ctx.moveTo(125, -40);
  ctx.lineTo(155, -40);
  ctx.stroke();

  // ===== DOBLES CENTRALES =====
  // centro izquierdo
  ctx.beginPath();
  ctx.moveTo(-60, -30);
  ctx.lineTo(-10, 240);
  ctx.stroke();

  // línea superior centro izquierdo
  ctx.beginPath();
  ctx.moveTo(-70, -30);
  ctx.lineTo(-45, -30);
  ctx.stroke();

  // centro derecho
  ctx.beginPath();
  ctx.moveTo(60, -30);
  ctx.lineTo(10, 240);
  ctx.stroke();

  // línea superior centro derecho
  ctx.beginPath();
  ctx.moveTo(45, -30);
  ctx.lineTo(70, -30);
  ctx.stroke();

  ctx.restore();
}





// ---------- LAZO / MOÑO (A LA MITAD DE LA ENVOLTURA) ----------
function cinta(){
  ctx.save();
  ctx.translate(0, 250); // ⬆️ MÁS ARRIBA (mitad de la envoltura)

  // nudo central
  ctx.fillStyle = "#8e3a83";
  ctx.beginPath();
  ctx.arc(0, 18, 16, 0, Math.PI * 2);
  ctx.fill();

  // lazo izquierdo
  ctx.beginPath();
  ctx.moveTo(-16, 18);
  ctx.quadraticCurveTo(-75, -10, -85, 30);
  ctx.quadraticCurveTo(-60, 65, -16, 36);
  ctx.fill();

  // lazo derecho
  ctx.beginPath();
  ctx.moveTo(16, 18);
  ctx.quadraticCurveTo(75, -10, 85, 30);
  ctx.quadraticCurveTo(60, 65, 16, 36);
  ctx.fill();

  // tiras colgantes
  ctx.fillStyle = "#6f2b63";

  ctx.beginPath();
  ctx.moveTo(-8, 38);
  ctx.lineTo(-32, 135);
  ctx.lineTo(-4, 135);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(8, 38);
  ctx.lineTo(32, 135);
  ctx.lineTo(4, 135);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}


// ---------- TARJETA ----------
function tarjeta(){
  ctx.save();
  ctx.translate(120,260);
  ctx.fillStyle="#fff";
  ctx.shadowBlur=10;
  ctx.shadowColor="rgba(0,0,0,.4)";
  ctx.fillRect(0,0,170,55);
  ctx.shadowBlur=0;
  ctx.fillStyle="#6a2c5f";
  ctx.font="bold 14px Arial";
  ctx.textAlign="center";
  ctx.fillText("Para mi niña hermosa",85,22);
  ctx.font="italic 12px Arial";
  ctx.fillText("(da click)",85,42);
  ctx.restore();
}

// ---------- LOOP ----------
function draw(){
  ctx.clearRect(0,0,W,H);
  ctx.save();
  ctx.translate(W/2, H/2-180);

  const pos=[
    [-120,-50,.9,0],
    [-60,-90,1,1],
    [0,-120,1.15,2],
    [60,-90,1,3],
    [120,-50,.9,4],
    [-90,-10,.8,5],
    [90,-10,.8,6]
  ];
  pos.forEach(p=>lirio(...p));

  envoltura();
  cinta();
  tarjeta();

  ctx.restore();
  t+=.015;
  requestAnimationFrame(draw);
}
draw();

// ---------- CARTA ----------
const letter = document.getElementById("letter");
const letterText = document.getElementById("letterText");

// detectar click en la tarjeta
canvas.addEventListener("click", e => {
  const x = e.clientX;
  const y = e.clientY;

  if (
    x > W / 2 + 120 &&
    x < W / 2 + 290 &&
    y > H / 2 + 80 &&
    y < H / 2 + 135
  ) {
    showLetter();
  }
});

function showLetter() {
  // posición al lado del ramo
  letter.style.left = (W / 2 + 260) + "px";
  letter.style.top  = (H / 2 - 120) + "px";

  letter.classList.add("show");
  letter.style.pointerEvents = "auto"; // 🔴 IMPORTANTE
  letterText.textContent = "";

  const msg = `Mi amor,

desde que llegaste a mi vida todo empezó a sentirse distinto, más bonito, más tranquilo, más real, contigo aprendí que el amor no siempre tiene que doler, que también puede ser suave, sincero, lleno de risas y de abrazos que curan todo,

han pasado 3 meses y aun así siento que te conozco desde hace mucho más, porque contigo todo fluye, contigo soy yo sin miedo, sin máscaras, sin dudas, contigo puedo ser cursi, intenso, callado, loco, soñador, y aun así tú me miras como si eso fuera perfecto,

me encanta la forma en la que sonríes, la forma en la que hablas, la forma en la que me miras sin decir nada y aun así lo dices todo, me encanta cómo me haces sentir en casa incluso cuando estoy lejos, cómo haces que un día normal se vuelva especial solo con existir,

no prometo ser perfecto, pero sí prometo amarte con todo lo que soy, cuidarte, respetarte, elegirte todos los días, incluso en los días difíciles, incluso cuando no sepamos qué decir, incluso cuando el mundo se sienta pesado,

gracias por estos 3 meses, gracias por tu paciencia, por tu cariño, por tu ternura, por quedarte, por enseñarme que amar así de bonito sí es posible,

te amo más de lo que puedo explicar, más de lo que estas palabras alcanzan, más de lo que a veces sé decir, pero siempre con el corazón completo,

siempre tuyo,
con todo mi amor 💖`;

  let i = 0;
  const it = setInterval(() => {
    if (i >= msg.length) {
      clearInterval(it);
      return;
    }
    letterText.textContent += msg[i++];
  }, 28);
}

// 🔴 FUNCIÓN QUE FALTABA BIEN HECHA


#letter {
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #a855f7 transparent;
}

#letter::-webkit-scrollbar {
  width: 6px;
}

#letter::-webkit-scrollbar-track {
  background: transparent;
}

#letter::-webkit-scrollbar-thumb {
  background-color: #a855f7;
  border-radius: 10px;
}

function hideLetter() {
  letter.classList.remove("show");
  letter.style.pointerEvents = "none";
}
