const landing = document.getElementById("landing");
const chaiCard = document.getElementById("chaiCard");
const nameForm = document.getElementById("nameForm");
const nameInput = document.getElementById("friendName");
const titleText = document.getElementById("titleText");
const makeChaiBtn = document.getElementById("makeChaiBtn");
const cupWrap = document.querySelector(".cup-wrap");
const message = document.getElementById("message");
const senderGreeting = document.getElementById("senderGreeting");
const heartLayer = document.getElementById("heartLayer");

let friendName = "Best Friend";
let heartIntervalId = null;

function getTimeBasedGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "good morning";
  }

  if (hour >= 12 && hour < 17) {
    return "good afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "good evening";
  }

  return "good night";
}

function typeMessage(text, speed = 55) {
  message.textContent = "";
  let index = 0;

  const timer = setInterval(() => {
    message.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      clearInterval(timer);
    }
  }, speed);
}

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";

  const horizontal = 15 + Math.random() * 70;
  const duration = 2800 + Math.random() * 1700;
  const drift = (Math.random() - 0.5) * 20;

  heart.style.left = `${horizontal}%`;
  heart.style.bottom = `${6 + Math.random() * 12}%`;
  heart.style.animationDuration = `${duration}ms`;
  heart.style.transform = `translateX(${drift}px) rotate(45deg)`;

  heartLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration + 250);
}

function startHearts() {
  if (heartIntervalId) {
    clearInterval(heartIntervalId);
  }

  // Burst for immediate delight.
  for (let i = 0; i < 8; i += 1) {
    setTimeout(createHeart, i * 110);
  }

  heartIntervalId = setInterval(createHeart, 420);

  // Slow down after the first few seconds for a softer ambient effect.
  setTimeout(() => {
    clearInterval(heartIntervalId);
    heartIntervalId = setInterval(createHeart, 900);
  }, 4500);
}

nameForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredName = nameInput.value.trim();
  friendName = enteredName || "Best Friend";

  titleText.textContent = `Chai for ${friendName}`;

  landing.classList.add("hidden");
  chaiCard.classList.remove("hidden");

  setTimeout(() => {
    landing.style.display = "none";
  }, 380);
});

makeChaiBtn.addEventListener("click", () => {
  makeChaiBtn.disabled = true;
  makeChaiBtn.textContent = "Brewing...";
  message.textContent = "";
  senderGreeting.textContent = "";
  senderGreeting.classList.remove("show");

  cupWrap.classList.remove("filled", "steaming", "pouring");

  requestAnimationFrame(() => {
    cupWrap.classList.add("pouring");
  });

  setTimeout(() => {
    cupWrap.classList.add("filled");
  }, 500);

  setTimeout(() => {
    cupWrap.classList.add("steaming");
    typeMessage(`Chai for dear ${friendName} ❤️`);
    senderGreeting.textContent = `Warm ${getTimeBasedGreeting()}, have a chai from Mayank Gautam ☕`;
    senderGreeting.classList.add("show");
    startHearts();
    makeChaiBtn.textContent = "Make Another Chai";
    makeChaiBtn.disabled = false;
  }, 1700);
});

nameInput.focus();
