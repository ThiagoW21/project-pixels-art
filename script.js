const pixelBoard = document.getElementById('pixel-board');
const input = document.getElementById('board-size');

function removerBoard() {
  const tamanhoBoard = pixelBoard.childNodes.length;
  for (let linha = tamanhoBoard; linha > 0; linha -= 1) {
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
}

function geraPixels(n) {
  removerBoard();
  for (let coluna = 0; coluna < n; coluna += 1) {
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('linha-board');
    for (let linha = 0; linha < n; linha += 1) {
      const novoPixel = document.createElement('div');
      novoPixel.classList.add('pixel');
      novaDiv.appendChild(novoPixel);
    }
    pixelBoard.appendChild(novaDiv);
  }
}

function geraCor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgb(${r}, ${g}, ${b})`;
  // Aprendi como gerar uma cor aleatória por este site
  // https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript
  // Achei que não era necessário colocar o paranmetro então removi e acrescentei o Math.floor
  // para pegar somente o número inteiro.
}

document.getElementById('black').style.backgroundColor = 'black';
const paletaDeCores = document.getElementsByClassName('color');

for (let pixel = 1; pixel <= 3; pixel += 1) {
  paletaDeCores[pixel].style.backgroundColor = geraCor();
}

function mudaSelected(event) {
  if (event.target.className === 'color') {
    document.querySelector('.selected').classList.remove('selected');
    event.target.classList.add('selected');
  }
}

function pintaPixel(event) {
  const evento = event.target;
  if (event.target.className === 'pixel') {
    const corSelecionada = document.querySelector('.selected').style.backgroundColor;
    evento.style.backgroundColor = corSelecionada;
  }
}

function limpaBoard(event) {
  if (event.target.id === 'clear-board') {
    const board = document.querySelectorAll('.pixel');
    for (let pixel = 0; pixel < board.length; pixel += 1) {
      board[pixel].style.backgroundColor = 'white';
    }
  }
}

function verificaInput() {
  if (input.value === '') {
    alert('Board inválido!');
  } else if (input.value < 5) {
    geraPixels(5);
  } else if (input.value > 50) {
    geraPixels(50);
  } else {
    geraPixels(input.value);
  }
}

function geraBoard(event) {
  if (event.target.id === 'generate-board') {
    verificaInput();
  }
}

document.addEventListener('click', (event) => {
  mudaSelected(event);
  pintaPixel(event);
  limpaBoard(event);
  geraBoard(event);
});
