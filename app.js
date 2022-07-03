let turn = true;

const gameBoard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    gameBoard.forEach((item, index) => {
      document.querySelector(`[data-index='${index}']`).textContent = item;
    });
  };

  const reset = () => {
    gameBoard.splice(0, 9, "", "", "", "", "", "", "", "", "");
    render();
    // Needed to make sure next turn is always X
    turn = true;
  };

  const resetButton = () => {
    let button = document.getElementById("reset-button") 
    button.addEventListener('click', reset)
}

    const startButton = () => {
        let button = document.getElementById("start-button")
        button.addEventListener('click', placeSign)
    }

  
  const placeSign = () => {
    let boardDiv = document.querySelector(".game-board");

    boardDiv.addEventListener("click", function (e) {
      //ID of the current cell
      let getID = e.target.getAttribute("data-index");

      //Players can place picks only in blank cells
      if (gameBoard[getID] === "") {
        gameBoard.splice(getID, 1, Game.Turn());


        //This is needed for 2 player game, but for now it is AI only.
        //turn = !turn;


        
        Game.aiLogicEasy()
        Game.checkWin();
      }

      render();
    });
  };

  return { gameBoard, render, placeSign, reset, resetButton, startButton };
})();

const Player = (name, sign) => {
  // Players will be able to choose their own sign
  const playerSign = sign;

  return { name, playerSign };
};

const AI = (active, sign) => {
    const isActive = active

    return {isActive, sign}
}

const Game = (() => {
    gameBoard.startButton()
  gameBoard.resetButton();

  const player1 = Player("player 1", "X");
  const player2 = Player("player 2", "O");

  const newAi = AI(true, "O")

  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ]

    let roundWon = false

  //Alternates turns. Turn is currently global.
  const Turn = () => {
    if (turn) {
      return player1.playerSign;
    } else {
        // Maybe add AI logic in here
      return player2.playerSign;
    }
  }

  const aiLogicEasy = () => {
    // Empty cells by index
    let emptyCells = []

    for (let i = 0; i < gameBoard.gameBoard.length; i++) {
        //Checks how many empty values there are.
        if (gameBoard.gameBoard[i] === "") {
            emptyCells.push(i)
        }
        
    }
    // Random number for the AI
    let randomNumber = Math.floor(Math.random() * emptyCells.length)
    //AI pick to gameboard
    if (emptyCells.length >= 1) {
        gameBoard.gameBoard.splice(emptyCells[randomNumber], 1, newAi.sign)
        checkWin()
    }

  }

  const checkWin = () => {
    for (let i = 0; i < 8; i++) {
        const winningConditions = winConditions[i]
        
        let a = gameBoard.gameBoard[winningConditions[0]]
        let b = gameBoard.gameBoard[winningConditions[1]]
        let c = gameBoard.gameBoard[winningConditions[2]]

        if (a === "" && b === "" && c === "") {
            continue
        }

        if (a === b && b === c) {
            if (a === "X") {
                alert("Player 1 wins");
            } else {
                alert("Ai wins");
            }
        }
    }
  }

  const gameOver = () => {

  }
   
  return { Turn, checkWin, aiLogicEasy };
})();
