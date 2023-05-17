import React, { useContext } from 'react';
import { AppContext } from '../App';

const CompInput = () => {
  const {_setSec, _setDisabled, _read, refInput} = useContext(AppContext)
  
  function fnInputHandler(e){
    if(e.target.value === ''){
      _setSec('--')
      _setDisabled(true)
    }else{
      _setSec(parseInt(e.target.value))
      _setDisabled(false)
    }
  }

  return (
    <input ref={refInput} onInput={fnInputHandler} type="number" readOnly={_read} />
  );
};

export default CompInput;