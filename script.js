"use strict";

/* =========================================================
   FLOYED PERSONAL WEBSITE
   Main JavaScript File
========================================================= */


/* =========================================================
   1. ELEMENT SELECTORS
========================================================= */

const body = document.body;
const siteHeader = document.querySelector(".site-header");

const menuButton = document.getElementById("menuButton");
const navigationLinks = document.getElementById("navigationLinks");
const navLinks = document.querySelectorAll(".nav-link");

const themeButton = document.getElementById("themeButton");
const themeIcon = document.querySelector(".theme-icon");

const typingText = document.getElementById("typingText");

const progressBars = document.querySelectorAll(".progress-bar");
const counters = document.querySelectorAll(".counter");

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

const jokeText = document.getElementById("jokeText");
const newJokeButton = document.getElementById("newJokeButton");
const showJokeButton = document.getElementById("showJokeButton");

const galleryItems = document.querySelectorAll(".gallery-item");
const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightboxButton = document.getElementById("closeLightbox");

const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   2. HELPER FUNCTIONS
========================================================= */

function safelySetText(element, text) {
  if (element) {
    element.textContent = text;
  }
}

function disableButtons(buttons, disabled = true) {
  buttons.forEach((button) => {
    button.disabled = disabled;
  });
}

function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================================
   3. CURRENT YEAR
========================================================= */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   4. HEADER SCROLL EFFECT
========================================================= */

function updateHeaderOnScroll() {
  if (!siteHeader) {
    return;
  }

  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderOnScroll);
updateHeaderOnScroll();


/* =========================================================
   5. MOBILE NAVIGATION
========================================================= */

function openMobileMenu() {
  if (!menuButton || !navigationLinks) {
    return;
  }

  menuButton.classList.add("active");
  navigationLinks.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
}

function closeMobileMenu() {
  if (!menuButton || !navigationLinks) {
    return;
  }

  menuButton.classList.remove("active");
  navigationLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
  if (!navigationLinks) {
    return;
  }

  const isOpen = navigationLinks.classList.contains("open");

  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (menuButton) {
  menuButton.addEventListener("click", toggleMobileMenu);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!navigationLinks || !menuButton) {
    return;
  }

  const clickedInsideMenu = navigationLinks.contains(event.target);
  const clickedMenuButton = menuButton.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    closeMobileMenu();
  }
});


/* =========================================================
   6. ACTIVE NAVIGATION LINK
========================================================= */

const observedSections = document.querySelectorAll("main section[id]");

function updateActiveNavigationLink() {
  let currentSectionId = "home";

  observedSections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href");

    link.classList.toggle(
      "active",
      linkTarget === `#${currentSectionId}`
    );
  });
}

window.addEventListener("scroll", updateActiveNavigationLink);
updateActiveNavigationLink();


/* =========================================================
   7. DARK AND LIGHT THEME
========================================================= */

const savedTheme = localStorage.getItem("floyed-theme");

function applyTheme(theme) {
  const darkThemeEnabled = theme === "dark";

  body.classList.toggle("dark-theme", darkThemeEnabled);

  if (themeIcon) {
    themeIcon.textContent = darkThemeEnabled ? "☀️" : "🌙";
  }

  if (themeButton) {
    themeButton.setAttribute(
      "aria-label",
      darkThemeEnabled
        ? "Switch to light theme"
        : "Switch to dark theme"
    );
  }
}

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const darkThemeEnabled = body.classList.contains("dark-theme");
    const newTheme = darkThemeEnabled ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem("floyed-theme", newTheme);
  });
}


/* =========================================================
   8. HERO TYPING EFFECT
========================================================= */

if (typingText) {
  const wordsAttribute = typingText.dataset.words || "";
  const typingWords = wordsAttribute
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);

  let wordIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  const typingSpeed = 100;
  const deletingSpeed = 55;
  const pauseAfterTyping = 1400;
  const pauseAfterDeleting = 350;

  function runTypingEffect() {
    if (typingWords.length === 0) {
      return;
    }

    const currentWord = typingWords[wordIndex];

    if (isDeleting) {
      characterIndex -= 1;
    } else {
      characterIndex += 1;
    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let nextDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && characterIndex === currentWord.length) {
      isDeleting = true;
      nextDelay = pauseAfterTyping;
    } else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
      nextDelay = pauseAfterDeleting;
    }

    window.setTimeout(runTypingEffect, nextDelay);
  }

  typingText.textContent = "";
  runTypingEffect();
}


