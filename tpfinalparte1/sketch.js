//https://youtu.be/YxvRYmcLldc

// Variables
let titulo, play;
let musicaInicio, musicaJuego;
let estado = "inicio";

let escenas = [];             
let escenasGrappling = [];    
let escenasGrappling2 = [];   
let indiceEscena = 0;
let ruta = "normal";          
let avanzarBtn;

// Escenas de decisiones
let decisionFondo1, grapplingGun, diario;
let decisionFondo2, grapplingGun2, correr;
let decisionFondo3, grapplingGun3, correr2;

// Finales
let final1, final2, final3, final4, epilogo;

// Arreglos de diálogos
let dialogosNormal = [];
let dialogosGrappling = [];
let dialogosGrappling2 = [];
let dialogosFinales = [];
let dialogosExtras = [];

function preload() {
  titulo = loadImage('titulo.jpg');
  play = loadImage('play.png');

  // Escenas del inicio
  let nombres = ['a.jpg','b.jpg','c.jpg','d.jpg','e.jpg','f.jpg','g.jpg','h.jpg'];
  for (let i = 0; i < nombres.length; i++) escenas.push(loadImage(nombres[i]));

  // Escenas al elegir el gancho la primera vez
  let nombresGrappling = ['a1.jpg','b1.jpg','c1.jpg','d1.jpg'];
  for (let i = 0; i < nombresGrappling.length; i++) escenasGrappling.push(loadImage(nombresGrappling[i]));

  // Escenas la segunda vez
  let nombresGrappling2 = ['a2.jpg','b2.jpg'];
  for (let i = 0; i < nombresGrappling2.length; i++) escenasGrappling2.push(loadImage(nombresGrappling2[i]));

  avanzarBtn = loadImage('avanzar.png');

  // Decisiones
  decisionFondo1 = loadImage('Desicion1.jpg');
  grapplingGun = loadImage('Grapplinggun.png');
  diario = loadImage('Diario.png');

  decisionFondo2 = loadImage('Desicion2.jpg');
  grapplingGun2 = loadImage('Grapplinggun2.png');
  correr = loadImage('correr.png');

  decisionFondo3 = loadImage('Desicion3.jpg');
  grapplingGun3 = loadImage('Grapplinggun3.png');
  correr2 = loadImage('correr2.png');

  // Finales
  final1 = loadImage('Final1.jpg');
  final2 = loadImage('Final2.jpg');
  final3 = loadImage('Final3.jpg');
  final4 = loadImage('Final4.jpg');
  epilogo = loadImage('epilogo.jpg');

  // Música
  musicaInicio = loadSound('Gravity Falls - Opening Theme Song - HD.mp3');
  musicaJuego = loadSound('Gravity Falls Dreamscaperers Outro Real Loop.mp3');

  // Diálogos
  dialogosNormal = [
    "Es un día tranquilo en Gravity Falls, un día como cualquier otro",
    "Así que Mabel decidió ir a jugar afuera con Pato",
    "Lo que no esperaba Mabel es que al momento de salir se iba a encontrar con Bill, su máximo enemigo",
    "Mabel sorprendida se asusta e intenta escapar antes de que la vea pero ya es muy tarde",
    "Dipper, que había aprovechado el lindo día para ir a buscar rarezas al bosque se desconcierta al ver a Bill a lo lejos",
    "Al acercarse un poco más sigilosamente se da cuenta que ¡Bill se estaba llevando a su hermana!",
    "Rápidamente y casi por instinto vuelve a la cabaña corriendo ya que sabe que allí puede encontrar algo que le sirva para el camino",
    "Lo primero que encuentra al llegar son el diario y el gancho de Mabel"
  ];

  dialogosGrappling = [
    "Dipper vuelve a salir corriendo pero ahora sí decidido más que nunca a rescatar a Mabel",
    "En el camino, mientras pasaba por el bosque, se cruza con Wendy casualmente",
    "Pensando obviamente que ella aceptaría le pide ayuda",
    "Mientras estaban en camino se cruzan de repente con una burbuja de locura evidentemente puesta por Bill para detenerlos"
  ];

  dialogosGrappling2 = [
    "Ambos logran salir, pero se dan cuenta demasiado tarde de que Wendy salió lastimada, por ello Dipper decide por el bien de ambos seguir solo",
    "Dipper corre, corre y corre hasta que siente que las piernas no le dan más"
  ];

  dialogosFinales = [
    "Lamentablemente y sin darse cuenta el diario contenía un hechizo puesto por Bill, este lo hizo dormirse automáticamente",
    "Ambos deciden seguir corriendo teniendo la fe de salir por algún lado pero lamentablemente ambos se pierden y terminan convertidos en marionetas",
    "Lamentablemente su intento de distracción no sirvió y Bill lo terminó por capturar también",
    "Al intentar distraer a Bill golpeándole el ojo con el gancho tuviste tiempo suficiente para rescatar a Mabel y ambos logran escapar"
  ];

  dialogosExtras = [
    "Al volver a toparse con Bill nuevamente tiene que volver a tomar una decisión",
    "¡Así ambos logran festejar juntos un cumpleaños más todos felices junto a su familia!"
  ];
}

function setup() {
  createCanvas(640, 480);
}

function draw() {
  if (estado === "inicio") pantallaInicio();
  else if (estado === "juego") pantallaJuego();
}

