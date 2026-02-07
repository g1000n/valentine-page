const overlay = document.getElementById("startOverlay");
const video = document.getElementById("bgVideo");
const bg = document.getElementById("bg");

// Note: Added 'media/' prefix to all your images
// At the very top of your script.js
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

// 1. CREATE AND CACHE IMAGES IMMEDIATELY
const imageElements = photos.map((src, i) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.display = "none"; // Hide them initially
  bg.appendChild(img);
  return img;
});

overlay.addEventListener("click", () => {
  overlay.style.opacity = 0;

  setTimeout(() => {
    overlay.style.display = "none";
    video.play();

    // 2. TRIGGER ANIMATIONS INSTANTLY
    imageElements.forEach((img, i) => {
      img.style.display = "block"; // Show them
      img.style.top = Math.random() * 80 + "vh";
      img.style.left = "-250px"; // Start off-screen

      const isMobile = window.innerWidth <= 768;
      img.style.animationDuration = isMobile
        ? 8 + Math.random() * 4 + "s"
        : 15 + Math.random() * 10 + "s";

      img.style.animationDelay = i * 1.2 + "s"; // Shorter delay between spawns
    });
  }, 400); // Reduced delay for snappier feel
});

// ===== Buttons logic =====
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const playArea = document.getElementById("playArea");
const message = document.getElementById("message");
const contentWrap = document.getElementById("contentWrap");

const dodge = () => {
  const maxX = playArea.clientWidth - noBtn.clientWidth;
  const maxY = playArea.clientHeight - noBtn.clientHeight;

  // Remove initial centering transform so the random positioning works
  noBtn.style.transform = "translate(0, 0)";

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
};

noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  dodge();
});

yesBtn.addEventListener("click", () => {
  contentWrap.style.display = "none";
  playArea.style.display = "none";
  message.style.display = "block";

  // Heart explosion
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
