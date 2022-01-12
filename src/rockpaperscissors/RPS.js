import React, { useEffect, useState } from "react";
import scissors from "./img/scissors.png";
import rock from "./img/rock.png";
import paper from "./img/paper.png"
import PlayerDisplay from "./PlayerDisplay";
import { Button } from "react-bootstrap";

const RPS = () => {
  const handleChoice = (e, choice) => {
    e.preventDefault();
    setClicks(clicks+1)
    console.log("Choice changed to " + choice);
    setChoice(choice);
    if (choice === "Rock"){
      setImage(rock)
    }
    else if (choice==="Scissors") {
      setImage(scissors)
    }
    else if (choice==="Paper"){
      setImage(paper)
    }

    var random_choice = getRandomInt(1, 3);
    if (random_choice === 1) {
      setChoice2("Rock");
      setImage2(rock)
    } else if (random_choice === 2) {
      setChoice2("Paper");
      setImage2(paper)
    } else if (random_choice === 3) {
      setChoice2("Scissors");
      setImage2(scissors)
    }
    
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
    setWinp(wins*100/clicks)
    setLossp(losses*100/clicks)
    setDrawp(draws*100/clicks)

  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const experiment = (e, prevdraws, prevlosses, prevwins) =>{
    e.preventDefault()

    setClicks(clicks+100)

    var draws = prevdraws;
    console.log("prevdraws ",prevdraws)
    var wins = prevwins;
    var losses = prevlosses;
    for(let i=0;i<100;i++){
      console.log("entre")
      var random_choice = getRandomInt(1, 3);
    if (random_choice === 1) {
      setChoice("Rock");
      setImage(rock)
    } else if (random_choice === 2) {
      setChoice("Paper");
      setImage(paper)
    } else if (random_choice === 3) {
      setChoice("Scissors");
      setImage(scissors)
    }
    var random_choice2 = getRandomInt(1, 3);

    if (random_choice2 === 1) {
      setChoice2("Rock");
      setImage2(rock)
    } else if (random_choice2 === 2) {
      setChoice2("Paper");
      setImage2(paper)
    } else if (random_choice2 === 3) {
      setChoice2("Scissors");
      setImage2(scissors)
    }

    if (random_choice === random_choice2) {
      draws++;
    } else {
      if (random_choice === 1) {
        if (random_choice2 === 3) {
          wins++;
        } else {
          losses++;
        }
      } else if (random_choice === 2) {
        if (random_choice2 === 1) {
          wins++;
        } else {
          losses++;
        }
      } else if (random_choice === 3) {
        if (random_choice2 === 2) {
          wins++;
        } else {
          losses++;
        }
      }
    }
    
    }
    console.log("W: ",wins,"WP: ",wins/clicks)
    console.log("L: ",losses,"LP: ", losses/clicks)
    console.log("D: ",draws, "DP: ", draws/clicks)
    setWins(wins)
    setLosses(losses)
    setDraws(draws)
    setWinp((wins*100/clicks).toFixed(2))
    setLossp((losses*100/clicks).toFixed(2))
    setDrawp((draws*100/clicks).toFixed(2))
  }

  const [choice, setChoice] = useState(" ");
  const [choice2, setChoice2] = useState("");
  const [draws, setDraws] = useState(0);
  const [drawp, setDrawp] = useState(0);
  const [wins, setWins] = useState(0);
  const [winp, setWinp] = useState(0);
  const [losses, setLosses] = useState(0);
  const [lossp, setLossp] = useState(0);
  const [image, setImage]= useState(rock)
  const [image2, setImage2] = useState(rock)
  const [clicks, setClicks] = useState(0)

  return (
    <div className="d-inline-flex flex-column h-100 w-75 align-items-center">
      <h1>Rock Paper Scissors</h1>
      <div className="d-inline-flex flex-row h-50 w-75 mt-5 border border-secondary rounded pt-5">
        <PlayerDisplay img={image} player={"Player 1"} choice={choice} />
        <PlayerDisplay img={image2} player={"Computer"} choice={choice2} />
      </div>
      {/* Button Div */}
      <div className="d-inline-flex flex-row justify-content-around w-50 mt-3">
        <Button className="btn w-25" onClick={(e) => handleChoice(e, "Rock")}>
          Rock
        </Button>
        <Button className="btn w-25" onClick={(e) => handleChoice(e, "Paper")}>
          Paper
        </Button>
        <Button className="btn w-25" onClick={(e) => handleChoice(e, "Scissors")}>
          Scissors
        </Button>
      </div>
      <Button className="btn mt-5 w-25" onClick={(e) => experiment(e, draws, losses, wins)}>
          Simulate 100
        </Button>
      <div className="d-inline-flex flex-row justify-content-around w-100 mt-5">
      <h3>Wins: {wins}</h3>
      <h3>Draws: {draws}</h3>
      <h3>Losses: {losses}</h3>
      </div>
      <div className="d-inline-flex flex-row justify-content-around w-100 mt-5">
      <h3>Clicks: {clicks}</h3>
      <h3>Win %: {winp}%</h3>
      <h3>Draw %: {drawp}%</h3>
      <h3>Loss %: {lossp}%</h3>
      </div>
    </div>
  );
};

export default RPS;