/* =========================================================
   9. SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(
  [
    ".section-heading",
    ".about-image-area",
    ".about-content",
    ".fact-card",
    ".skill-card",
    ".skills-introduction",
    ".timeline-item",
    ".project-card",
    ".hobby-card",
    ".joke-container",
    ".arsenal-content",
    ".arsenal-visual",
    ".gallery-item",
    ".quote-container",
    ".contact-information",
    ".contact-form"
  ].join(",")
);

revealElements.forEach((element) => {
  element.classList.add("fade-up");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================================
   10. SKILL PROGRESS BARS
========================================================= */

const skillSection = document.getElementById("skills");
let skillBarsAnimated = false;

function animateSkillBars() {
  if (skillBarsAnimated) {
    return;
  }

  progressBars.forEach((bar) => {
    const progress = Number(bar.dataset.progress) || 0;
    const safeProgress = Math.min(Math.max(progress, 0), 100);

    bar.style.width = `${safeProgress}%`;
  });

  skillBarsAnimated = true;
}

if (skillSection) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateSkillBars();
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25
    }
  );

  skillObserver.observe(skillSection);
}


/* =========================================================
   11. NUMBER COUNTERS
========================================================= */

let countersAnimated = false;

function animateCounter(counter) {
  const target = Number(counter.dataset.target) || 0;
  const duration = 1400;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * easedProgress);

    counter.textContent = currentValue.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

const factsSection = document.querySelector(".facts-section");

if (factsSection) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || countersAnimated) {
          return;
        }

        counters.forEach(animateCounter);
        countersAnimated = true;
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.3
    }
  );

  counterObserver.observe(factsSection);
}


/* =========================================================
   12. PROJECT FILTERING
========================================================= */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow =
        selectedFilter === "all" || category === selectedFilter;

      card.classList.toggle("hidden-project", !shouldShow);
    });
  });
});


/* =========================================================
   13. JOKE MACHINE
========================================================= */

const jokes = [
  "Why did the computer go to the doctor? Because it had a virus!",

  "Why was the computer cold? It left its Windows open!",

  "Why did the developer go broke? Because he used up all his cache!",

  "What does a computer eat for a snack? Microchips!",

  "Why did the football player bring string to the match? He wanted to tie the score!",

  "Why was the maths book unhappy? It had too many problems!",

  "Why did the coder wear glasses? Because he could not C sharp!",

  "What is a computer's favourite music? Heavy metal!",

  "Why did the goalkeeper sit on the keyboard? He wanted to save the file!",

  "Why did the student eat his homework? His teacher said it was a piece of cake!",

  "What did one wall say to the other wall? I will meet you at the corner!",

  "Why do programmers prefer dark mode? Because light attracts bugs!",

  "What do you call a football team made of chickens? Fowl United!",

  "Why was the mobile phone wearing glasses? It lost its contacts!",

  "What did the zero say to the number eight? Nice belt!",

  "Why did the bicycle fall over? It was two-tired!",

  "Why did the Arsenal fan bring a ladder? He wanted to climb to the top of the table!",

  "Why did the keyboard sleep early? It needed some space!",

  "What is a coder's favourite place to hang out? The function room!",

  "Why did the cookie visit the computer? It wanted to clear its cache!"
];

let previousJokeIndex = -1;

function showRandomJoke() {
  if (!jokeText || jokes.length === 0) {
    return;
  }

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * jokes.length);
  } while (randomIndex === previousJokeIndex && jokes.length > 1);

  previousJokeIndex = randomIndex;

  jokeText.style.opacity = "0";
  jokeText.style.transform = "translateY(8px)";

  window.setTimeout(() => {
    jokeText.textContent = jokes[randomIndex];
    jokeText.style.opacity = "1";
    jokeText.style.transform = "translateY(0)";
  }, 180);
}

if (jokeText) {
  jokeText.style.transition = "opacity 0.2s ease, transform 0.2s ease";
}

if (newJokeButton) {
  newJokeButton.addEventListener("click", showRandomJoke);
}

if (showJokeButton) {
  showJokeButton.addEventListener("click", () => {
    scrollToSection(".joke-section");

    window.setTimeout(() => {
      showRandomJoke();
    }, 500);
  });
}


/* =========================================================
   14. GALLERY LIGHTBOX
========================================================= */

