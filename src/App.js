import './App.scss';
import TTT from "./tictactoe/TTT"
import RPS from "./rockpaperscissors/RPS"
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
function App() {


  const [game, setGame] = useState("Menu")
  const [name, setName] = useState("Player 1")
  const [tempgame, setTempgame] = useState("TTT")
  const [tempname, setTempname] = useState("")

  useEffect(() => {
    console.log(name, game)
  }, [name, game])

  const handleSubmit = (e) => {
    e.preventDefault()
    setGame(tempgame)
    if (tempname !== ""){
    setName(tempname)
    }
  }

  return (
    <div className="root p-3">
      {game === "Menu" ? (
      <div className="w-100 h-100 d-inline-flex flex-column align-items-center">
      <h1 className="mt-5">GameHer</h1>
        <Form className="mt-5 w-50">
        <Form.Label>Enter your name</Form.Label>
        <Form.Control type="name" value={tempname} onChange={(e)=>setTempname(e.target.value)} placeholder={name} />
        <Form.Label>Select Game</Form.Label>
        <Form.Select value={tempgame} onChange={(e)=>setTempgame(e.target.value)} aria-label="Default select example">
          
          <option value="RPS">Rock Paper Scissors</option>
          <option value="TTT">Tic Tac Toe</option>
        </Form.Select>
        </Form>
        <Button className="mt-3" onClick={(e)=>handleSubmit(e)}>GO! Start Game</Button>
    </div>) : (game === "TTT" ? (<TTT name={name} />) : (<RPS name={name} />))  }
    </div>
  );
}

export default App;
