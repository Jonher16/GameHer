import React from 'react'
import { useState } from 'react'
import Board from "./Board"

const TTT = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const handleClick = () => {
        console.log("Clicked")
    }
    
    return (
        <div className="d-inline-flex flex-column h-100 w-75 align-items-center border">
            <h1>Tic Tac Toe</h1>
            <Board squares={board} onClick={handleClick}/>
                
        </div>
    
    )
}

export default TTT