function openGalleryLightbox(imageSource, imageAlt) {
  if (!galleryLightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = imageSource;
  lightboxImage.alt = imageAlt || "Floyed's gallery image";

  galleryLightbox.hidden = false;
  body.style.overflow = "hidden";
}

function closeGalleryLightbox() {
  if (!galleryLightbox || !lightboxImage) {
    return;
  }

  galleryLightbox.hidden = true;
  lightboxImage.src = "";
  body.style.overflow = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");
    const imageSource = item.dataset.image || image?.src;
    const imageAlt = image?.alt || "Floyed's gallery image";

    if (imageSource) {
      openGalleryLightbox(imageSource, imageAlt);
    }
  });
});

if (closeLightboxButton) {
  closeLightboxButton.addEventListener("click", closeGalleryLightbox);
}

if (galleryLightbox) {
  galleryLightbox.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) {
      closeGalleryLightbox();
    }
  });
}


/* =========================================================
   15. CONTACT FORM
========================================================= */

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const visitorName =
      String(formData.get("visitorName") || "").trim();

    const visitorEmail =
      String(formData.get("visitorEmail") || "").trim();

    const messageSubject =
      String(formData.get("messageSubject") || "").trim();

    const visitorMessage =
      String(formData.get("visitorMessage") || "").trim();

    if (
      !visitorName ||
      !visitorEmail ||
      !messageSubject ||
      !visitorMessage
    ) {
      safelySetText(
        formResponse,
        "Please complete all the fields before sending your message."
      );

      formResponse.style.color = "#ef233c";
      return;
    }

    safelySetText(
      formResponse,
      `Thank you, ${visitorName}! Your message has been received.`
    );

    formResponse.style.color = "#1fd17a";

    contactForm.reset();

    window.setTimeout(() => {
      safelySetText(formResponse, "");
    }, 6000);
  });
}


/* =========================================================
   16. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
    closeGalleryLightbox();
    closeGameModal();
  }
});


/* =========================================================
   17. FOOTBALL PENALTY GAME
========================================================= */

const footballPitch = document.getElementById("footballPitch");
const football = document.getElementById("football");
const goalkeeper = document.getElementById("goalkeeper");

const goalScoreElement = document.getElementById("goalScore");
const saveScoreElement = document.getElementById("saveScore");
const currentShotElement = document.getElementById("currentShot");
const maximumShotsElement = document.getElementById("maximumShots");
const gameMessage = document.getElementById("gameMessage");

const directionButtons = document.querySelectorAll(".direction-button");
const shootingZones = document.querySelectorAll(".shooting-zone");

const restartGameButton = document.getElementById("restartGameButton");

const gameModal = document.getElementById("gameModal");
const closeGameModalButton = document.getElementById("closeGameModal");
const modalPlayAgainButton = document.getElementById(
  "modalPlayAgainButton"
);

const resultIcon = document.getElementById("resultIcon");
const gameResultTitle = document.getElementById("gameResultTitle");
const gameResultMessage = document.getElementById("gameResultMessage");
const finalScore = document.getElementById("finalScore");

const maximumShots = 5;

let goals = 0;
let saves = 0;
let currentShot = 1;
let gameLocked = false;
let gameFinished = false;

const shotDirections = [
  "top-left",
  "top-centre",
  "top-right",
  "bottom-left",
  "bottom-centre",
  "bottom-right"
];

const ballPositions = {
  "top-left": {
    x: -245,
    y: -345,
    rotation: -540
  },

  "top-centre": {
    x: 0,
    y: -365,
    rotation: 540
  },

  "top-right": {
    x: 245,
    y: -345,
    rotation: 540
  },

  "bottom-left": {
    x: -235,
    y: -235,
    rotation: -450
  },

  "bottom-centre": {
    x: 0,
    y: -245,
    rotation: 450
  },

  "bottom-right": {
    x: 235,
    y: -235,
    rotation: 450
  }
};

const keeperPositions = {
  "top-left": {
    left: "20%",
    bottom: "60px",
    transform: "translateX(-50%) rotate(-20deg) scale(0.95)"
  },

  "top-centre": {
    left: "50%",
    bottom: "70px",
    transform: "translateX(-50%) translateY(-18px) scale(1.04)"
  },

  "top-right": {
    left: "80%",
    bottom: "60px",
    transform: "translateX(-50%) rotate(20deg) scale(0.95)"
  },

  "bottom-left": {
    left: "20%",
    bottom: "4px",
    transform: "translateX(-50%) rotate(-24deg) scale(1)"
  },

  "bottom-centre": {
    left: "50%",
    bottom: "5px",
    transform: "translateX(-50%) scale(1)"
  },

  "bottom-right": {
    left: "80%",
    bottom: "4px",
    transform: "translateX(-50%) rotate(24deg) scale(1)"
  }
};

