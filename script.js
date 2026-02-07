const overlay = document.getElementById("startOverlay");
const video = document.getElementById("bgVideo");
const bg = document.getElementById("bg");
const loading = document.getElementById("loadingMessage");

// ===== Progress bar =====
const progressBarContainer = document.createElement("div");
progressBarContainer.style.width = "80%";
progressBarContainer.style.height = "10px";
progressBarContainer.style.background = "#ccc";
progressBarContainer.style.borderRadius = "5px";
progressBarContainer.style.margin = "10px auto";
progressBarContainer.style.overflow = "hidden";
progressBarContainer.style.display = "none";
overlay.appendChild(progressBarContainer);

const progressBar = document.createElement("div");
progressBar.style.width = "0%";
progressBar.style.height = "100%";
progressBar.style.background = "#00f";
progressBar.style.transition = "width 0.2s";
progressBarContainer.appendChild(progressBar);

// All your images
const photos = [
  "media/bg1.jpg",
  "media/bg2.jpg",
  "media/bg3.jpg",
  "media/bg4.jpg",
  "media/bg5.jpg",
  "media/bg6.jpg",
  "media/bg7.jpg",
  "media/bg8.jpg",
  "media/bg9.jpg",
  "media/bg10.jpg",
  "media/bg11.jpg",
  "media/bg12.jpg",
  "media/bg13.jpg",
  "media/bg14.jpg",
  "media/bg15.jpg",
];

// 1️⃣ Pre-create hidden image elements
const imageElements = photos.map((src) => {
  const img = new Image();
  img.src = src;
  img.style.display = "none"; // hide initially
  bg.appendChild(img);
  return img;
});

// ===== Preload video immediately =====
video.load();

// ===== Track progress =====
let loadedCount = 0;
const totalCount = imageElements.length + 1; // images + video

// Video loaded
video.oncanplaythrough = () => {
  loadedCount++;
  updateProgress();
};

// Images loaded
imageElements.forEach((img) => {
  if (img.complete) {
    loadedCount++;
    updateProgress();
  } else {
    img.onload = () => {
      loadedCount++;
      updateProgress();
    };
  }
});

function updateProgress() {
  const percent = Math.floor((loadedCount / totalCount) * 100);
  progressBar.style.width = percent + "%";
}

// ===== Overlay click =====
overlay.addEventListener("click", () => {
  // hide overlay text
  overlay.querySelector("h1").style.display = "none";
  overlay.querySelector("p").style.display = "none";

  // show loading bar
  progressBarContainer.style.display = "block";
  loading.style.display = "block";

  // Wait until all media loaded
  const allPromises = [
    ...imageElements.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = resolve;
        }),
    ),
    new Promise((resolve) => {
      if (video.readyState >= 4) resolve();
      else video.oncanplaythrough = resolve;
    }),
  ];

  Promise.all(allPromises).then(() => {
    // fade overlay
    overlay.style.transition = "opacity 0.5s";
    overlay.style.opacity = 0;

    setTimeout(() => {
      overlay.style.display = "none";
      loading.style.display = "none";
      progressBarContainer.style.display = "none";

      // start video
      video.play();

      // show and animate images
      imageElements.forEach((img, i) => {
        img.style.display = "block";
        img.style.top = Math.random() * 80 + "vh";
        img.style.left = "-250px";

        const isMobile = window.innerWidth <= 768;
        img.style.animationDuration = isMobile
          ? 8 + Math.random() * 4 + "s"
          : 15 + Math.random() * 10 + "s";

        img.style.animationDelay = i * 0.5 + "s";
      });
    }, 500);
  });
});

// ===== Buttons logic =====
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const playArea = document.getElementById("playArea");
const message = document.getElementById("message");
const contentWrap = document.getElementById("contentWrap");

// No button dodge
const dodge = () => {
  const maxX = playArea.clientWidth - noBtn.clientWidth;
  const maxY = playArea.clientHeight - noBtn.clientHeight;
  noBtn.style.transform = "translate(0, 0)";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
};
noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodge();
});

// Yes button hearts
yesBtn.addEventListener("click", () => {
  contentWrap.style.display = "none";
  playArea.style.display = "none";
  message.style.display = "block";

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = 15 + Math.random() * 20 + "px";
      heart.style.animationDelay = Math.random() * 1.5 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, i * 50);
  }
});
