
// const cells = document.querySelectorAll('.cell');

// for (const cell of cells) {
//   cell.addEventListener('click', clickHandle);
// }
let game_state = 0;
const api = new ApiManager('game_storage');
const popup = document.querySelector('.popup');
const message_el = popup.querySelector('.message');
const board = document.querySelector('.game_board');
const cells = board.children;
board.addEventListener('click', boardClickHandle);

function boardClickHandle(event) {
  if (!event.target.classList.contains('cell')) {
    return;
  }

  clickHandle.bind(event.target)();
}

let count = 0;
let referee = new Referee();
let storage = new Storage('tictactoe');

let entries = storage.getEntries();
let moves = {};

for(let id in entries) {
  const entry = entries[id];
  cells[id].textContent = entry.symbol;
  moves[id] = entry.symbol;
}

function clickHandle() {
  if (this.textContent !== '') {
    return;
  }
  const symbol = (++count % 2 == 0) ? 'o' : 'x';
  this.textContent = symbol;
  const id = this.dataset.id;
  moves[id] = symbol;
  storage.add(
    id,
    {symbol:symbol}
  );
  if (referee.checkWinner(moves, symbol)) {
    showMessage("Player " + symbol + ' has won the game!');
    // A -> "x", "o"

    const data = new FormData();
    data.append('winner', symbol);

    api.create(data, function (result) {

    });

  // } else if (count == 9) {
  //   // B -> "-"
  //   // const data = new FormData();
  //   data.append('winner', "-");

  //   api.create(data, function (result) {

  //   });
  // }


  // symbol = (symbol === 'x') ? 'o' : 'x';

  // console.log(moves);
}

document.querySelector('.reset').addEventListener('click', resetHandle);
document.querySelector('.reset_game').addEventListener('click', resetHandle);

popup.addEventListener('click', function (event) {
  if (event.target.classList.contains('popup')) {
    hideMessage();
  }
})

function resetHandle () {
  for (const cell of cells) {
    cell.textContent = '';
  }
  storage.clear();
  symbol = 'x';
  moves = {};
  hideMessage();
}

/**
   * False cases
   * 1. there was a winner
   * 2. board is full
   */

if (game_state == 0) {
  // "winner", "-"
}
else {
  game_state = 0;
}



function showMessage(message) {
  popup.classList.add('open');
  message_el.textContent = message;
}

function hideMessage() {
  popup.classList.remove('open');
}


