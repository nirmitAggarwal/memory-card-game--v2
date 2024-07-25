document.addEventListener("DOMContentLoaded", () => {
  let cardArray = [];
  const gameBoard = document.getElementById("gameBoard");
  const levelDisplay = document.getElementById("level");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const restartButton = document.getElementById("restartButton");
  let cardsChosen = [],
    cardsChosenId = [],
    cardsWon = [],
    level = 1,
    score = 0,
    canPlay = false;

  function createCardArray(numPairs) {
    let array = [];
    for (let i = 1; i <= numPairs; i++) {
      array.push(
        { name: i.toString(), img: i.toString() },
        { name: i.toString(), img: i.toString() }
      );
    }
    return array.sort(() => 0.5 - Math.random());
  }

  function createBoard() {
    cardArray = createCardArray(level + 1);
    gameBoard.innerHTML = "";
    const size = Math.ceil(Math.sqrt(cardArray.length));
    gameBoard.style.gridTemplateColumns = `repeat(${size}, minmax(100px, 1fr))`;

    cardArray.forEach((card, i) => {
      const cardElem = document.createElement("div");
      cardElem.className =
        "card rounded cursor-pointer flex items-center justify-center text-2xl text-transparent h-24 w-24";
      cardElem.setAttribute("data-id", i);
      cardElem.addEventListener("click", flipCard);
      gameBoard.appendChild(cardElem);
    });

    startCountdown(5);
  }

  function startCountdown(seconds) {
    canPlay = false;
    timerDisplay.textContent = `Memorize the cards... ${seconds}`;
    let countdown = setInterval(() => {
      if (--seconds > 0) {
        timerDisplay.textContent = `Memorize the cards... ${seconds}`;
      } else {
        clearInterval(countdown);
        timerDisplay.textContent = "Go!";
        hideCards();
        canPlay = true;
      }
    }, 1000);
  }

  function hideCards() {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("show");
      card.innerHTML = "";
    });
  }

  function flipCard() {
    if (!canPlay) return;

    const cardId = this.getAttribute("data-id");
    if (cardsChosen.length < 2 && !cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.classList.add("show");
      this.innerHTML = cardArray[cardId].img;

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].classList.add("matched");
      cards[optionTwoId].classList.add("matched");
      cardsWon.push(cardsChosen);
      score += 10;
    } else {
      cards[optionOneId].classList.remove("show");
      cards[optionTwoId].classList.remove("show");
      cards[optionOneId].innerHTML = "";
      cards[optionTwoId].innerHTML = "";
      score -= 5;
    }
    cardsChosen = [];
    cardsChosenId = [];
    scoreDisplay.textContent = `Score: ${score}`;

    if (cardsWon.length === cardArray.length / 2) {
      setTimeout(levelUp, 500);
    }
  }

  function levelUp() {
    level++;
    levelDisplay.textContent = `Level: ${level}`;
    cardsWon = [];
    createBoard();
  }

  function restartGame() {
    level = 1;
    score = 0;
    levelDisplay.textContent = `Level: ${level}`;
    scoreDisplay.textContent = `Score: ${score}`;
    cardsWon = [];
    createBoard();
  }

  restartButton.addEventListener("click", restartGame);

  createBoard();
});
