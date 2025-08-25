const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let answersCount = { A: 0, B: 0, C: 0 }; // contagem de respostas

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  answersCount = { A: 0, B: 0, C: 0 };
  loadQuestion();
};

function nextQuestion(e) {
  const choice = e.target.getAttribute("data-choice");

  if (choice) {
    answersCount[choice]++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  let resultMessage = "";

  const majority = Object.keys(answersCount).reduce((a, b) =>
    answersCount[a] > answersCount[b] ? a : b
  );

  if (majority === "A") {
    resultMessage =
      "🦁 Parabéns! Você possui o verdadeiro espírito da Grifinória: coragem, ousadia e lealdade. Prepare-se para ser recebido com orgulho pelo Chapéu Seletor!";
  } else if (majority === "B") {
    resultMessage =
      "⚖️ Você é equilibrado, mas precisa desenvolver mais ousadia e iniciativa. Ainda pode ter um lugar na Grifinória, mas cuidado: os leões preferem quem enfrenta os desafios.";
  } else {
    resultMessage =
      "🐢 Você é cauteloso e prefere segurança. Talvez sua casa ideal seja outra, mas nunca subestime sua própria bravura – ela pode despertar quando menos esperar.";
  }

  textFinish.innerHTML = resultMessage;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer, index) => {
    const div = document.createElement("div");

    // transforma índice em A, B ou C
    const choice = String.fromCharCode(65 + index);

    div.innerHTML = `
    <button class="answer" data-choice="${choice}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
