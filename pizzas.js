/*
CODIFICADO POR:
JOSÈ AGUSTÌN ABAROA MENDOZA
RAMSES ARIAS CRUZ
*/

let input;
let btn;
let numPartes = 0;

function setup() {
  createCanvas(600, 400);
  input = createInput();
  input.attribute('placeholder',"INGRESE PARTES");
  input.position(220, 250);
  input.size(146,20);
  btn = createButton("ramses");
  btn.position(220, 290);
  btn.size(152,35);
  btn.mousePressed(dividirCirculos);
}

function draw() {
  background("pink");

  // Círculos base
  fill("red");
  circle(150, 150, 100);
  circle(300, 150, 100);
  circle(450, 150, 100);

  if (numPartes > 0) {
    dividirPuntoPendiente(150, 150, 50, numPartes);
    dividirDDA(300, 150, 50, numPartes);
    dividirBresenham(450, 150, 50, numPartes);
  }
}

function dividirCirculos() {
  numPartes = int(input.value());
  if(numPartes <=0){
    console.log("No se puede dividir 0 o menor");
  }
}

// Algoritmo Punto-Pendiente
function dividirPuntoPendiente(xc, yc, r, partes) {
  stroke("purple");
  
  for (let i = 0; i < partes; i++) {
    let angle = TWO_PI * i / partes;
    let x = xc + r * cos(angle);
    let y = yc + r * sin(angle);
    line(xc, yc, x, y);
  }
}

// Algoritmo DDA
function dividirDDA(xc, yc, r, partes) {
  stroke("yellow");
  for (let i = 0; i < partes; i++) {
    let angle = TWO_PI * i / partes;
    let x1 = xc;
    let y1 = yc;
    let x2 = xc + r * cos(angle);
    let y2 = yc + r * sin(angle);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = max(abs(dx), abs(dy));

    let xInc = dx / steps;
    let yInc = dy / steps;

    let x = x1;
    let y = y1;

    for (let j = 0; j < steps; j++) {
      point(round(x), round(y));
      x += xInc;
      y += yInc;
    }
  }
}

// Algoritmo de Bresenham
function dividirBresenham(xc, yc, r, partes) {
  stroke("black");
  strokeWeight(2)
  for (let i = 0; i < partes; i++) {
    let angle = TWO_PI * i / partes;
    let x0 = round(xc);
    let y0 = round(yc);
    let x1 = round(xc + r * cos(angle));
    let y1 = round(yc + r * sin(angle));

    let dx = abs(x1 - x0);
    let dy = abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      point(x0, y0);
      if (x0 === x1 && y0 === y1) break;
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }
}
