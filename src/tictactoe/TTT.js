import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Board from "./Board";

const TTT = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [games, setGames] = useState({ wins: 0, draws: 0, losses: 0 });
  const[percentages,setPercentages] = useState({winp: 0, drawp:0, lossp: 0})
  const winner = calculateWinner(board);
  const [playVisible, setPlayVisible] = useState(true);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = (i) => {
    var boardCopy = [...board];
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) return;
    // Put an X or an O in the clicked square
    boardCopy[i] = "X";
    var win = calculateWinner(boardCopy, games);
    if (win === null){
    var flag_valid = false;
    while (flag_valid === false) {
      var computer_choice = getRandomInt(1, 9);
      if (boardCopy[computer_choice] === null) {
        boardCopy[computer_choice] = "O";
        flag_valid = true;
      }
      let count = 0;
      for (let k = 0; k < board.length; k++) {
        if (boardCopy[k] !== null) {
          count++;
        }
      }
      if (count === board.length) {
        flag_valid = true;
      }
    }}

    setBoard(boardCopy);
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
        return `Winner: ${squares[a]}`;
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
        return "Draw";
      }
    }
    return null;
  }

  useEffect(() => {

    if(winner!==null){
      console.log("Entre")
      var winner_priv = winner
      var games_priv = games
      if (winner_priv.includes("X")){
        games_priv.wins++
      }
      else if (winner_priv.includes("O")){
        games_priv.losses++
      }
      else if (winner_priv.includes("Draw")){
        games_priv.draws++
      }
      else{
        console.log("Error")
      }
      var totalgames = games_priv.wins + games_priv.losses + games_priv.draws
      var percentages_priv = {winp: (games_priv.wins*100/totalgames), lossp: (games_priv.losses*100/totalgames), drawp: (games_priv.draws*100/totalgames)}
      setGames(games_priv)
      setPercentages(percentages_priv)
    }

  }, [winner])

  const computerChoice = (boardCopy) => {
    var flag_valid=false
      while (flag_valid === false) {
        var computer_choice = getRandomInt(1, 9);
        if (boardCopy[computer_choice] === null) {
          boardCopy[computer_choice] = "O";
          flag_valid = true;
        }
        let count = 0;
        for (let k = 0; k < board.length; k++) {
          if (boardCopy[k] !== null) {
            count++;
          }
        }
        if (count === board.length) {
          flag_valid = true;
        }
      }
      return computer_choice
  }


  return (
    <div className="d-inline-flex flex-column h-100 w-75 align-items-center border">
      <h1>Tic Tac Toe</h1>
      <Board squares={board} onClick={handleClick} />
      {winner ? winner : ""}
      <h2>Wins: {games.wins} Losses: {games.losses} Draws: {games.draws}</h2>
      <h2>Win%: {percentages.winp.toFixed(2)}% Loss%: {percentages.lossp.toFixed(2)}% Draw%: {percentages.drawp.toFixed(2)}%</h2>
      {winner ? (<>
        <Button className="mt-5" onClick={handlePlayAgain}>
          Play Again
        </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TTT;
