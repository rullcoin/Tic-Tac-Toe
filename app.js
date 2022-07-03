
const gameBoard = (() => {
    //let turn = false;

  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    gameBoard.forEach((item, index) => {
      document.querySelector(`[data-index='${index}']`).textContent = item;
    });
  };

//   const takeTurn = () => {
//     turn = !turn
//     console.log("This is from Take turn function " + turn);
//   }

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
        
        Game.takeTurn()


        Game.aiLogicEasy()
        Game.checkWin();
      }

      render();
    });
  };

  return { gameBoard, render, placeSign };
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

  const player1 = Player("player 1", "X");
  const player2 = Player("player 2", "O");

  const newAi = AI(true, "O")

  let turn = null;

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
    if (turn || turn === null) {
      return player1.playerSign;
    } else {
      return player2.playerSign;
    }
  }

    const takeTurn = () => {
    if (!newAi.isActive) {
        turn = !turn
    }
    console.log("This is from Take turn function " + turn);
  }

  const aiLogicEasy = () => {
    // Empty cells by index
    let emptyCells = []

    if (newAi.isActive === true) {
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
            //checkWin()
        }
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
                console.log("Player 1 wins")
            } else {
                console.log("AI wins")
            }
        }
    }
  }

  const reset = () => {
    gameBoard.gameBoard.splice(0, 9, "", "", "", "", "", "", "", "", "");
    gameBoard.render();
    // Needed to make sure next turn is always X
    turn = true;
  };


  const resetButton = () => {
    let button = document.getElementById("reset-button") 
    button.addEventListener('click', reset)
}

    const startButton = () => {
        let button = document.getElementById("start-button")
        button.addEventListener('click', gameBoard.placeSign)
    }

    const multiplayerButton = () => {
        let button = document.getElementById("multiplayer-button")
        // Ai is true by default.
        button.addEventListener('click', function() {
            
            newAi.isActive = false
            console.log("Ai turned to False");
            console.log("Turn turned to true");
            turn = true
        })
    }

    const aiButton = () => {
        let button = document.getElementById("ai-button")
        button.addEventListener('click', function() {
            newAi.isActive = true
            turn = null
            console.log("Ai turned to true");
        })
    }

  const gameOver = () => {

  }
    resetButton()
   startButton()
   multiplayerButton()
  aiButton()
  return { Turn, checkWin, aiLogicEasy, resetButton, startButton, multiplayerButton, aiButton, takeTurn, reset };
})();
