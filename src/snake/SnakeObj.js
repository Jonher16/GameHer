import React from 'react';

const SnakeObj = (props) => {
  return (
  <div>
      {props.snakedots.map((dot,i)=>{

          const style = {
              left: `${dot[0]}%`,
              top: `${dot[1]}%`
          }
          return(
            <div className="snakedot" key={i} style={style} />
          )
      })}
        
  </div>);
};

export default SnakeObj;
