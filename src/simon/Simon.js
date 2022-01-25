import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import buzzer from "./buzzer.mp3";
import correct from "./correct.mp3"

const Simon = () => {
  const [simon, setSimon] = useState([false, false, false, false]);
  const [chain, setChain] = useState([]);
  const [userChain, setUserChain] = useState([]);
  const [userTurn, setUserTurn] = useState(false);
  const [start, setStart] = useState(false);

  function pauseComp(ms) 
 {
     var curr = new Date().getTime();
     ms += curr;
     while (curr   < ms) {
         curr = new Date().getTime();
     }
 } 

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function wait(ms) {
    var start = Date.now(),
      now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }

  const handleClick = (e, number) => {
    let tempuserchain = [...userChain];
    let tempsimon = simon;
    console.log("tempsimon", tempsimon);
    const isExec = (element) => element === true;
    console.log("isExec,", tempsimon.some(isExec));
    if (tempsimon.some(isExec) === true) return;
    tempuserchain.push(number);
    console.log(tempuserchain);
    setUserChain(tempuserchain);
    const temparray = [...simon];
    temparray[number] = true;
    //console.log(temparray)
    //console.log(temparray[number])
    setSimon(temparray);
  };

  useEffect(() => {
    // console.log("Simon => ",simon)
    const timeout = setTimeout(() => {
      //console.log("timecheck")
      setSimon([false, false, false, false]);
    }, 200);
    return () => clearTimeout(timeout);
  }, [simon]);

  const startGame = (e) => {
    e.preventDefault();
    console.log("GAME STARTED");
    setStart(true);
    setUserChain([]);
    setChain([]);
    //new Audio(buzzer).play()
    let random = getRandomInt(0, 3);
    console.log("random, ", random);
    var tempchain = [random];
    setChain(tempchain);
    let tempsimon = [false, false, false, false];
    for (let i = 0; i < tempchain.length; i++) {
      tempsimon[tempchain[i]] = true;
      setSimon(tempsimon);
    }
    setUserTurn(true);
  };

  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }

  function checkChains() {
    let tempstart = start;
    if (tempstart === true) {
      let tempuserchain = userChain;
      let tempchain = chain;
      console.log("Check chains:");
      console.log("UserChain: ", tempuserchain);
      console.log("ActualChain: ", tempchain);
      if (arrayEquals(tempuserchain, tempchain) === true) {
        console.log("Same. Continue game");
        new Audio(correct).play()
        return true;
      } else {
        console.log("Not same. User loses.");
        setStart(false);
        setUserTurn(false);
        setUserChain([]);
        setChain([]);
        new Audio(buzzer).play()
        return false;
      }
    }
  }

  useEffect(() => {
    let tempuserturn = userTurn;
    if (tempuserturn === false) {
      let isSame = checkChains();
      if (isSame === true) {
        setUserChain([]);
        let random = getRandomInt(0, 3);
        console.log("random ", random);
        let tempchain = chain;
        tempchain.push(random);
        let tempsimon = [false, false, false, false];
        for (let i = 0; i < tempchain.length; i++) {
          
          tempsimon[tempchain[i]] = true;
          setSimon(tempsimon);
        }
        setUserTurn(true);
      }
    }
  }, [userTurn]);

  return (
    <div className="d-inline-flex flex-column h-100 w-100 align-items-center mt-3">
      <h1>Simon</h1>
      <div className="h-75 w-75 d-inline-flex flex-column justify-content-center align-items-center">
        <div className="h-50 w-50">
          {simon[0] === true ? (
            <Button className="simonyellow h-100 w-50" />
          ) : (
            <Button
              className="simonblank h-100 w-50"
              onClick={(e) => handleClick(e, 0)}
            />
          )}
          {simon[1] === true ? (
            <Button className="simonblue h-100 w-50" />
          ) : (
            <Button
              className="simonblank h-100 w-50"
              onClick={(e) => handleClick(e, 1)}
            />
          )}
        </div>
        <div className="h-50 w-50">
          {simon[2] === true ? (
            <Button className="simonred h-100 w-50" />
          ) : (
            <Button
              className="simonblank h-100 w-50"
              onClick={(e) => handleClick(e, 2)}
            />
          )}
          {simon[3] === true ? (
            <Button className="simongreen h-100 w-50" />
          ) : (
            <Button
              className="simonblank h-100 w-50"
              onClick={(e) => handleClick(e, 3)}
            />
          )}
        </div>
      </div>
      {start ? (
        ""
      ) : (
        <Button className="simonyellow mt-2" onClick={(e) => startGame(e)}>
          Start Game
        </Button>
      )}
      {userTurn ? (
        <Button className="simonblue mt-2" onClick={() => setUserTurn(false)}>
          Finish Sequence
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Simon;
