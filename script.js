let row = 3;
let ticTac = document.getElementById('ticTac'); //Main Table
let currentPlay = 'X';
let dataTrack = {};
let gameOver = false;
let clickTimes = 0
let showCurrentPlayer = document.getElementById('showCurrentPlayer')

function createTable() {
  let promptResult = prompt("Enter the game size or Default size will be 3 ")
  console.log(promptResult)
  if(promptResult!=null && promptResult!='' && Number(promptResult)!=NaN && promptResult>=2)
  {
    row = Number(promptResult)
  }
  else
  {
    row = 3
  }
    for (let i = 0; i < row; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < row; j++) {
        let td = document.createElement('td');
        td.classList.add('tabData');
        td.id = 'R' + i + '-' + 'C' + j;
        tr.appendChild(td);
        ticTac.appendChild(tr);
      }
    }
  showCurrentPlayer.innerHTML = currentPlay;
}


function resetGame() {
  dataTrack = {}
  currentPlay = 'X'
  gameOver = false
  clickTimes = 0
  ticTac.querySelectorAll('.tabData').forEach((tr) => {
    tr.innerHTML = ''
  })
}
function changePlayer() {
  return currentPlay == 'X' ? 'O' : 'X';

}

function checkWinner(clickedData, currentPlayer) {
  clickedData = clickedData.split('-');
  let clickedRow = clickedData[0] + currentPlayer;
  let rowNum = Number(clickedData[0].split('R')[1]);
  let clickedColumn = clickedData[1] + currentPlayer;
  let colNum = Number(clickedData[1].split('C')[1]);

  if (dataTrack[clickedRow] == undefined) {
    dataTrack[clickedRow] = 1;
  } else {
    dataTrack[clickedRow] = dataTrack[clickedRow] + 1;
    if (dataTrack[clickedRow] == row) {
      gameOver = true;
      alert('Game Over ' + currentPlay + ' won');
      return true;
    }
  }

  if (dataTrack[clickedColumn] == undefined) {
    dataTrack[clickedColumn] = 1;
  } else {
    dataTrack[clickedColumn] = dataTrack[clickedColumn] + 1;
    if (dataTrack[clickedColumn] == row) {
      gameOver = true;
      alert('Game Over ' + currentPlay + ' won');
      return true;
    }
  }

  if (colNum == rowNum || rowNum + colNum == row - 1) {
    if (colNum == rowNum) {
      if (dataTrack['DL' + currentPlayer] == undefined) {
        dataTrack['DL' + currentPlayer] = 1;
      } else {
        dataTrack['DL' + currentPlayer] = dataTrack['DL' + currentPlayer] + 1;
        if (dataTrack['DL' + currentPlayer] == row) {
          gameOver = true;
          alert('Game Over ' + currentPlay + ' won');
          return true;
        }
      }
    }

    if (rowNum + colNum == row - 1) {

      if (dataTrack['DR' + currentPlayer] == undefined) {
        dataTrack['DR' + currentPlayer] = 1;
      } else {
        dataTrack['DR' + currentPlayer] = dataTrack['DR' + currentPlayer] + 1;
        if (dataTrack['DR' + currentPlayer] == row) {
          gameOver = true
          alert('Game Over ' + currentPlay + ' won');
          return true;
        }
      }
    }
  }
}

ticTac.addEventListener('click', (event) => {
  if (!gameOver) {
    if (event.target.innerHTML == '' && event.target.className == 'tabData') {
      clickTimes += 1
      event.target.innerHTML = currentPlay;
      if (checkWinner(event.target.id, currentPlay)) {
        resetGame();
      }
      else {
        currentPlay = changePlayer();
        showCurrentPlayer.innerHTML = currentPlay;

      }
    }
  }
  if (gameOver || clickTimes == row * row) {
    if (clickTimes == row * row) {
      alert('Its a Draw')
      resetGame();

    }
    return;
  }

});

createTable();
