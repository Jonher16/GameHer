import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Board from "./Board";

const TTT = ({name}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [games, setGames] = useState({ wins: 0, draws: 0, losses: 0 });
  const [percentages, setPercentages] = useState({
    winp: 0,
    drawp: 0,
    lossp: 0,
  });
  const winner = calculateWinner(board);
  const [playVisible, setPlayVisible] = useState(true);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function computerChoice(boardCopy, turn) {
    //console.log("Entered computer choice")
    //console.log("Board entered: ",boardCopy)
    var flag_valid = false;
    while (flag_valid === false) {
      var computer_choice = getRandomInt(0, 9);
      if (boardCopy[computer_choice] === null) {
        if (turn === "X"){
        boardCopy[computer_choice] = "X";
        } else {
        boardCopy[computer_choice] = "O";
        }
        flag_valid = true;
        return { computer_choice, boardCopy };
      } else {
        //console.log(computer_choice,"Occupied, trying again")
      }
      let count = 0;
      for (let k = 0; k < board.length; k++) {
        if (boardCopy[k] !== null) {
          count++;
        }
      }
      if (count === board.length) {
        flag_valid = true;
        return { computer_choice: "None", boardCopy };
      }
    }
  }

  const handleClick = (i) => {
    var boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = "X";

    var compChoice = computerChoice(boardCopy, "O");
    //console.log("Choice ", compChoice.computer_choice);

    boardCopy = compChoice.boardCopy;
    setBoard(boardCopy);
    //console.log(boardCopy);
  };

  const handlePlayAgain = () => {
    setBoard(Array(9).fill(null));
  };

  function calculateWinner(squares) {
    var isWinner = false;

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        const isWinner = true;
        //console.log("Winner to return: ", squares[a])
        return squares[a];
      }
    }
    if (isWinner === false) {
      let countOccupied = 0;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] !== null) {
          countOccupied++;
        }
      }
      if (countOccupied === squares.length) {
        //console.log("Returning Draw")
        return "Draw";
      }
    }
    return null;
  }

  useEffect(() => {
    if (winner !== null) {
      //console.log("There is a winner");
      var winner_priv = winner;
      var games_priv = games;
      if (winner_priv.includes("X")) {
        games_priv.wins++;
      } else if (winner_priv.includes("O")) {
        games_priv.losses++;
      } else if (winner_priv.includes("Draw")) {
        games_priv.draws++;
      } else {
        console.log("Error");
      }
      var totalgames = games_priv.wins + games_priv.losses + games_priv.draws;
      var percentages_priv = {
        winp: (games_priv.wins * 100) / totalgames,
        lossp: (games_priv.losses * 100) / totalgames,
        drawp: (games_priv.draws * 100) / totalgames,
      };
      setGames(games_priv);
      setPercentages(percentages_priv);
    }
  }, [winner]);

  const handleSimu = (e, sims) => {
    e.preventDefault();
    var flag_game = false;
    var boardCopy = Array(9).fill(null)
    var games_priv = games
    for (let i = 0; i < sims; i++) {

      var winner_priv = null
      flag_game = false;
      boardCopy = Array(9).fill(null)
      //console.log("Game ", i)
      while (flag_game === false) {
        //console.log("Round starts")
        var countFree= 0
        for (var j=0;j<boardCopy.length;j++){
          //console.log("j ", j)
          if (boardCopy[j] === null){
            countFree++
            //console.log("Countfree ",countFree)
          }
        }
        if (countFree === 0){
          console.log("There are no spaces left")
        }
        else {
          //console.log("L ", boardCopy.length,"CF ", countFree)
        }
        var compChoice = computerChoice(boardCopy, "X");
        //console.log("Choice 1", compChoice.computer_choice);
        boardCopy = compChoice.boardCopy;
        console.log(boardCopy)
        //Check win 1
        var winner_priv = calculateWinner(boardCopy)
        if (winner_priv === null ){
          //console.log("1 is NOT winner")
          var compChoice2 = computerChoice(boardCopy, "O");
          //console.log("Choice 2", compChoice2.computer_choice);
          boardCopy = compChoice2.boardCopy;
          //console.log(boardCopy)
          //Check win 2
          winner_priv = calculateWinner(boardCopy)
          if (winner_priv !== null){
            flag_game = true
            //console.log("2 is winner")
          } else{
            //console.log("No winner, next round")
          }
        } else {
          //console.log("Either 1 is winner or it's a draw")
          flag_game = true
        }
        setBoard(boardCopy);
      }
      //Update games log
      //console.log("Updating game logs")
      if (winner_priv.includes("X")) {
        games_priv.wins++;
      } else if (winner_priv.includes("O")) {
        games_priv.losses++;
      } else if (winner_priv.includes("Draw")) {
        games_priv.draws++;
      } else {
        console.log("Error");
      }
    }

    //Once done the simulation, set states

    var totalgames = games_priv.wins + games_priv.losses + games_priv.draws;
      var percentages_priv = {
        winp: (games_priv.wins * 100) / totalgames,
        lossp: (games_priv.losses * 100) / totalgames,
        drawp: (games_priv.draws * 100) / totalgames,
      };
      setGames(games_priv);
      setPercentages(percentages_priv);
  };

  return (
    <div className="d-inline-flex flex-column h-100 w-75 align-items-center">
      <h1>Tic Tac Toe</h1>
      <Board squares={board} onClick={handleClick} />
      {winner
        ? winner.includes("X") || winner.includes("O")
          ? `Winner: ${winner}`
          : winner
        : ""}
      <h2>
        Wins: {games.wins} Losses: {games.losses} Draws: {games.draws}
      </h2>
      <h2>
        Win%: {percentages.winp.toFixed(2)}% Loss%:{" "}
        {percentages.lossp.toFixed(2)}% Draw%: {percentages.drawp.toFixed(2)}%
      </h2>
      {winner ? (
        <>
          <Button className="mt-2" onClick={handlePlayAgain}>
            Play Again
          </Button>
          <Button className="mt-2" onClick={(e) => handleSimu(e, 100)}>
            Simulate 100
          </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TTT;
