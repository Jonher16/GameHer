import React from 'react';
import { Button } from 'react-bootstrap';

const LetterButton = ({letter, onClick, dis}) => {
  return <Button className="letterbutton" disabled={dis} variant="primary" onClick={()=>{dis = true; onClick(letter)}}>{letter}</Button>
};

export default LetterButton;
