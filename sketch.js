function setup() {
  createCanvas(400, 400);
}

let img;
let cambiarColor = false;

let filas = 10;
let columnas = 10;

function preload() {
  img = loadImage("F_42.png");
}

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255);
  image(img, 0, 0, width / 2, height);
  dibujarPatron(width / 2, 0, width / 2, height);
}

function dibujarPatron(x, y, w, h) {
  let espacioX = w / columnas;
  let espacioY = h / filas;

  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      let posX = x + i * espacioX;
      let posY = y + j * espacioY;

      let esNegro = (i + j) % 2 === 0;

      if (esNegro) {
        fill(0);
      } else {
        if (cambiarColor) {
          fill(255, 0, 0);
        } else {
          fill(255);
        }
      }
      rect(posX, posY, espacioX, espacioY);

      let radio = calcularRadio(espacioX, espacioY);
      let centroX = posX + espacioX / 2;
      let centroY = posY + espacioY / 2;

      if (esNegro) {
        if (mouseSobreCirculo(centroX, centroY, radio)) {
          fill(255, 0, 0);
        } else {
          fill(255);
        }
      } else {
        fill(0);
      }

      ellipse(centroX, centroY, radio, radio);
    }
  }
}

function calcularRadio(ancho, alto) {
  return min(ancho, alto) * 0.4;
}

function mouseSobreCirculo(cx, cy, r) {
  let distancia = dist(mouseX, mouseY, cx, cy);
  return distancia < r / 2;
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    cambiarColor = !cambiarColor;
  }
}
