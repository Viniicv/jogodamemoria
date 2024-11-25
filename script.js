document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart-game');
    const gameBoard = document.getElementById('game-board');
    const winMessage = document.getElementById('win-message');
    const timerElement = document.getElementById('timer');
    const winDetails = document.getElementById('win-details');
    const winAttempts = document.getElementById('win-attempts');
    const winTime = document.getElementById('win-time');
  
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;
    let timer = 0;
    let interval;
  
    const animalIcons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐼', '🐨'];
  
    function createBoard() {
      const shuffledImages = [...animalIcons, ...animalIcons].sort(() => Math.random() - 0.5);
      gameBoard.innerHTML = '';
  
      shuffledImages.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
  
        card.innerHTML = `
          <div class="card-front"></div>
          <div class="card-back">${image}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
      });
  
      cards = document.querySelectorAll('.card');
    }
  
    function startGame() {
      attempts = 0;
      matchedPairs = 0;
      timer = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
      }, 1000);
  
      winMessage.classList.remove('visible');
      winDetails.classList.remove('visible');
      restartButton.classList.add('visible');
      startButton.classList.remove('visible');
      createBoard();
    }
  
    function flipCard(card) {
      if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          attempts++;
          checkMatch();
        }
      }
    }
  
    function checkMatch() {
      const [firstCard, secondCard] = flippedCards;
  
      if (firstCard.dataset.image === secondCard.dataset.image) {
        matchedPairs++;
        if (matchedPairs === animalIcons.length) {
          clearInterval(interval);
          winMessage.classList.add('visible');
          winAttempts.textContent = attempts;
          winTime.textContent = timer;
          winDetails.classList.add('visible');
        }
      } else {
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
        }, 1000);
      }
  
      flippedCards = [];
    }
  
    function restartGame() {
      startButton.classList.add('visible');
      restartButton.classList.remove('visible');
      startGame();
    }
  
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
  });
