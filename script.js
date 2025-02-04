function toggleDisplay(element, callback) {
  element.style.display = element.style.display === "block" ? "none" : "block";
  if (element.style.display === "block" && callback) callback();
}

function hideElements(...elements) {
  elements.forEach(el => el.style.display = "none");
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
  toggleDisplay(elements.ev, () => hideElements(elements.ed, elements.ab, elements.pd));
}

function tglEd() {
  toggleDisplay(elements.ed, () => hideElements(elements.ev, elements.ab, elements.pd));
}

function tglPd() {
  toggleDisplay(elements.pd, () => {
    hideElements(elements.ev, elements.ed, elements.ab);
    setTimeout(() => startRandomPosition(".mg"), 10);
  });
}

function tglAb() {
  toggleDisplay(elements.ab, () => {
    hideElements(elements.ev, elements.ed, elements.pd);
    setTimeout(() => startRandomPosition(".mgg"), 10);
  });
}

function tglCl() {
  hideElements(elements.ev, elements.ed, elements.ab, elements.pd);
}


document.addEventListener('click', event => {
  const trigger = event.target.closest('.tl');
  if (trigger) {
    toggleDisplay(trigger.nextElementSibling);
  }
}, true);

function startRandomPosition(selector) {
  const images = document.querySelectorAll(selector);
  images.forEach(img => {
    img.style.marginLeft = `${Math.random() * (window.innerWidth - 250)}px`;
    img.style.marginTop = `${Math.random() * (window.innerHeight - 250)}px`;
    img.style.rotate = `${Math.random() * 360}deg`;
  });
}

document.addEventListener("mousemove", function (event) {
  let windowHeight = window.innerHeight;
  let mouseY = event.clientY;
  let popup = document.getElementById("crdt");

  if (mouseY > windowHeight * 0.5) {
    popup.style.transform = "translateY(0px)";
  } else {
    popup.style.transform = "translateY(50px)";
  }
});