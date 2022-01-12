import React from 'react'

const PlayerDisplay = ({img, choice, player}) => {
    return (
        <div className="w-50 h-100 d-inline-flex flex-column align-items-center">
            <div className="h-50">
           <img className="img-fluid h-100 w-100" src={img} alt="choice" />
           </div>
           <div className=" h-50 w-100 d-inline-flex align-items-center flex-column justify-content-center">
           <h3>{player}'s choice:</h3>
           <h3> {choice}</h3>
           </div>
        </div>
    )
}

export default PlayerDisplay
