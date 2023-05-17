import React from 'react';

const CompModal = ({_setShowUl, _setPoint, _setShowModal}) => {
  function fnResetHandler(){
    _setShowUl(true)
    _setShowModal(false)
    _setPoint(new Array(3).fill('x'))
  }
  return (
    <div>
      <p>
        수고하셨습니다 <br />
        <button onClick={fnResetHandler}>재시작</button>
      </p>
    </div>
  );
};

export default CompModal;