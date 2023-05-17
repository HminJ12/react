import React, { useState } from 'react';

const fnGetRandom = () => Math.floor(Math.random()*10)

const CompSumLi = ({_setShowUl, _setShowModal, _setPoint, _point, idx}) => {
  const [_num1,_setNum1] = useState(fnGetRandom())
  const [_num2,_setNum2] = useState(fnGetRandom())

  function fnInputHandler(e){
    let arr = [..._point]
    arr[idx] = (_num1 + _num2 === parseInt(e.target.value))? 'o':'x'
    _setPoint(arr) //화면을 바꾸겠다, 다음에 화면을 바꾸겠다 
    _setShowModal((arr.filter(v=> v==='o').length===3) && true)
    _setShowUl((arr.filter(v=> v==='o').length!==3) && true) 
    //_setShowUl((arr.filter(v=> v==='o').length!==3) || false) 앞에 조건이 거짓일 때 뒤에 값 false를 return한다 
  }

  return (
    <li>
      <b>{idx}) </b>
      <span>{_num1}</span>
      +
      <span>{_num2}</span>
      =
      <input onInput={fnInputHandler} type="number" min="0" max="20" />
    </li>
  );
};

export default CompSumLi;