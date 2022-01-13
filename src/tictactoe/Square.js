import React from 'react'
import { Button } from 'react-bootstrap'

const Square = (props) => {
    return (
        <Button className="square" onClick={props.onClick}>{props.value}</Button>
    )
}

export default Square