function getRandomDirection() {
  const randomIndex = Math.floor(
    Math.random() * shotDirections.length
  );

  return shotDirections[randomIndex];
}

function updateScoreboard() {
  safelySetText(goalScoreElement, goals);
  safelySetText(saveScoreElement, saves);
  safelySetText(currentShotElement, currentShot);
  safelySetText(maximumShotsElement, maximumShots);
}

function setGameControlsDisabled(disabled) {
  disableButtons(directionButtons, disabled);
  disableButtons(shootingZones, disabled);
}

function resetBallPosition() {
  if (!football) {
    return;
  }

  football.style.transition = "none";
  football.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
  football.style.opacity = "1";

  void football.offsetWidth;

  football.style.transition =
    "transform 0.72s cubic-bezier(0.22, 0.85, 0.32, 1), " +
    "opacity 0.3s ease";
}

function resetGoalkeeperPosition() {
  if (!goalkeeper) {
    return;
  }

  goalkeeper.style.transition = "none";
  goalkeeper.style.left = "50%";
  goalkeeper.style.bottom = "8px";
  goalkeeper.style.transform = "translateX(-50%)";

  void goalkeeper.offsetWidth;

  goalkeeper.style.transition =
    "left 0.55s ease, bottom 0.55s ease, transform 0.55s ease";
}

function moveBall(direction) {
  if (!football) {
    return;
  }

  const position = ballPositions[direction];

  if (!position) {
    return;
  }

  const mobileScale = window.innerWidth <= 600 ? 0.72 : 1;
  const tabletScale =
    window.innerWidth > 600 && window.innerWidth <= 850 ? 0.85 : 1;

  const responsiveScale =
    window.innerWidth <= 600 ? mobileScale : tabletScale;

  const translatedX = position.x * responsiveScale;
  const translatedY = position.y * responsiveScale;

  football.style.transform =
    `translate(${translatedX}px, ${translatedY}px) ` +
    `rotate(${position.rotation}deg) scale(0.68)`;
}

function moveGoalkeeper(direction) {
  if (!goalkeeper) {
    return;
  }

  const position = keeperPositions[direction];

  if (!position) {
    return;
  }

  goalkeeper.style.left = position.left;
  goalkeeper.style.bottom = position.bottom;
  goalkeeper.style.transform = position.transform;
}

function showShotMessage(scored, shotDirection, keeperDirection) {
  if (!gameMessage) {
    return;
  }

  if (scored) {
    const goalMessages = [
      "GOAL! Brilliant finish! ⚽🔥",
      "What a strike! The goalkeeper had no chance! 🚀",
      "Goal for Floyed FC! Amazing shooting! 🥳",
      "Top-class penalty! You found the net! 🏆",
      "Fantastic goal! The crowd goes wild! 🎉"
    ];

    const message =
      goalMessages[Math.floor(Math.random() * goalMessages.length)];

    gameMessage.textContent = message;
    gameMessage.style.color = "#ffcf33";
  } else {
    gameMessage.textContent =
      `Saved! The goalkeeper guessed ${keeperDirection.replace("-", " ")}.`;

    gameMessage.style.color = "#ff9a9a";
  }
}

function finishGame() {
  gameFinished = true;
  setGameControlsDisabled(true);

  if (restartGameButton) {
    restartGameButton.hidden = false;
  }

  window.setTimeout(() => {
    showGameResults();
  }, 700);
}

function prepareNextShot() {
  currentShot += 1;

  resetBallPosition();
  resetGoalkeeperPosition();

  safelySetText(currentShotElement, currentShot);

  if (gameMessage) {
    gameMessage.textContent =
      `Shot ${currentShot} of ${maximumShots}. Choose your corner!`;

    gameMessage.style.color = "";
  }

  gameLocked = false;
  setGameControlsDisabled(false);
}

