import { courses } from './data.js';

// DOM Elements
const wheel = document.getElementById('wheel');
const wheelSvg = document.getElementById('wheel-svg');
const challengeOverlay = document.getElementById('challenge-overlay');
const rewardOverlay = document.getElementById('reward-overlay');
const courseNameEl = document.getElementById('course-name');
const questionTextEl = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMsg = document.getElementById('feedback-msg');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const indicator = document.querySelector('.wheel-indicator');

// State
let isSpinning = false;
let currentRotation = 0;
let selectedCourse = null;
let currentChallenge = null;
let selectedOptionId = null;

// Helper for Hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
}

// Helper for text contrast - returning premium Apple-style tones
function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    // Returns #1D1D1F (Apple Black) for light bg, #FBFBFD (Cloud White) for dark bg
    return (yiq >= 128) ? '#1D1D1F' : '#FBFBFD';
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
    text.setAttribute('y', '6'); // Even higher up to use maximum radius breadth
    text.setAttribute('fill', contrastColor);
    text.setAttribute('font-size', '1.8'); // Safer font size for long multi-line names
    text.setAttribute('font-weight', '600');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('transform', `rotate(${textAngle}, 50, 50)`);
    
    const words = course.name.split(' ');
    words.forEach((word, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.textContent = word;
        tspan.setAttribute('x', '50');
        tspan.setAttribute('dy', index === 0 ? '0' : '2.8'); // Tighter line height
        text.appendChild(tspan);
    });

    wheelSvg.appendChild(text);
  });
}

// Spin logic
function spin() {
  isSpinning = true;
  
  const extraDegrees = Math.floor(Math.random() * 360);
  const totalDegrees = 7200 + extraDegrees; // Solid 20 rotations
  currentRotation += totalDegrees;
  
  wheel.style.transform = `rotate(${currentRotation}deg)`;
  
  // High-fidelity physical flacker animation
  let lastRot = 0;
  function updateFlacker() {
    if (!isSpinning) return;
    
    // Get current rotation from the wheel element matrix
    const style = window.getComputedStyle(wheel);
    const matrix = new WebKitCSSMatrix(style.transform);
    const angle = Math.abs(Math.round(Math.atan2(matrix.m12, matrix.m11) * (180 / Math.PI)));
    
    // Segment width for 12 courses = 30deg
    const segmentAngle = 360 / courses.length;
    const progress = (angle % segmentAngle) / segmentAngle;
    
    // Physical snap effect: bends as it passes, snaps on joint
    let snapAngle = 0;
    if (progress > 0.7) {
      snapAngle = (progress - 0.7) * -40; // Tension / Resistance
    } else if (progress < 0.15) {
      snapAngle = (0.15 - progress) * 20; // Snap-forward inertia
    }

    indicator.style.transform = `translateX(-50%) rotate(${snapAngle}deg)`;
    
    if (isSpinning) {
      requestAnimationFrame(updateFlacker);
    } else {
      indicator.style.transform = 'translateX(-50%) rotate(0deg)';
    }
  }
  
  // Start the physical simulation
  requestAnimationFrame(updateFlacker);

  setTimeout(() => {
    isSpinning = false;
    const normalizedRotation = (currentRotation % 360);
    const winningAngle = (360 - normalizedRotation) % 360;
    const segmentIndex = Math.floor(winningAngle / (360 / courses.length));
    
    selectedCourse = courses[segmentIndex];
    
    // Brief anticipation pause
    setTimeout(() => {
      showChallenge(selectedCourse);
    }, 600);
  }, 6000);
}

// Challenge logic
function showChallenge(course) {
  const randomIndex = Math.floor(Math.random() * course.challenges.length);
  currentChallenge = course.challenges[randomIndex];
  
  // Update theme colors
  const rgb = hexToRgb(course.color);
  document.documentElement.style.setProperty('--theme-color-rgb', rgb);
  
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
    
    btn.onclick = (e) => {
      e.stopPropagation();
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
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        showReward();
    };
  } else {
    feedbackMsg.textContent = 'Oops! Não foi desta vez.';
    feedbackMsg.className = 'feedback-msg incorrect';
    nextBtn.textContent = 'TENTAR NOVAMENTE';
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        challengeOverlay.classList.remove('active');
    };
  }
}

function showReward() {
  challengeOverlay.classList.remove('active');
  rewardOverlay.classList.add('active');
}

function resetGame(e) {
  if (e) e.stopPropagation();
  rewardOverlay.classList.remove('active');
}


// Click anywhere on bg to spin (if not spinning and no overlay)
document.onclick = (e) => {
    // Only spin if we click the background/body itself or the wheel
    // and not if we are spinning or an overlay is open
    if (isSpinning) return;
    if (challengeOverlay.classList.contains('active') || rewardOverlay.classList.contains('active')) return;
    
    spin();
};

submitBtn.onclick = (e) => {
    e.stopPropagation();
    checkAnswer();
};
restartBtn.onclick = (e) => {
    e.stopPropagation();
    resetGame(e);
};

window.onload = initWheel;
