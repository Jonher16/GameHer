import React, { useEffect, useState } from "react";
import scissors from "./img/scissors_test.png";
import rock from "./img/rock.png";
import PlayerDisplay from "./PlayerDisplay";
import { Button } from "react-bootstrap";

const RPS = () => {
  const handleChoice = (e, choice) => {
    e.preventDefault();
    console.log("Choice changed to " + choice);
    setChoice(choice);
    randomChoice();
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomChoice() {
    var random_choice = getRandomInt(1, 3);
    if (random_choice === 1) {
      setChoice2("Rock");
    } else if (random_choice === 2) {
      setChoice2("Paper");
    } else if (random_choice === 3) {
      setChoice2("Scissors");
    }
    checkWinner();
  }

  function checkWinner() {
    if (choice === choice2) {
      setDraws(draws + 1);
    } else {
      if (choice === "Rock") {
        if (choice2 === "Scissors") {
          setWins(wins + 1);
        } else {
          setLosses(losses + 1);
        }
      } else if (choice === "Paper") {
        if (choice2 === "Rock") {
          setWins(wins + 1);
        } else {
          setLosses(losses + 1);
        }
      } else if (choice === "Scissors") {
        if (choice2 === "Paper") {
          setWins(wins + 1);
        } else {
          setLosses(losses + 1);
        }
      }
    }
  }

  const [choice, setChoice] = useState(" ");
  const [choice2, setChoice2] = useState("");
  const [draws, setDraws] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  return (
    <div className="d-inline-flex flex-column h-100 w-75 align-items-center border">
      <h1>Rock Paper Scissors</h1>
      <div className="d-inline-flex flex-row border h-50 w-75 mt-5">
        <PlayerDisplay img={scissors} player={"Player 1"} choice={choice} />
        <PlayerDisplay img={scissors} player={"Computer"} choice={choice2} />
      </div>
      {/* Button Div */}
      <div className="d-inline-flex flex-row justify-content-around w-50 border mt-3">
        <Button className="w-25" onClick={(e) => handleChoice(e, "Rock")}>
          Rock
        </Button>
        <Button className="w-25" onClick={(e) => handleChoice(e, "Paper")}>
          Paper
        </Button>
        <Button className="w-25" onClick={(e) => handleChoice(e, "Scissors")}>
          Scissors
        </Button>
      </div>
      <div className="d-inline-flex flex-row justify-content-around w-100 border mt-3">
      <h3>Wins: {wins}</h3>
      <h3>Draws: {draws}</h3>
      <h3>Losses: {losses}</h3>
      </div>
    </div>
  );
};

export default RPS;
