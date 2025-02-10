 // p5
let circles = [];
let numCircles = 1;
let margin = 15;
let repulsionStrength = 200;
let totCircles = 1500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateCircles(numCircles);
}

function draw() {
  clear();
  fill(255);
  noStroke();
  for (let c of circles) {
    c.x += c.vx;
    c.y += c.vy;

    if (c.x <= margin || c.x >= width - margin) {
      c.vx *= -0.5;
      c.x = constrain(c.x, margin, width - margin);
    }
    if (c.y <= margin || c.y >= height - margin) {
      c.vy *= -0.5;
      c.y = constrain(c.y, margin, height - margin);
    }

    ellipse(c.x, c.y, c.size);

    c.vx *= 0.97;
    c.vy *= 0.97;
  }
}

function mousePressed() {
  for (let c of circles) {
    let dx = c.x - mouseX;
    let dy = c.y - mouseY;
    let distSq = dx * dx + dy * dy;
    let force = repulsionStrength / (distSq + 1);
    c.vx += force * dx;
    c.vy += force * dy;
  }
}

function explosion() {
  let highRepulsionStrength = 4000;

  for (let c of circles) {
    let dx = c.x - mouseX;
    let dy = c.y - mouseY;
    let distSq = dx * dx + dy * dy;
    let force = highRepulsionStrength / (distSq + 1);

    c.vx += force * dx;
    c.vy += force * dy;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function generateCircles(count) {
  for (let i = 0; i < count; i++) {
    addCircle(random([22, 25]));
  }
}

function addCircle(size) {
  circles.push({
    x: random(margin, width - margin),
    y: random(margin, height - margin),
    vx: 0,
    vy: 0,
    size: size
  });
}

function makeCirclesDisappear() {
  circles = [];
  numCircles = 1;
}

function makeCirclesReappear() {
  if (circles.length >= totCircles) return;

  let newCircles = [];
  for (let i = 0; i < numCircles; i++) {
    newCircles.push({
      x: random(margin, width - margin),
      y: random(margin, height - margin),
      vx: 0,
      vy: 0,
      size: random([15, 22, 25])
    });
  }
  circles = circles.concat(newCircles);
  numCircles = min(numCircles * 2, totCircles - circles.length);
}


 // JavaScript
// toggle display sezioni
function toggleDisplay(element, callback) {
  element.style.display = element.style.display === "block" ? "none" : "block";
  if (element.style.display === "block" && callback) callback();
}

function hideElements(...elements) {
  elements.forEach(el =>
    el.style.display = "none");
}

const elements = {
  lnkCnt: document.getElementById('lnkCnt'),
  ev: document.getElementById('ev'),
  ed: document.getElementById('ed'),
  ab: document.getElementById('ab'),
  pd: document.getElementById('pd')
};

function tglLnk() {
  toggleDisplay(elements.lnkCnt);
}

function tglEv() {
  toggleDisplay(elements.ev, () =>
    hideElements(elements.ed, elements.ab, elements.pd));
  explosion()
}

function tglEd() {
  toggleDisplay(elements.ed, () =>
    hideElements(elements.ev, elements.ab, elements.pd));
  explosion()
}

function tglPd() {
  toggleDisplay(elements.pd, () => {
    hideElements(elements.ev, elements.ed, elements.ab);
  });
  setTimeout(() => startRandomPosition(".mg"), 20);
  explosion()
}

function tglAb() {
  toggleDisplay(elements.ab, () => {
    hideElements(elements.ev, elements.ed, elements.pd);
  });
  setTimeout(() => startRandomPosition(".mgg"), 20);
  explosion()
}

let explTrigg = false;

function tglCl() {
  makeCirclesReappear();
  hideElements(elements.ev, elements.ed, elements.ab, elements.pd);
  if (circles.length >= totCircles) {
    if (explTrigg) {
      explosion();
    }
    explTrigg = true;
  }
}

// toggle display articoli
document.addEventListener('click', event => {
  const trigger = event.target.closest('.tl');
  if (trigger) {
    toggleDisplay(trigger.nextElementSibling);
  }
}, true);

// posizione random immagini
function startRandomPosition(selector) {
  const images = document.querySelectorAll(selector);
  const isMobile = window.innerWidth <= 768;
  const marginOffset = isMobile ? 150 : 250;

  images.forEach(img => {
    img.style.marginLeft = `${Math.random() * (window.innerWidth - marginOffset)}px`;
    img.style.marginTop = `${Math.random() * (window.innerHeight - marginOffset)}px`;
    img.style.rotate = `${Math.random() * 360}deg`;
  });
}

// tap per smartphone
document.querySelectorAll("a, .did, .scyt, .tl").forEach(element => {
  element.addEventListener("click", function (event) {
    document.querySelectorAll(".active").forEach(el =>
      el.classList.remove("active"));

    this.classList.add("active");
    setTimeout(() => this.classList.remove("active"), 300);
    event.stopPropagation();
  });
});

document.addEventListener("click", function () {
  document.querySelectorAll(".active").forEach(el =>
    el.classList.remove("active"));
});
