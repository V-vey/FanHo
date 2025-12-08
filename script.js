// Select all zoomable images
const images = document.querySelectorAll("[data-zoom]");
const mq = window.matchMedia("(max-width: 394px)");

// Read CSS duration and convert to ms
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
      // this is for the mobile
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
  } else if (!e.matches) {
    images.forEach((img) => {
      // this is for the windows
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
// selenting the content, show-content and the hamburger
const contents = document.querySelector(".content");
const show = document.querySelector(".show-content");
const hamburgers = document.querySelector(".hamburger");
// to funtion the hamburger
hamburgers.addEventListener("click", () => {
  contents.classList.toggle("visible"); // the content will become visible when click 
  hamburgers.classList.toggle("open"); // animation of hamburger
});

// selecting the camera
const upperLeftCam = document.querySelector(".upper-right-camera")
const upperRightCam = document.querySelector(".upper-left-camera")
const lowerLeftCam = document.querySelector(".lower-right-camera")
const lowerRightCam = document.querySelector(".lower-left-camera")
const centerCamera = document.getElementById("camera");
// to navigate where the animation will start when view
const target = document.querySelector(".box");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      centerCamera.classList.add("fade-in-top-normal");
      upperLeftCam.classList.add("slide-br-normal");
      upperRightCam.classList.add("slide-bl-normal");
      lowerLeftCam.classList.add("slide-tr-normal");
      lowerRightCam.classList.add("slide-tl-normal");
    }
  });
});
// to observe it
observer.observe(target);
