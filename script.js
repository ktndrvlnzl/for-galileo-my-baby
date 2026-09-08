/* =============================================================
   PART 1 — PASSCODE GATE
   The four boxes act like one text field: typing a digit jumps
   focus to the next box, and backspace jumps back.
   ============================================================= */

const CORRECT_CODE = "0715"; // Galileo's birthday, July 15th

const gate = document.getElementById("gate");
const gateCard = document.querySelector(".gate-card");
const gateFeedback = document.getElementById("gateFeedback");
const digits = Array.from(document.querySelectorAll(".digit"));
const curtain = document.getElementById("unlockCurtain");
const site = document.getElementById("site");

// A few playful "wrong code" lines so it doesn't say the same thing every time
const wrongCodeLines = [
  "girl that's not it 😭",
  "nope. try again, detective.",
  "closer... okay not really, but try again.",
  "the vault remains sealed. rude of you to guess randomly.",
];

digits.forEach((input, i) => {
  input.addEventListener("input", () => {
    // only allow numbers in the box
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value && i < digits.length - 1) {
      digits[i + 1].focus();
    }
    checkIfComplete();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && i > 0) {
      digits[i - 1].focus();
    }
  });
});

function checkIfComplete() {
  const code = digits.map((d) => d.value).join("");
  if (code.length !== 4) return; // wait until all 4 boxes are filled

  if (code === CORRECT_CODE) {
    unlockSite();
  } else {
    showWrongCode();
  }
}

function showWrongCode() {
  const line = wrongCodeLines[Math.floor(Math.random() * wrongCodeLines.length)];
  gateFeedback.textContent = line;
  gateCard.classList.add("shake");

  setTimeout(() => {
    gateCard.classList.remove("shake");
    digits.forEach((d) => (d.value = ""));
    digits[0].focus();
  }, 400);
}

function unlockSite() {
  gateFeedback.textContent = "there she is.";

  // small delay so the person sees the success message before the curtain runs
  setTimeout(() => {
    curtain.classList.add("curtain-run");

    // reveal the real site partway through the curtain sweep
    setTimeout(() => {
      gate.classList.add("gate-hidden");
      site.hidden = false;
      startScrollReveal(); // only start watching sections once they exist on screen
    }, 600);
  }, 500);
}

/* =============================================================
   PART 2 — FLOATING PETALS
   Both the gate background and the gift section use small drifting
   petal shapes. This one function builds them into any container.
   ============================================================= */
function spawnPetals(container, count) {
  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDuration = 6 + Math.random() * 6 + "s";
    petal.style.animationDelay = Math.random() * 6 + "s";
    petal.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
    container.appendChild(petal);
  }
}

spawnPetals(document.querySelector(".gate-petals"), 14);
spawnPetals(document.querySelector(".gift-petals"), 12);

/* =============================================================
   PART 3 — SCROLL REVEAL
   Uses IntersectionObserver: elements fade/slide in the first time
   they scroll into view. Each item gets a tiny staggered delay
   based on its position so groups feel choreographed, not robotic.
   ============================================================= */
function startScrollReveal() {
  const groups = [
    document.querySelectorAll(".apology .reveal-line"),
    document.querySelectorAll(".stack-item"),
    document.querySelectorAll(".coded-card"),
  ];

  groups.forEach((group) => {
    group.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".reveal-line, .stack-item, .coded-card, .gift-title, .gift-line")
    .forEach((el) => observer.observe(el));
}

/* =============================================================
   PART 4 — SCROLL BUTTON
   ============================================================= */
document.getElementById("scrollToApology").addEventListener("click", () => {
  document.getElementById("apology").scrollIntoView({ behavior: "smooth" });
});

/* =============================================================
   PART 5 — "GALILEO-CODED" CARDS
   Each card flips on click/tap to reveal a short reaction line.
   The list below is the whole content source for this section —
   edit it here if you ever want to add or change an item.
   ============================================================= */
const codedItems = [
  { label: "debating", back: "obviously." },
  { label: "public speaking", back: "born for the mic." },
  { label: "pageants", back: "of course you like this." },
  { label: "being annoyingly good at English", back: "we know." },
  { label: "that bright personality", back: "impossible to ignore, and you know it." },
  { label: "pink & burgundy", back: "your whole aesthetic in one line." },
  { label: "San Marino spicy", back: "respect." },
  { label: "carbonara", back: "of course you like this." },
  { label: "steak", back: "no notes." },
  { label: "big siomai", back: "the bigger the better, apparently." },
  { label: "Diet Coke", back: "it's basically your blood type." },
  { label: "C2", back: "the backup blood type." },
  { label: "Barista's Choice", back: "for the classier days." },
  { label: "lilies", back: "elegant. so on brand." },
  { label: "red roses", back: "classic. also on brand." },
  { label: "dahlias", back: "of course you like this." },
  { label: "The Beatles", back: "impeccable taste, actually." },
  { label: "Chase Atlantic", back: "loud, moody, very you." },
  { label: "IV of Spades", back: "a certified bop enjoyer." },
  { label: "Metallica", back: "the range on you." },
];

const codedGrid = document.getElementById("codedGrid");

codedItems.forEach((item) => {
  const card = document.createElement("button");
  card.className = "coded-card";
  card.setAttribute("aria-label", `${item.label} — tap to reveal`);

  const front = document.createElement("span");
  front.className = "front";
  front.textContent = item.label;

  const back = document.createElement("span");
  back.className = "back";
  back.textContent = item.back;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  codedGrid.appendChild(card);
});

/* Focus the first passcode box as soon as the page loads */
digits[0].focus();
