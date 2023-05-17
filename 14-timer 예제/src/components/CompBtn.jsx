import React, { useContext } from 'react';
import { AppContext } from '../App';

const CompBtn = () => {
  const {_setSec, _disabled, _setDisabled, intervalID, _setRead, refInput} = useContext(AppContext)
  function fnTimerStartHandler(){
    refInput.current.value = ''
    _setDisabled(true)
    _setRead(true)
    intervalID.current = setInterval(()=>{
      _setSec(p => p - 1)
      /* console.log(_sec) setInterval 시작시점의 초기값만 확인할 수 있음 */
    },1000)
    
  }
  return (
    <button onClick={fnTimerStartHandler} disabled={_disabled}>
      타이머시작
    </button>
  );
};

export default CompBtn;