function takePenalty(direction) {
  if (
    gameLocked ||
    gameFinished ||
    !shotDirections.includes(direction)
  ) {
    return;
  }

  gameLocked = true;
  setGameControlsDisabled(true);

  const goalkeeperDirection = getRandomDirection();
  const scored = direction !== goalkeeperDirection;

  moveBall(direction);

  window.setTimeout(() => {
    moveGoalkeeper(goalkeeperDirection);
  }, 80);

  window.setTimeout(() => {
    if (scored) {
      goals += 1;
    } else {
      saves += 1;
    }

    updateScoreboard();
    showShotMessage(scored, direction, goalkeeperDirection);

    if (currentShot >= maximumShots) {
      window.setTimeout(finishGame, 900);
    } else {
      window.setTimeout(prepareNextShot, 1300);
    }
  }, 750);
}

function getGameResult() {
  if (goals === 5) {
    return {
      icon: "👑",
      title: "Perfect Penalty Champion!",
      message:
        "Five goals from five shots! Even the best goalkeeper could not stop you."
    };
  }

  if (goals === 4) {
    return {
      icon: "🏆",
      title: "Excellent Shooting!",
      message:
        "Four goals! You are a brilliant penalty taker."
    };
  }

  if (goals === 3) {
    return {
      icon: "⚽",
      title: "Great Performance!",
      message:
        "Three goals is a strong score. You handled the pressure well."
    };
  }

  if (goals === 2) {
    return {
      icon: "👏",
      title: "Good Attempt!",
      message:
        "You scored twice. Try again and aim for the corners."
    };
  }

  if (goals === 1) {
    return {
      icon: "💪",
      title: "Keep Practising!",
      message:
        "You scored one goal. Another round could be much better."
    };
  }

  return {
    icon: "🧤",
    title: "The Goalkeeper Wins!",
    message:
      "The goalkeeper saved everything. It is time for a rematch!"
  };
}

function showGameResults() {
  if (!gameModal) {
    return;
  }

  const result = getGameResult();

  safelySetText(resultIcon, result.icon);
  safelySetText(gameResultTitle, result.title);
  safelySetText(gameResultMessage, result.message);
  safelySetText(finalScore, `${goals} / ${maximumShots}`);

  gameModal.hidden = false;
  body.style.overflow = "hidden";
}

function closeGameModal() {
  if (!gameModal) {
    return;
  }

  gameModal.hidden = true;

  if (!galleryLightbox || galleryLightbox.hidden) {
    body.style.overflow = "";
  }
}

function resetGame() {
  goals = 0;
  saves = 0;
  currentShot = 1;
  gameLocked = false;
  gameFinished = false;

  resetBallPosition();
  resetGoalkeeperPosition();
  updateScoreboard();

  setGameControlsDisabled(false);

  if (restartGameButton) {
    restartGameButton.hidden = true;
  }

  if (gameMessage) {
    gameMessage.textContent =
      "Select a corner of the goal to take your first penalty.";

    gameMessage.style.color = "";
  }

  closeGameModal();
}

directionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    takePenalty(button.dataset.direction);
  });
});

shootingZones.forEach((zone) => {
  zone.addEventListener("click", () => {
    takePenalty(zone.dataset.direction);
  });
});

if (restartGameButton) {
  restartGameButton.addEventListener("click", resetGame);
}

if (modalPlayAgainButton) {
  modalPlayAgainButton.addEventListener("click", resetGame);
}

if (closeGameModalButton) {
  closeGameModalButton.addEventListener("click", closeGameModal);
}

if (gameModal) {
  gameModal.addEventListener("click", (event) => {
    if (event.target === gameModal) {
      closeGameModal();
    }
  });
}

updateScoreboard();
resetBallPosition();
resetGoalkeeperPosition();


/* =========================================================
   18. SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* =========================================================
   19. IMAGE ERROR FALLBACK
========================================================= */

const websiteImages = document.querySelectorAll("img");

websiteImages.forEach((image) => {
  image.addEventListener("error", () => {
    image.style.background =
      "linear-gradient(135deg, #6c4cff, #00c2ff)";

    image.style.minHeight = "180px";

    image.alt =
      `${image.alt || "Image"} — add the correct image file inside the images folder.`;
  });
});


/* =========================================================
   20. WELCOME MESSAGE
========================================================= */

window.addEventListener("load", () => {
  console.log(
    "%cWelcome to Floyed's website! 🚀",
    "color: #6c4cff; font-size: 20px; font-weight: bold;"
  );

  console.log(
    "%cKeep coding, learning and building amazing things.",
    "color: #00a6d6; font-size: 14px;"
  );
});
