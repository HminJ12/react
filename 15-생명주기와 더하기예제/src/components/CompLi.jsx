import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

const fnGetRandom = () => Math.floor(Math.random()*10) 
//함수는 갱신할 필요도 없고 달라지지 않기 때문에 밖에서 만든다, state를 절대 호출하지 않는다

const CompLi = ({i}) => {

  const {_pointArr, _setPointArr} = useContext(AppContext)
  const [_num1, _setNum1] = useState(fnGetRandom()) //list마다 각자 사용해야 해서 여기서 만든다
  const [_num2, _setNum2] = useState(fnGetRandom())
  const [_ox, _setOX] = useState('x') 

  function fnInputHandler(e){
    let userNum = parseInt(e.target.value)
    let pointArr = [..._pointArr]
    if(userNum === _num1 + _num2){ //해당문제가 정답일 경우
      _setOX('o')
      pointArr[i] = 'o' 
    }else{ //해당문제가 오답일 경우
      _setOX('x')
      pointArr[i] = 'x' 
    }
    _setPointArr(pointArr)
  }

  
  useEffect(()=>{
    console.log('----li update');
  }) //업데이트 될 때마다

  return (
    <li>
      <span>{_num1}</span>
      +
      <span>{_num2}</span>
      =
      <input onInput={fnInputHandler} type="number" min="0" max="18" />
      &nbsp;
      <b>{_ox}</b>
    </li>
  );
};

export default CompLi;