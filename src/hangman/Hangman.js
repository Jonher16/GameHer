import React, { useState } from "react";
import { Button } from "react-bootstrap";
import LetterButton from "./LetterButton";
import body from "./img/body.png"
import head from "./img/head.png"
import hang from "./img/hang.png"
import arm from "./img/left_arm.png"
import leg from "./img/left_leg.png"
const Hangman = () => {
  const words = ["MINIGAMES", "JAVASCRIPT", "REACT", "HANGMAN", "BOOTSTRAP"];
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [start, setStart] = useState(false);
  const [word, setWord] = useState("");
  const [secretword, setSecretWord] = useState("")
  const [errors, setErrors] = useState(0)
  const [visibleParts, setVisibleParts] = useState(["visible", "hidden", "hidden", "hidden" ,"hidden", "hidden" ,"hidden"])
  const [outcome, setOutcome] = useState("")

  const startGame = (e) => {
    setOutcome("")
    setErrors(0)
    e.preventDefault();
    setWord("")
    setVisibleParts(["visible", "hidden", "hidden", "hidden" ,"hidden", "hidden" ,"hidden"])
    setStart(true);
    let selWord = getRandomWord();
    printWord(selWord);
    setSecretWord(selWord)
  };

  const handleClick = (letter) => {
    var temperrors = errors
    
    let checkletter = checkLetter(letter)
    if (checkletter.isInString === false){
      temperrors++
      printHangman(temperrors)
    }
    else {

      checkWin(checkletter.wordstring)
    }
  }

  function checkWin(tempword){
    let tempsword = secretword
    tempword = tempword.replaceAll(" ","")

    console.log("Palabra: ",tempsword)
    console.log("Por ahora: ",tempword)
    if(tempsword === tempword){
      setStart(false)
      setOutcome(`The word was: ${tempword}. You won!`)
    }
  }

  function printHangman(temperrors){
    setErrors(temperrors)
    let tempvisibleparts = visibleParts
    tempvisibleparts[temperrors] = "visible"
    setVisibleParts(tempvisibleparts)
    if (temperrors === 6){
      setStart(false)
      setOutcome("You lost!")
    }
  }

  function checkLetter(letter){
    let wordarray = word.split(" ")
    let isInString = false
    console.log(wordarray)
    let swordarray = secretword.split("")
    console.log(swordarray)
    for (let i=0;i<swordarray.length;i++){
      if(swordarray[i] === letter){
        wordarray[i] = letter
        isInString = true
      }
    }
    let wordstring = wordarray.join(" ")
    setWord(wordstring)
    return {isInString, wordstring}
  }

  function getRandomWord() {
    let min = 0;
    let tempwords = words;
    let max = tempwords.length - 1;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log(random)
    return words[random];
  }

  function printWord(word) {
    //console.log(word);
    let string = "_ ";
    console.log(string.repeat(word.length));
    setWord(string.repeat(word.length));
  }

  return (
    <div className="h-100 w-100 d-inline-flex flex-column align-items-center">
      <h1>Hangman</h1>

      <div className="h-75 w-75 d-inline-flex flex-column justify-content-center align-items-center border ">
        <img fluid className="stand" alt="stand" style={{visibility: `${visibleParts[0]}`}} src={hang} />
        <img className="head" alt="head" src={head} style={{visibility: `${visibleParts[1]}`}} />
        <img className="body" alt="body" src={body} style={{visibility: `${visibleParts[2]}`}} />
        <img className="left_arm" alt="left arm" style={{visibility: `${visibleParts[3]}`}} src={arm} />
        <img className="right_arm" alt="right arm" style={{visibility: `${visibleParts[4]}`}} src={arm} />
        <img className="left_leg" alt="left leg" style={{visibility: `${visibleParts[5]}`}} src={leg} />
        <img className="right_leg" alt="right leg" style={{visibility: `${visibleParts[6]}`}} src={leg} />
        
      </div>

      {start ? (
        <>
          <h1>{word}</h1>
          <div className="keyboard m-2">
            {letters.map((letter) => (
              <LetterButton key={letter} disabled={false} letter={letter} onClick={handleClick}/>
            ))}
          </div>
        </>
      ) : (
        <Button className="simonyellow mt-3" onClick={(e) => startGame(e)}>
          Start Game
        </Button>
      )}
      <h1>{outcome}</h1>
    </div>
  );
};

export default Hangman;
