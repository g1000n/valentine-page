const overlay = document.getElementById("startOverlay");
const video = document.getElementById("bgVideo");
const bg = document.getElementById("bg");
const loading = document.getElementById("loadingMessage");
const topLink = document.getElementById("topLink");

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

// 1. Create images immediately but keep them hidden
const imageElements = photos.map((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.display = "none";
  bg.appendChild(img);
  return img;
});

overlay.addEventListener("click", () => {
  // Remove the extra top link
  if (topLink) topLink.remove();

  // Show loading state
  overlay.querySelector("h1").style.display = "none";
  overlay.querySelector("p").style.display = "none";
  loading.style.display = "block";

  // Preload logic
  const videoPromise = new Promise((res) => {
    video.oncanplaythrough = res;
    video.load();
  });

  const imagePromises = imageElements.map(
    (img) =>
      new Promise((res) => {
        if (img.complete) res();
        else img.onload = res;
        img.onerror = res;
      }),
  );

  Promise.all([videoPromise, ...imagePromises]).then(() => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.display = "none";
      video.play();

      // Start the one-by-one parade
      imageElements.forEach((img, i) => {
        img.style.display = "block";

        // Randomize size and vertical position
        const randomWidth = Math.floor(Math.random() * 80) + 140;
        img.style.width = randomWidth + "px";
        img.style.top = Math.random() * 85 + "vh";
        img.style.left = "-300px";

        const isMobile = window.innerWidth <= 768;

        // VERY SLOW SPEEDS
        const duration = isMobile
          ? 12 + Math.random() * 8 + "s" // Mobile: 12-20s
          : 25 + Math.random() * 15 + "s"; // Desktop: 25-40s

        img.style.animationDuration = duration;

        // 3-second stagger prevents bunching
        img.style.animationDelay = i * 3 + "s";
      });
    }, 600);
  });
});

// ===== Button Logic =====
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const playArea = document.getElementById("playArea");
const message = document.getElementById("message");
const contentWrap = document.getElementById("contentWrap");

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

yesBtn.addEventListener("click", () => {
  contentWrap.style.display = "none";
  playArea.style.display = "none";
  message.style.display = "block";

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerHTML = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "100vh";
      heart.style.fontSize = 15 + Math.random() * 30 + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 3000);
    }, i * 50);
  }
});
