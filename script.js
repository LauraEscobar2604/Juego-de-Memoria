const cards = [
    { id: 1, src: "img/img1.jpg" },
    { id: 2, src: "img/img2.jpg" },
    { id: 3, src: "img/img3.jpg" },
    { id: 4, src: "img/img4.jpg" },
    { id: 5, src: "img/img5.jpg" },
    { id: 6, src: "img/img6.jpg" },
    { id: 7, src: "img/img7.jpg" },
    { id: 8, src: "img/img8.jpg" },
    { id: 1, src: "img/img1.jpg" }, // Duplicado para pareja
    { id: 2, src: "img/img2.jpg" },
    { id: 3, src: "img/img3.jpg" },
    { id: 4, src: "img/img4.jpg" },
    { id: 5, src: "img/img5.jpg" },
    { id: 6, src: "img/img6.jpg" },
    { id: 7, src: "img/img7.jpg" },
    { id: 8, src: "img/img8.jpg" },
  ];
  
  let shuffledCards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let attempts = 0;
  let timer = 0;
  let timerInterval;
  
  const gameBoard = document.getElementById("gameBoard");
  const attemptsDisplay = document.getElementById("attempts");
  const timeDisplay = document.getElementById("time");
  
  document.getElementById("startGame").addEventListener("click", startGame);
  
  function startGame() {
    shuffledCards = shuffle(cards);
    gameBoard.innerHTML = ""; // Limpiar el tablero
    flippedCards = [];
    matchedCards = 0;
    attempts = 0;
    timer = 0;
  
    // Mostrar estado inicial
    attemptsDisplay.textContent = attempts;
    timeDisplay.textContent = timer;
  
    clearInterval(timerInterval);
  
    // Iniciar el temporizador
    timerInterval = setInterval(() => {
      timer++;
      timeDisplay.textContent = timer;
    }, 1000);
  
    // Crear el tablero
    shuffledCards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.dataset.id = card.id; // Asociar el ID de la carta
  
      // Imagen frontal
      const frontImage = document.createElement("img");
      frontImage.src = card.src;
      frontImage.classList.add("front");
  
      // Parte trasera
      const back = document.createElement("div");
      back.classList.add("back");
  
      // Agregar imagen frontal y trasera a la carta
      cardElement.appendChild(frontImage);
      cardElement.appendChild(back);
  
      // Agregar evento de clic a la carta
      cardElement.addEventListener("click", () => flipCard(cardElement));
  
      // Añadir la carta al tablero
      gameBoard.appendChild(cardElement);
    });
  }
  
  function flipCard(card) {
    if (card.classList.contains("flipped") || flippedCards.length === 2) return;
  
    // Voltear la carta
    card.classList.add("flipped");
    flippedCards.push(card);
  
    // Si hay dos cartas volteadas, comprobar si coinciden
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  function checkMatch() {
    attempts++; // Incrementar intentos
    attemptsDisplay.textContent = attempts;
  
    const [card1, card2] = flippedCards;
  
    // Comparar las cartas por su ID
    if (card1.dataset.id === card2.dataset.id) {
      // Si coinciden, dejarlas volteadas
      matchedCards += 2;
      flippedCards = []; // Reiniciar cartas volteadas
  
      // Verificar si el jugador ha ganado
      if (matchedCards === shuffledCards.length) {
        clearInterval(timerInterval);
        alert(`¡Ganaste! Tiempo: ${timer} segundos, Intentos: ${attempts}`);
      }
    } else {
      // Si no coinciden, voltearlas después de un retraso
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = []; // Reiniciar cartas volteadas
      }, 1000);
    }
  }
  
  // Función para barajar las cartas
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  