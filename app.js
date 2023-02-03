document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const scoreDisplay = document.querySelector("span");
  const startBtn = document.querySelector(".start");

  const width = 10;
  let cyurrentIndex = 0; // first div in our grid
  let appleIndex = 0; // first div in our grid

  let currentSnake = [2, 1, 0]; // the div in our grid being 2 (the HEAD), and 0 being the end (TAIL, with all 1's being the body from now on)
  let direction = 1;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  function startGame() {
    currentSnake.forEach((index) => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 800;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  function moveOutcomes() {
    if (
      (currentSnake[0] + width >= width * width && direction === width) || // if snake has hit bottom
      (currentSnake[0] % width === width - 1 && direction === 1) || // if snake has hit right wall
      (currentSnake[0] % width === 0 && direction === -1) || // if snake has hit left wall
      (currentSnake[0] - width < 0 && direction === -width) || // if snake has hit the top
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return clearInterval(interval); // this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop(); // removes last item of the array and shows it
    squares[tail].classList.remove("snake"); // removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction); // gives direction to the head of the array

    // deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains("apple")) {
      squares[currentSnake[0]].classList.remove("apple");
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomApple();
      score++;
      //this is where we speed up the snake
      intervalTime = intervalTime - 10;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add("snake");
  }
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake")); //making sure apples dont appear on the snake
    squares[appleIndex].classList.add("apple");
  }

  function control(e) {
    squares[currentIndex].classList.remove("snake");

    if (e.keyCode === 39) {
      direction = 1; // if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      direction = -width; // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1; // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      direction = +width; // if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }

  document.addEventListener("keyup", control);

  startBtn.addEventListener("click", startGame);
});
