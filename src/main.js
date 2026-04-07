import { courses } from './data.js';

// DOM Elements
const wheel = document.getElementById('wheel');
const wheelSvg = document.getElementById('wheel-svg');
const spinBtn = document.getElementById('spin-btn');
const challengeOverlay = document.getElementById('challenge-overlay');
const rewardOverlay = document.getElementById('reward-overlay');
const courseNameEl = document.getElementById('course-name');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMsg = document.getElementById('feedback-msg');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// State
let isSpinning = false;
let currentRotation = 0;
let selectedCourse = null;
let currentChallenge = null;
let selectedOptionId = null;

// Helper for text contrast
function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

// Initialize Wheel
function initWheel() {
  const numSegments = courses.length;
  const angleStep = 360 / numSegments;

  courses.forEach((course, i) => {
    const startAngle = i * angleStep;
    const endAngle = (i + 1) * angleStep;
    const contrastColor = getContrastYIQ(course.color);
    
    // Create Path
    const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
    
    const d = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', course.color);
    path.setAttribute('stroke', 'white');
    path.setAttribute('stroke-width', '0.5');
    wheelSvg.appendChild(path);

    // Add Label
    const textAngle = startAngle + angleStep / 2;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    
    text.setAttribute('x', '50');
    text.setAttribute('y', '15');
    text.setAttribute('fill', contrastColor);
    text.setAttribute('font-size', '2.5');
    text.setAttribute('font-weight', '600');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('transform', `rotate(${textAngle}, 50, 50)`);
    
    const words = course.name.split(' ');
    words.forEach((word, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.textContent = word;
        tspan.setAttribute('x', '50');
        tspan.setAttribute('dy', index === 0 ? '0' : '3');
        text.appendChild(tspan);
    });

    wheelSvg.appendChild(text);
  });
}

// Spin logic
function spin() {
  if (isSpinning) return;
  isSpinning = true;
  spinBtn.disabled = true;
  
  const extraDegrees = Math.floor(Math.random() * 360);
  const totalDegrees = 1800 + extraDegrees;
  currentRotation += totalDegrees;
  
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    isSpinning = false;
    const normalizedRotation = (currentRotation % 360);
    const winningAngle = (360 - normalizedRotation) % 360;
    const segmentIndex = Math.floor(winningAngle / (360 / courses.length));
    
    selectedCourse = courses[segmentIndex];
    showChallenge(selectedCourse);
  }, 5000);
}

// Challenge logic
function showChallenge(course) {
  const randomIndex = Math.floor(Math.random() * course.challenges.length);
  currentChallenge = course.challenges[randomIndex];
  
  courseNameEl.textContent = course.name;
  questionTextEl.textContent = currentChallenge.question;
  
  optionsContainer.innerHTML = '';
  feedbackMsg.textContent = '';
  feedbackMsg.className = 'feedback-msg';
  submitBtn.style.display = 'block';
  nextBtn.style.display = 'none';
  selectedOptionId = null;

  // Unified multiple-choice logic for all types (tf, association, complete)
  currentChallenge.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = typeof opt === 'string' ? opt : opt.text;
    
    // Determine the ID for comparison
    const optId = typeof opt === 'string' 
        ? (opt === 'Verdadeiro' ? true : (opt === 'Falso' ? false : opt)) 
        : opt.id;
    
    btn.onclick = () => {
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOptionId = optId;
    };
    optionsContainer.appendChild(btn);
  });

  challengeOverlay.classList.add('active');
}

function checkAnswer() {
  if (selectedOptionId === null) {
      feedbackMsg.textContent = 'Por favor seleciona uma opção.';
      return;
  }

  const isCorrect = selectedOptionId === currentChallenge.answer;
  
  document.querySelectorAll('.option-btn').forEach(btn => {
      const optText = btn.textContent;
      let optId;
      
      const optMatch = currentChallenge.options.find(o => (typeof o === 'string' ? o : o.text) === optText);
      if (typeof optMatch === 'string') {
          optId = (optMatch === 'Verdadeiro' ? true : (optMatch === 'Falso' ? false : optMatch));
      } else {
          optId = optMatch.id;
      }
      
      if (optId === currentChallenge.answer) {
          btn.classList.add('correct');
      } else if (optId === selectedOptionId) {
          btn.classList.add('incorrect');
      }
  });

  submitBtn.style.display = 'none';
  nextBtn.style.display = 'block';

  if (isCorrect) {
    feedbackMsg.textContent = 'Correto! Excelente trabalho.';
    feedbackMsg.className = 'feedback-msg correct';
    nextBtn.textContent = 'PRÓXIMO';
    nextBtn.onclick = showReward;
  } else {
    feedbackMsg.textContent = 'Oops! Não foi desta vez.';
    feedbackMsg.className = 'feedback-msg incorrect';
    nextBtn.textContent = 'TENTAR NOVAMENTE';
    nextBtn.onclick = () => challengeOverlay.classList.remove('active');
  }
}

function showReward() {
  challengeOverlay.classList.remove('active');
  rewardOverlay.classList.add('active');
}

function resetGame() {
  rewardOverlay.classList.remove('active');
  spinBtn.disabled = false;
}

// Click anywhere on wheel to spin
wheel.onclick = spin;
spinBtn.onclick = spin;
submitBtn.onclick = checkAnswer;
restartBtn.onclick = resetGame;

window.onload = initWheel;
