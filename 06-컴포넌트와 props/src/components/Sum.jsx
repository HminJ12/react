import React, { useRef, useState } from 'react';

let fnGetNum = () => Math.floor(Math.random()*10)


/* Components */
const Sum = (props) => { 

  const [_num1, _setNum1] = useState(fnGetNum())
  const [_num2, _setNum2] = useState(fnGetNum())
  const refInput = useRef()
  /* 값을 다 다르게 만들려고 */



  let fnSubmitHandler = function(e){
    e.preventDefault()
    let userNum = parseInt(refInput.current.value)
    if(_num1 + _num2 === userNum) props._setPoint(prev => prev + 1)
  } 

  return (
    <form onSubmit={fnSubmitHandler}>
      <span>{_num1}</span>
      +
      <span>{_num2}</span>
      =
      <input ref={refInput} type="number" min="0" max="20" required/> 
    </form>

  );
};

export default Sum;