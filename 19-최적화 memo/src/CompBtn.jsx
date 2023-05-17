import React, { useEffect } from 'react';

const CompBtn = ({_setN}) => {

  function fnIncrease(){
    _setN(p => p + 1)
  }

  useEffect(()=>{
    console.log('--Button Update');
  }) //뭔가 바뀔 때마다(state가 변경될 때마다)

  return (
    <button onClick={fnIncrease}>1씩증가</button>
  );
};

export default React.memo(CompBtn);