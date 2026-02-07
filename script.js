const overlay = document.getElementById("startOverlay");
const video = document.getElementById("bgVideo");
const bg = document.getElementById("bg");
const loading = document.getElementById("loadingMessage");
const topLink = document.getElementById("topLink"); // Grab the extra link

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

const imageElements = photos.map((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.display = "none";
  img.style.position = "absolute";
  bg.appendChild(img);
  return img;
});

overlay.addEventListener("click", () => {
  // 1. Hide the annoying top left link immediately
  if (topLink) topLink.style.display = "none";

  overlay.querySelector("h1").style.display = "none";
  overlay.querySelector("p").style.display = "none";
  loading.style.display = "block";

  const videoPromise = new Promise((resolve) => {
    video.oncanplaythrough = resolve;
    video.load();
  });

  const imagePromises = imageElements.map(
    (img) =>
      new Promise((resolve) => {
        if (img.complete) resolve();
        else img.onload = resolve;
        img.onerror = resolve; // Continue even if one image fails
      }),
  );

  Promise.all([videoPromise, ...imagePromises]).then(() => {
    overlay.style.transition = "opacity 0.5s";
    overlay.style.opacity = 0;

    setTimeout(() => {
      overlay.style.display = "none";
      video.play();

      imageElements.forEach((img, i) => {
        img.style.display = "block";

        // Randomize size so they don't look like a stack of identical images
        const randomWidth = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
        img.style.width = randomWidth + "px";

        // Spread them out vertically (0% to 90% of screen height)
        img.style.top = Math.random() * 90 + "vh";
        img.style.left = "-300px";

        const isMobile = window.innerWidth <= 768;
        img.style.animationDuration = isMobile
          ? 6 + Math.random() * 4 + "s"
          : 12 + Math.random() * 8 + "s";

        // Staggered delay so they fly in one by one
        img.style.animationDelay = i * 0.8 + "s";
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
      heart.style.animationDelay = Math.random() * 2 + "s";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, i * 40);
  }
});