// funciones
function mostrarDialogo(texto) {
  fill(0, 150);
  rect(0, height - 100, width, 100);
  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  let margen = 30;
  text(texto, margen, height - 90, width - margen * 2);
}

function mostrarEscena(imagen, texto) {
  image(imagen, 0, 0, width, height);
  mostrarDialogo(texto);
  let btnWidth = 100, btnHeight = 50;
  let btnX = width - btnWidth - 20, btnY = height / 2 - btnHeight / 2;
  image(avanzarBtn, btnX, btnY, btnWidth, btnHeight);
}

function mostrarDecision(fondo, opcion1, opcion2, texto) {
  image(fondo, 0, 0, width, height);
  mostrarDialogo(texto);
  let size = 100;
  image(opcion1, width / 4 - size / 2, height / 2 - size / 2, size, size);
  image(opcion2, width * 3 / 4 - size / 2, height / 2 - size / 2, size, size);
}

function pantallaInicio() {
  image(titulo, 0, 0, width, height);
  let playWidth = 200, playHeight = 80;
  let playX = width / 2 - playWidth / 2, playY = height - playHeight - 20;
  image(play, playX, playY, playWidth, playHeight);

  if (!musicaInicio.isPlaying()) {
    musicaJuego.stop();
    musicaInicio.loop();
    musicaInicio.setVolume(0.5);
  }
}

function pantallaJuego() {
  background(0);

  if (ruta === "normal") {
    if (indiceEscena < escenas.length) {
      mostrarEscena(escenas[indiceEscena], dialogosNormal[indiceEscena]);
    } else {
      ruta = "decision";
      indiceEscena = 0;
    }
  }

  else if (ruta === "decision") {
    mostrarDecision(decisionFondo1, grapplingGun, diario, dialogosNormal[7]);
  }

  else if (ruta === "grappling") {
    if (indiceEscena < escenasGrappling.length) {
      mostrarEscena(escenasGrappling[indiceEscena], dialogosGrappling[indiceEscena]);
    } else {
      ruta = "decision2";
      indiceEscena = 0;
    }
  }

  else if (ruta === "decision2") {
    mostrarDecision(decisionFondo2, grapplingGun2, correr, "");
  }

  else if (ruta === "grappling2") {
    if (indiceEscena < escenasGrappling2.length) {
      mostrarEscena(escenasGrappling2[indiceEscena], dialogosGrappling2[indiceEscena]);
    } else {
      ruta = "decision3";
      indiceEscena = 0;
    }
  }

  else if (ruta === "decision3") {
    mostrarDecision(decisionFondo3, grapplingGun3, correr2, dialogosExtras[0]);
  }

  else if (ruta === "final1") mostrarEscena(final1, dialogosFinales[0]);
  else if (ruta === "final2") mostrarEscena(final2, dialogosFinales[1]);
  else if (ruta === "final3") mostrarEscena(final3, dialogosFinales[2]);
  else if (ruta === "final4") mostrarEscena(final4, dialogosFinales[3]);
  else if (ruta === "epilogo") mostrarEscena(epilogo, dialogosExtras[1]);

  // créditos 
  else if (ruta === "creditos") {
    background(0);
    fill(255);
    textAlign(CENTER, TOP);
    textSize(36);
    text("CRÉDITOS", width / 2, 60);
    textSize(22);
    text("Murphy Julian 88352/9", width / 2, height / 2 - 20);
    text("Catalina Schwerdt 122894/8", width / 2, height / 2 + 20);
    fill(180);
    textSize(16);
    text("Pulsa R para volver al menú", width / 2, height - 40);
  }

  // Música
  if (!musicaJuego.isPlaying()) {
    musicaInicio.stop();
    musicaJuego.loop();
    musicaJuego.setVolume(0.5);
  }
}

// Mouse y teclado
function mousePressed() {
  if (estado === "inicio") {
    let playWidth = 200, playHeight = 80;
    let playX = width / 2 - playWidth / 2, playY = height - playHeight - 20;
    if (mouseX > playX && mouseX < playX + playWidth && mouseY > playY && mouseY < playY + playHeight) {
      estado = "juego";
      ruta = "normal";
      indiceEscena = 0;
    }
  } else if (estado === "juego") {
    let btnWidth = 100, btnHeight = 50;
    let btnX = width - btnWidth - 20, btnY = height / 2 - btnHeight / 2;

    if (ruta === "normal" || ruta === "grappling" || ruta === "grappling2" || ruta === "epilogo") {
      if (mouseX > btnX && mouseX < btnX + btnWidth && mouseY > btnY && mouseY < btnY + btnHeight) {
        if (ruta === "epilogo") ruta = "creditos";
        else indiceEscena++;
      }
    } else if (ruta === "decision") {
      if (mouseX < width / 2) ruta = "grappling"; else ruta = "final1";
    } else if (ruta === "decision2") {
      if (mouseX < width / 2) ruta = "grappling2"; else ruta = "final2";
    } else if (ruta === "decision3") {
      if (mouseX < width / 2) ruta = "final4"; else ruta = "final3";
    } else if (ruta === "final4") {
      if (mouseX > btnX && mouseX < btnX + btnWidth && mouseY > btnY && mouseY < btnY + btnHeight)
        ruta = "epilogo";
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    estado = "inicio";
    ruta = "normal";
    indiceEscena = 0;
  }
}

