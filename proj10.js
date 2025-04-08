const container = document.getElementById("puzzle-container");
const timerEl = document.getElementById("timer");
const resetBtn = document.getElementById("resetBtn");
const successMessage = document.getElementById("success-message");

let tiles = [];
let correctOrder = [];
let timerInterval = null;
let startTime = null;
let completed = 0;

function createTiles() {
  container.innerHTML = "";
  tiles = [];
  correctOrder = [];

  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.dataset.index = i;

    const img = document.createElement("img");
    img.src = `images/puzzle.jpg`;
    img.draggable = true;
    img.dataset.position = i;
    img.style.objectPosition = `${(i % 3) * -100}px ${Math.floor(i / 3) * -100}px`;
    img.style.objectFit = "none";

    div.appendChild(img);
    tiles.push(div);
    correctOrder.push(i);
  }
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}

function renderTiles() {
  container.innerHTML = "";
  tiles.forEach((tile, i) => {
    tile.dataset.correct = correctOrder[i];
    container.appendChild(tile);
  });
}

function setupDragAndDrop() {
  let dragged;

  container.querySelectorAll(".tile img").forEach((img) => {
    img.addEventListener("dragstart", (e) => {
      dragged = e.target;
    });
  });

  container.querySelectorAll(".tile").forEach((tile) => {
    tile.addEventListener("dragover", (e) => {
      e.preventDefault();
      tile.classList.add("drag-over");
    });

    tile.addEventListener("dragleave", () => {
      tile.classList.remove("drag-over");
    });

    tile.addEventListener("drop", (e) => {
      e.preventDefault();
      tile.classList.remove("drag-over");

      const targetImg = tile.querySelector("img");
      if (!targetImg || dragged === targetImg) return;

      const draggedParent = dragged.parentElement;
      tile.appendChild(dragged);
      draggedParent.appendChild(targetImg);

      checkCompletion();
    });
  });
}

function checkCompletion() {
  const current = [...container.children];
  const isCorrect = current.every((tile, i) => {
    const img = tile.querySelector("img");
    return img && parseInt(img.dataset.position) === i;
  });

  if (isCorrect) {
    clearInterval(timerInterval);
    successMessage.classList.remove("hidden");
  }
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    timerEl.textContent = `Time: ${seconds}s`;
  }, 1000);
}

function resetGame() {
  clearInterval(timerInterval);
  completed = 0;
  successMessage.classList.add("hidden");
  timerEl.textContent = "Time: 0s";

  createTiles();
  shuffleTiles();
  renderTiles();
  setupDragAndDrop();
  startTimer();
}

resetBtn.addEventListener("click", resetGame);
window.onload = resetGame;
