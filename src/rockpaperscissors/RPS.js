import React, { useEffect, useState } from "react";
import scissors from "./img/scissors.png";
import rock from "./img/rock.png";
import paper from "./img/paper.png"
import PlayerDisplay from "./PlayerDisplay";
import { Button, Col, Container, Row } from "react-bootstrap";

const RPS = () => {

  const handleChoice = (e, choice, prevclicks, prevwins, prevdraws, prevlosses) => {
    
    e.preventDefault();
    var wins = prevwins;
    var draws = prevdraws;
    var losses = prevlosses;
    var clicks = prevclicks;

    clicks++;
    setClicks(clicks)


    console.log("Choice changed to " + choice);
    setChoice(choice);
    if (choice === 1){
      setImage(rock)
      setChoice("Rock")
    }
    else if (choice=== 3) {
      setImage(scissors)
      setChoice("Scissors")
    }
    else if (choice=== 2){
      setImage(paper)
      setChoice("Paper")
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
    
    if (choice === random_choice) {
      draws++
    } else {
      if (choice === 1) {
        if (random_choice === 3) {
          wins++
        } else {
          losses++
        }
      } else if (choice === 2) {
        if (random_choice === 1) {
          wins++
        } else {
          losses++
        }
      } else if (choice === 3) {
        if (random_choice === 2) {
          wins++
        } else {
          losses++
        }
      }
    }
    console.log("W: ",wins,"WP: ",wins/clicks)
    console.log("L: ",losses,"LP: ", losses/clicks)
    console.log("D: ",draws, "DP: ", draws/clicks)
    
    setClicks(clicks)
    setWins(wins)
    setLosses(losses)
    setDraws(draws)
    setWinp((wins*100/clicks).toFixed(2))
    setLossp((losses*100/clicks).toFixed(2))
    setDrawp((draws*100/clicks).toFixed(2))

  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  const experiment = (e, prevclicks,  prevwins, prevdraws, prevlosses, sims) =>{
    e.preventDefault()

    var clicks = prevclicks
    clicks+=sims
    setClicks(clicks)

    var draws = prevdraws;
    var wins = prevwins;
    var losses = prevlosses;

    for(let i=0;i<sims;i++){
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
  
    setWins(wins)
    setLosses(losses)
    setDraws(draws)
    setWinp((wins*100/clicks).toFixed(2))
    setLossp((losses*100/clicks).toFixed(2))
    setDrawp((draws*100/clicks).toFixed(2))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

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
  const [name, setName] = useState("Player 1")
  const [inv, setInv] = useState(false)

  return (
    <div className="d-inline-flex flex-column h-100 w-75 align-items-center">
      <h1>Rock Paper Scissors</h1>
      <div className="form-group">
      <label htmlFor="formGroupExampleInput">Enter your name:</label>
       <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
    </div>
      <div className="d-inline-flex flex-row h-50 w-75 mt-5 border border-secondary rounded pt-5">
        <PlayerDisplay img={image} player={name} choice={choice} />
        <PlayerDisplay img={image2} player={"Computer"} choice={choice2} />
      </div>
      {/* Button Div */}
      <Container fluid className="d-inline-flex flex-row justify-content-around w-50 mt-3 border">
        <Row xs={12} md={4} className="w-100 h-100 border" >
          <Col>
        <Button className="btn w-100" onClick={(e) => handleChoice(e, 1, clicks, wins, draws, losses)}>
          Rock
        </Button>
        </Col>
        <Col>
        <Button className="btn w-100" onClick={(e) => handleChoice(e, 2, clicks, wins, draws, losses)}>
          Paper
        </Button>
        </Col>
        <Col>
        <Button className="btn w-100" onClick={(e) => handleChoice(e, 3, clicks, wins, draws, losses)}>
          Scissors
        </Button>
        </Col>
        </Row>
      </Container>
      <Button className="btn mt-3 mb-3 w-25" onClick={(e) => experiment(e, clicks, wins, draws, losses, 100)}>
          Simulate 100
        </Button>
        <h3>Clicks: {clicks}</h3>
      <div className="d-inline-flex flex-row justify-content-around w-100 mt-2">
      <h3>Wins: {wins}</h3>
      <h3>Draws: {draws}</h3>
      <h3>Losses: {losses}</h3>
      </div>
      <div className="d-inline-flex flex-row justify-content-around w-100 mt-1">
      <h3>Win %: {winp}%</h3>
      <h3>Draw %: {drawp}%</h3>
      <h3>Loss %: {lossp}%</h3>
      </div>
    </div>
  );
};

export default RPS;
