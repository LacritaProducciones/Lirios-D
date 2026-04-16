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

  const msg = `Te amé en silencio, desde aquel primer instante,
cuando tu mirada rozó la mía… y cambió todo lo restante.
Quise ocultarlo en sombras, guardarlo en lo profundo,
pero tu nombre latía en cada rincón de mi mundo.

Callé por miedo, por culpa, por lo que no supe hacer,
por las heridas del pasado que no logré deshacer.
Pero hay sentimientos que no saben fingir,
y cada vez que te veía… volvía a sentir.

No importaba el tiempo, ni lo que intentara olvidar,
porque algo en ti siempre me volvía a despertar.
Como un eco constante, como un susurro en mi ser,
recordándome en silencio que te iba a querer.

Hoy tomas otro camino, de la mano de alguien más,
y aunque no fui tu destino… no te voy a detener jamás.
Porque si eres feliz, aunque no sea junto a mí,
prefiero verte sonreír… que tenerte y verte sufrir.

Y aunque no me ames, y aunque nunca lo harás,
mi amor por ti no entiende de finales ni de “quizás”.
No pide respuesta, no exige razón,
solo vive en lo eterno… dentro de mi corazón.

No importará con quién estés, ni a dónde quieras llegar,
porque siempre habrá algo en ti que me vuelva a despertar.
No como un lamento, ni como dolor,
sino como el recuerdo más puro… de lo que es el amor.

Te amaré en silencio, sin tiempo ni condición,
como quien guarda un verso que nunca tuvo canción.
Y aunque la vida nos lleve por distinto sendero,
yo te amaré… incluso si nunca fui el primero.`;

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


