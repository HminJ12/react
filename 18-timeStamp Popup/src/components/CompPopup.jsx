import React, { useState } from 'react';

const CompPopup = ({_setShow}) => {

  const [_chk, _setChk] = useState(false)

  function fnCheckHandler(e){
    _setChk(e.target.checked)
  }

  function fnClosePopupHandler(){
    if(_chk === true){ //오늘 하루 열지않기를 체크했을 경우
      window.localStorage.setItem('expires',Date.now()+(24*60*60*1000)) //클릭한 지금 이 순간에 하루를 더한 것을 기록
    }
    _setShow(false)
  }

  return (
    <div className='popup'>
      <h2>팝업창</h2>
      <p>
        <input onChange={fnCheckHandler} type="checkbox" name="" id="" />
        오늘 하루 이 창 열지 않기
      </p>
      <button onClick={fnClosePopupHandler}>닫기</button>
    </div>
  );
};

export default CompPopup;