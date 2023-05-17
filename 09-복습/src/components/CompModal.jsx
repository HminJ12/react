import React from 'react';

const CompModal = ({_setShowModal, _setArrComp, _arrComp, _setArrPoint}) => {

  function fnResetHandler(){
    _setShowModal(false)
    
    //새배열 만들고 값을 변경해줘야 한다 key값에 v 배열을 줘서 값을 변경해야만 화면이 바뀐다, map을 사용해야 화면 갱신이 된다
    const arrComp = _arrComp.map(v=>v+1)

    _setArrComp(arrComp)
    _setArrPoint(new Array(5).fill('x')) //점수 새로 0점으로 갱신
  }
  return (
    <div className='modal'>
      <p>
        종료되었습니다 <br />
        <button onClick={fnResetHandler}>다시하기</button>
      </p>
    </div>
  );
};

export default CompModal;