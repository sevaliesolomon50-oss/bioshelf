const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const questions = [
  {q:'What is the basic structural and functional unit of life?', options:['Organ','Cell','Organ system','Tissue'], answer:1, explanation:'Correct! Cells are the basic structural and functional units of living organisms.'},
  {q:'Which branch of biology focuses on plants?', options:['Zoology','Ecology','Botany','Genetics'], answer:2, explanation:'Correct! Botany is the scientific study of plants.'},
  {q:'Which molecule carries genetic information in most living organisms?', options:['DNA','Water','Glucose','Oxygen'], answer:0, explanation:'Correct! DNA stores the genetic instructions used in the development and functioning of organisms.'}
];
let currentQuestion = 0;
const quizPanel = document.getElementById('quiz-panel');
const questionText = document.getElementById('question-text');
const optionsBox = document.getElementById('answer-options');
const feedback = document.getElementById('quiz-feedback');
const nextButton = document.getElementById('next-question');
const questionCount = document.getElementById('question-count');

function renderQuestion() {
  const item = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = item.q;
  optionsBox.innerHTML = '';
  feedback.textContent = '';
  nextButton.hidden = true;
  item.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = option;
    button.addEventListener('click', () => {
      if (optionsBox.dataset.answered === 'true') return;
      optionsBox.dataset.answered = 'true';
      const buttons = [...optionsBox.querySelectorAll('button')];
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === item.answer) b.classList.add('correct');
      });
      if (index !== item.answer) button.classList.add('wrong');
      feedback.textContent = index === item.answer ? item.explanation : `Not quite. The correct answer is ${item.options[item.answer]}.`;
      nextButton.textContent = currentQuestion === questions.length - 1 ? 'Try again ↻' : 'Next question →';
      nextButton.hidden = false;
    });
    optionsBox.appendChild(button);
  });
  optionsBox.dataset.answered = 'false';
}
document.getElementById('start-quiz').addEventListener('click', () => {
  currentQuestion = 0;
  quizPanel.hidden = false;
  renderQuestion();
  quizPanel.scrollIntoView({behavior:'smooth', block:'center'});
});
document.getElementById('close-quiz').addEventListener('click', () => { quizPanel.hidden = true; });
nextButton.addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuestion();
});
