//https://youtu.be/FecdoYBo-s4

// vairables

let juego;
let imgJugador, imgBurbuja, imgFondo, imgFinal;
let musica;

// preload
function preload() {
  imgJugador = loadImage("Pino.png");
  imgBurbuja = loadImage("burbuja.png");
  imgFondo = loadImage("fondo.jpg");
  imgFinal = loadImage("final.png");
  musica = loadSound("Gravity Falls Music.mp3");
}

// lo que controla al pino
class Jugador {
  constructor() {
    this.t = 40;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - this.t;
    this.vivo = true;
  }

  mover(k) {
    let p = 40;
    if (k === "ArrowUp") this.y -= p;
    if (k === "ArrowDown") this.y += p;
    if (k === "ArrowLeft") this.x -= p;
    if (k === "ArrowRight") this.x += p;

    this.x = constrain(this.x, 0, width - this.t);
    this.y = constrain(this.y, 0, height - this.t);
  }

  mostrar() {
    image(imgJugador, this.x, this.y, this.t, this.t);
  }
}

// lo que contraloa la burbuja
class Burbuja {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.t = 30;
  }

  mover() {
    this.x += this.v;
    if (this.x > width) this.x = -this.t;
    if (this.x < -this.t) this.x = width;
  }

  mostrar() {
    image(imgBurbuja, this.x, this.y, this.t, this.t);
  }

  colision(j) {
    return (
      j.x < this.x + this.t &&
      j.x + j.t > this.x &&
      j.y < this.y + this.t &&
      j.y + j.t > this.y
    );
  }
}

// lo del juego
class Juego {
  constructor() {
    this.estado = "inicio";
    this.jugador = new Jugador();
    this.burbujas = [];
    this.crearBurbujas();
  }

  crearBurbujas() {
    this.burbujas = [];
    for (let i = 0; i < 6; i++) {
      this.burbujas.push(
        new Burbuja(random(width), 120 + i * 60, random([-2, 2]))
      );
    }
  }

  iniciar() {
    this.estado = "jugando";
    this.jugador.reset();
    this.crearBurbujas();
    musica.setVolume(0.2);
    musica.loop();
  }

  actualizar() {
    if (this.estado === "inicio") {
      this.pantallaInicio();
    }

    if (this.estado === "jugando") {
      image(imgFondo, 0, 0, width, height);

      for (let b of this.burbujas) {
        b.mover();
        b.mostrar();
        if (b.colision(this.jugador)) {
          this.estado = "perdiste";
          musica.stop();
        }
      }

      this.jugador.mostrar();

      if (this.jugador.y <= 0) {
        this.estado = "ganaste";
        musica.stop();
      }
    }

    if (this.estado === "perdiste") {
      background(0);
      fill(255, 0, 0);
      textAlign(CENTER);
      textSize(30);
      text("Perdiste", width / 2, height / 2);
      textSize(16);
      text("ENTER para reiniciar", width / 2, height / 2 + 40);
    }

    if (this.estado === "ganaste") {
      image(imgFinal, 0, 0, width, height);
      fill(255);
      textAlign(CENTER);
      text("Presiona R para volver al inicio", width / 2, height - 30);
    }
  }

  pantallaInicio() {
    background(0);
    fill(255);
    textAlign(CENTER);
    textSize(28);
    text("Escapa de Bill", width / 2, height / 2 - 60);
    textSize(16);
    text("Usa las flechas para moverte", width / 2, height / 2 - 20);
    text("Llega hasta la parte superior sin chocar", width / 2, height / 2 + 10);
    text("Presiona ENTER para comenzar", width / 2, height / 2 + 40);
    text("Hecho por: Julian Murphy", width / 2, height - 30);
  }
}

// setup y drew
function setup() {
  createCanvas(600, 500);
  juego = new Juego();
}

function draw() {
  juego.actualizar();
}

// cpntroles
function keyPressed() {
  if (key === "Enter" && (juego.estado === "inicio" || juego.estado === "perdiste")) {
    juego.iniciar();
  }

  if ((key === "r" || key === "R") && juego.estado === "ganaste") {
    juego.estado = "inicio";
  }

  if (juego.estado === "jugando") {
    juego.jugador.mover(key);
  }
}
