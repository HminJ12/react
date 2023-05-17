import React, { useRef, useState } from 'react';

let fnGetNum = () => Math.floor(Math.random()*10)


/* Components */
const Sum = ({_setPoint , _point}) => { 

  const [_num1, _setNum1] = useState(fnGetNum())
  const [_num2, _setNum2] = useState(fnGetNum())
  const refInput = useRef()
  /* 값을 다 다르게 만들려고 */

  

  let fnSubmitHandler = function(e){
    e.preventDefault()
    //엔터 쳤을 때 새로고침 막는 기능
    /* 
    let userNum = parseInt(refInput.current.value)
    if(_num1 + _num2 === userNum) _setPoint(prev => prev + 1) 
    */
    
  } 

  let fnInputHandler = function(e){
    /* let userNum = parseInt(e.target.value) */
    
  }

  return (
    <form onSubmit={fnSubmitHandler}>
      <span className='num1'>{_num1}</span>
      +
      <span className='num2'>{_num2}</span>
      =
      <input className='userNum' onChange={fnInputHandler} ref={refInput} type="number" min="0" max="20" required/> 
    </form>

  );
};

export default Sum;