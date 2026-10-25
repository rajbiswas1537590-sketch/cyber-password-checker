
const input = document.getElementById("password");
const bar = document.getElementById("bar");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const tips = document.getElementById("tips");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  toggle.textContent = show
    ? "Hide password"
    : "Show password";
});

input.addEventListener("input", () => {
  const p = input.value;
  let score = 0;
  const advice = [];

  if (!p) {
    bar.style.width = "0%";
    result.textContent = "Enter a password";
    scoreText.textContent = "";
    tips.replaceChildren();
    return;
  }

  if (p.length >= 12) score++;
  else advice.push("Use at least 12 characters.");

  if (p.length >= 16) score++;
  else advice.push("Aim for 16+ characters.");

  if (/[a-z]/.test(p) && /[A-Z]/.test(p))
    score++;
  else advice.push("Try uppercase and lowercase.");

  if (/[0-9]/.test(p)) score++;
  else advice.push("Consider adding numbers.");

  if (/[^a-zA-Z0-9]/.test(p)) score++;
  else advice.push("Consider adding symbols.");

  const common = [
    "password", "123456", "qwerty", "admin"
  ];

  if (common.some(word =>
      p.toLowerCase().includes(word))) {
    score = Math.min(score, 1);
    advice.push("Avoid common password patterns.");
  }

  bar.style.width = (score * 20) + "%";
  bar.style.background =
    score <= 2 ? "#f87171" :
    score === 3 ? "#fbbf24" : "#36efad";

  result.textContent =
    score <= 2 ? "Weak" :
    score === 3 ? "Moderate" :
    "Strong by basic rules";

  scoreText.textContent = `Rule score: ${score}/5`;

  advice.push("Use a unique, unpredictable password.");

  tips.replaceChildren();

  advice.forEach(message => {
    const li = document.createElement("li");
    li.textContent = message;
    tips.appendChild(li);
  });
});