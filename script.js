document.addEventListener("DOMContentLoaded", () => {
  let cardArray = [];
  const gameBoard = document.getElementById("gameBoard");

  function createCardArray(numPairs) {
    let array = [];
    for (let i = 1; i <= numPairs; i++) {
      array.push({ name: i.toString(), img: i.toString() });
      array.push({ name: i.toString(), img: i.toString() });
    }
    return array.sort(() => 0.5 - Math.random());
  }

  function createBoard() {
    cardArray = createCardArray(2); // Start with 2 pairs for simplicity
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${Math.ceil(
      Math.sqrt(cardArray.length)
    )}, 100px)`;

    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement("div");
      card.setAttribute("class", "card show");
      card.setAttribute("data-id", i);
      card.innerHTML = cardArray[i].img;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    }

    // Hide cards after a short delay to allow player to memorize them
    setTimeout(hideCards, 3000);
  }

  function hideCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.classList.remove("show");
      card.innerHTML = "";
    });
  }

  function flipCard() {
    const cardId = this.getAttribute("data-id");
    this.classList.add("show");
    this.innerHTML = cardArray[cardId].img;
  }

  createBoard();
});
