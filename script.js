// Select all zoomable images
const images = document.querySelectorAll("[data-zoom]");
const mq = window.matchMedia("(max-width: 394px)");

// Read CSS duration (e.g. "0.2s") and convert to ms
const duration =
  parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--duration")
  ) * 1000;

function showPopup(el) {
  // ensure CSS transitions kick in
  setTimeout(() => el.classList.add("show"), 0);
}

function hidePopup() {
  // 'this' is the popup element when used as event handler
  this.classList.remove("show");
  setTimeout(() => this.remove(), duration);
}

mq.addEventListener("change", handleResize);
handleResize(mq);

function handleResize(e) {
  if (e.matches) {
    images.forEach((img) => {
      img.addEventListener("click", () => {
        const imageClone = img.cloneNode(false);
        imageClone.addEventListener("click", (e) => e.stopPropagation());

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.appendChild(imageClone);
        popup.addEventListener("click", hidePopup);

        document.body.appendChild(popup);
        showPopup(popup);
      });
    });
  } else if(!e.matches){
    images.forEach((img) => {
      img.addEventListener("mousedown", () => {
        const imageClone = img.cloneNode(false);
        imageClone.addEventListener("click", (e) => e.stopPropagation());

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.appendChild(imageClone);
        popup.addEventListener("mouseup", hidePopup);

        document.body.appendChild(popup);
        showPopup(popup);
      });
    });
  }
}

const contents = document.querySelector(".content");
const show = document.querySelector(".show-content");
const hamburgers = document.querySelector(".hamburger");

hamburgers.addEventListener("click", () => {
  contents.classList.toggle("visible");
  hamburgers.classList.toggle("open");
});
