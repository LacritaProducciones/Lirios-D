const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

/* 🌸 pétalo de lirio (largo y curvado hacia atrás) */
function lilyPetal(size, angle, phase) {
  ctx.save();
  ctx.rotate(angle + Math.sin(t + phase) * 0.03);

  const grad = ctx.createLinearGradient(0, 0, 0, -size);
  grad.addColorStop(0, "#fff1f7");
  grad.addColorStop(0.4, "#e38ac4");
  grad.addColorStop(1, "#8e2b73");

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    size * 0.25, -size * 0.4,
    size * 0.15, -size * 0.9,
    0, -size
  );
  ctx.bezierCurveTo(
    -size * 0.15, -size * 0.9,
    -size * 0.25, -size * 0.4,
    0, 0
  );

  ctx.fillStyle = grad;
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#b84fa2";
  ctx.fill();

  ctx.restore();
}

/* 🌾 estambres */
function stamens() {
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI * 2 / 6) * i;
    ctx.save();
    ctx.rotate(a);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -55);
    ctx.strokeStyle = "#f4d06f";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, -58, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#d18b00";
    ctx.fill();

    ctx.restore();
  }
}

/* 🌺 lirio completo */
function lily(x, y, scale, phase) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // pétalos traseros
  for (let i = 0; i < 3; i++) {
    lilyPetal(140, (Math.PI * 2 / 3) * i + 0.3, phase + i);
  }

  // pétalos frontales
  for (let i = 0; i < 3; i++) {
    lilyPetal(130, (Math.PI * 2 / 3) * i - 0.3, phase + i + 2);
  }

  stamens();

  ctx.restore();
}

/* 🌿 hojas largas */
function leaf(x, y, scale, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(angle);

  const grad = ctx.createLinearGradient(0, 0, 0, 200);
  grad.addColorStop(0, "#7bd69f");
  grad.addColorStop(1, "#1f6b4f");

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(40, 120, 0, 220);
  ctx.quadraticCurveTo(-40, 120, 0, 0);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.restore();
}

/* 🌸 animación */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2 + 60);

  // hojas
  leaf(-90, 120, 1, -0.4);
  leaf(90, 120, 1, 0.4);

  // lirios (ramo)
  lily(-120, 0, 0.9, 0);
  lily(0, -40, 1.1, 1);
  lily(120, 0, 0.9, 2);

  ctx.restore();

  t += 0.015;
  requestAnimationFrame(animate);
}

animate();
