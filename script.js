
"use strict";

const input = document.getElementById("password");
const toggle = document.getElementById("toggle");
const clearButton = document.getElementById("clear");
const bar = document.getElementById("bar");
const meter = document.getElementById("meter");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const summary = document.getElementById("summary");
const tips = document.getElementById("tips");

const commonPatterns = [
  "password",
  "123456",
  "12345678",
  "qwerty",
  "admin",
  "letmein",
  "iloveyou"
];

function showTips(messages) {
  tips.replaceChildren();

  messages.forEach((message) => {
    const item = document.createElement("li");
    item.textContent = message;
    tips.appendChild(item);
  });
}

function resetChecker() {
  bar.style.width = "0%";
  bar.style.background = "#f87171";
  meter.setAttribute("aria-valuenow", "0");
  result.textContent = "Waiting for input";
  scoreText.textContent = "0/5";
  summary.textContent =
    "Enter a fictional password to begin.";

  showTips([
    "Use a long, unique password.",
    "Avoid predictable words and patterns."
  ]);
}

function analyzePassword() {
  const password = input.value;

  if (!password) {
    resetChecker();
    return;
  }

  let score = 0;
  const advice = [];

  if (password.length >= 12) {
    score++;
  } else {
    advice.push("Use at least 12 characters.");
  }

  if (password.length >= 16) {
    score++;
  } else {
    advice.push("Consider using 16 or more characters.");
  }

  if (/[a-z]/.test(password) &&
      /[A-Z]/.test(password)) {
    score++;
  } else {
    advice.push("Consider a mix of uppercase and lowercase.");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    advice.push("Consider including numbers.");
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  } else {
    advice.push("Consider including symbols.");
  }

  const normalized = password.toLowerCase();

  const hasCommonPattern = commonPatterns.some(
    (pattern) => normalized.includes(pattern)
  );

  if (hasCommonPattern) {
    score = Math.min(score, 1);
    advice.push("Avoid common passwords and predictable patterns.");
  }

  if (/^(.)\1+$/.test(password)) {
    score = 0;
    advice.push("Avoid repeating the same character.");
  }

  const level =
    score <= 2 ? "Weak" :
    score === 3 ? "Moderate" :
    "Strong by basic rules";

  const color =
    score <= 2 ? "#f87171" :
    score === 3 ? "#fbbf24" :
    "#36efad";

  bar.style.width = `${score * 20}%`;
  bar.style.background = color;
  meter.setAttribute("aria-valuenow", String(score));

  result.textContent = level;
  result.style.color = color;
  scoreText.textContent = `${score}/5`;

  summary.textContent =
    "Checked " + password.length +
    " characters against five basic rules.";

  advice.push(
    "Use a unique password or passphrase for every account."
  );

  advice.push(
    "A high score does not guarantee security or check breach exposure."
  );

  showTips(advice);
}

toggle.addEventListener("click", () => {
  const shouldShow = input.type === "password";

  input.type = shouldShow ? "text" : "password";
  toggle.textContent = shouldShow ? "Hide" : "Show";
  toggle.setAttribute("aria-pressed", String(shouldShow));
});

input.addEventListener("input", analyzePassword);

clearButton.addEventListener("click", () => {
  input.value = "";
  input.type = "password";
  toggle.textContent = "Show";
  toggle.setAttribute("aria-pressed", "false");
  resetChecker();
  input.focus();
});

resetChecker();