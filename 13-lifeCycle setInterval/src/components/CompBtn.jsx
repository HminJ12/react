import React from 'react';

const CompBtn = ({_setShow, _setShowBtn}) => {

  function fnShowBtnHandler(){
    _setShow(true)
    _setShowBtn(false)
  }

  return (
    <button onClick={fnShowBtnHandler}>시작</button>
  );
};

export default CompBtn;