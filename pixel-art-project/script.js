const board = document.querySelector('#pixel-board');
function createPixelsDefault(pixelSize) {
  for (let index = 0; index < pixelSize; index += 1) {
    const divRow = document.createElement('div');
    board.appendChild(divRow);

    for (let index2 = 0; index2 < pixelSize; index2 += 1) {
      const div2 = document.createElement('div');
      div2.classList.add('pixel');
      divRow.appendChild(div2);
    }
  }
}

createPixelsDefault(5);

function selectColor(event) {
  document.querySelector('.selected').classList.remove('selected');
  event.target.classList.add('selected');
}

function changeColor() {
  const color = document.querySelector('#color-palette');
  color.addEventListener('click', selectColor);
}

changeColor();

function paintColor(event) {
  const selected = document.querySelector('.selected');
  const color = getComputedStyle(selected).getPropertyValue('background-color');
  const pixel = event.target;
  pixel.style.backgroundColor = color;
}

function getBoard() {
  const test = document.querySelector('#pixel-board');
  test.addEventListener('click', paintColor);
}

getBoard();

function clearBoard() {
  const pixel = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
}

function pressButton() {
  const button = document.querySelector('#clear-board');
  button.addEventListener('click', clearBoard);
}

pressButton();

function createPixels() {
  if (document.querySelector('#board-size').value === '') alert('Board inválido!');
  const pixelSize = Number(document.querySelector('#board-size').value);
  board.innerHTML = '';
  if (pixelSize < 5) createPixelsDefault(5);
  else if (pixelSize > 50) createPixelsDefault(50);
  else {
    createPixelsDefault(pixelSize);
  }
}

function onClick() {
  const genButton = document.querySelector('#generate-board');
  genButton.addEventListener('click', createPixels);
}
onClick();

function randomNumber() {
  const random = parseInt(Math.random() * 255, 10);
  return random;
}

function addRandomColor(element) {
  const randomColor = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
  const elemento = document.querySelector(element);
  elemento.style.backgroundColor = randomColor;
}

addRandomColor('#paintRed');
addRandomColor('#paintGreen');
addRandomColor('#paintBlue');
