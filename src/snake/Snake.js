import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import timeout from "../simon/utils";
import SnakeFood from "./SnakeFood";
import SnakeObj from "./SnakeObj";

const Snake = () => {

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]
  }

  const [snakedots, setSnakedots] = useState([
    [0, 0],
    [0, 2],
  ]);
  const [direction, setDirection] = useState("DOWN");
  const [next, setNext] = useState(true)
  const [start, setStart] = useState(false)
  const [shift, setShift] = useState(false)
  const [food, setFood] = useState(getRandomCoordinates)
  const [score, setScore] = useState(0)
  const [highscore, setHighScore] = useState(0)

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      console.log(direction)
      if (e.code === "KeyW" ) {
        // console.log("W");
        setDirection("UP");
      } else if (e.code === "KeyA" ) {
        // console.log("A");
        setDirection("LEFT");
      } else if (e.code === "KeyS" ) {
        // console.log("S");
        setDirection("DOWN");
      } else if (e.code === "KeyD") {
        //console.log("D");
        setDirection("RIGHT");
      }
    })
  }, []);

  const startGame = () => {
    setSnakedots([
      [0, 0],
      [0, 2],
    ])
    setDirection("DOWN")
    setScore(0)
    setStart(true)
  }

    useInterval(()=>{
      if(start===true){
      moveSnake()}
    },100)
  

  function moveSnake(){
    //console.log("newmove")
    let tempsnakedots = [...snakedots];
    let head = tempsnakedots[tempsnakedots.length - 1];
    let dir = direction;
    //console.log(direction)
    let newhead = []
      if (dir === "UP") {
        newhead = [head[0], head[1]-2]
      
      } else if (dir === "DOWN") {
        newhead = [head[0],head[1]+2]
       
      } else if (dir === "LEFT") {
      
        newhead = [head[0]-2, head[1]]
      } else if (dir === "RIGHT") {
      
        newhead = [head[0]+2, head[1]]
      }
      tempsnakedots.push(newhead)
      //console.log(tempsnakedots)
      tempsnakedots.shift()
      //console.log(tempsnakedots)
      
      checkEat(newhead, tempsnakedots)
      checkCollision(newhead)
      let out = checkOutOfBorders(newhead)
      if (out !== true){
      setSnakedots(tempsnakedots)}
    }

    function checkEat(head, tempsnakedots){
      let tempfood = food
      if(tempfood[0] === head[0] && tempfood[1] === head[1]){
        let tempscore = score
        tempscore++
        setScore(tempscore)
        checkHighScore(tempscore)
        setFood(getRandomCoordinates)
        console.log("entre")
        enlargeSnake(tempsnakedots)
      }

    }

    function checkHighScore(tempscore){
      let temphighscore = highscore
      if(tempscore > temphighscore){
        setHighScore(tempscore)
      }
    }

    function enlargeSnake(tempsnakedots){
      tempsnakedots.unshift([])
      console.log(tempsnakedots)
      setSnakedots(tempsnakedots)
    }

    function checkCollision(head){
      let snake = [...snakedots]
      snake.pop()
      snake.forEach(dot => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
          gameOver();
          
        }
      })
    }

    function checkOutOfBorders(head){
      if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
        gameOver();
        return true
      }
    }

    function gameOver(){
      setStart(false)
      alert("Game over")
    }

  return (
    <div className="d-inline-flex flex-column h-100 w-75 align-items-center">
      <h1>Snake</h1>
      <div className="snakeframe">
        <SnakeObj snakedots={snakedots} />
        <SnakeFood dot={food} />
      </div>
      <h2>Score: {score}</h2>
      <h2>High Score: {highscore}</h2>
      {start ? "" : (<Button className="simonyellow" onClick={(e) => startGame(e)}>
          Start Game
        </Button>)}
      
    </div>
  );
};

export default Snake;
