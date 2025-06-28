const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const rows = canvas.width / box;
const columns = canvas.height / box;

let snake = [
  { x: 5 * box, y: 5 * box }
];
let food = spawnFood();
let direction = "RIGHT";
let score = 0;
let speed = 150;

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  const key = e.key;
  if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * rows) * box,
    y: Math.floor(Math.random() * columns) * box
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "limegreen" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Move Snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Game Over Conditions
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameLoop);
    alert("💀 Game Over! Final Score: " + score);
    location.reload();
  }

  // Eat Food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = spawnFood();
    // Speed up
    clearInterval(gameLoop);
    speed = Math.max(50, speed - 5); // speed can't go below 50ms
    gameLoop = setInterval(draw, speed);
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

// Start game
let gameLoop = setInterval(draw, speed);