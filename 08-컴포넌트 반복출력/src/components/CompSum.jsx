import React, { useState } from 'react';

let fnSetRandom = () => Math.floor(Math.random()*10)

const CompSum = ({_pointArr,_setPointArr,idx}) => {
  const [_num1, _setNum1] = useState(fnSetRandom())
  const [_num2, _setNum2] = useState(fnSetRandom())

  const fnInputHandler = function(e){
    let userNum = parseInt(e.target.value)
    let pointArr = [..._pointArr] //정답을 기록할 배열, 전개연산자를 이용해 다른 배열로 만들어야 한다

    if(_num1 + _num2 === userNum){ //정답이라면...
      pointArr[idx] = "정답" //배열의 몇 번째를 바꾸겠다
    }else{
      pointArr[idx] = "오답"
    }
    _setPointArr(pointArr) //배열을 바꾸겠다
  }

  return (
    <>
      <div>
        <span>{_num1}</span>
        +
        <span>{_num2}</span>
        =
        <input onInput={fnInputHandler} type="number" min="0" max="20" />
      </div>
      <hr />
    </>
  );
};

export default CompSum;