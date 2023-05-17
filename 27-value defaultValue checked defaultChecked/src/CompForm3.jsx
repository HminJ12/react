import React, { useEffect, useState } from 'react';
import { fnSetObj } from './fn';



const CompForm3 = () => {
  const [_input, _setInput] = useState('')
  const [_chkObj, _setChkObj] = useState(fnSetObj(1)) //fnSetObj() 값을 받아온다

  const fnSubmitHandler = function(e){
    e.preventDefault()
    _setInput('')
    _setChkObj(fnSetObj(1))
  }

  const fnInputHandler = function(e){
    _setInput(e.target.value)
  }

  const fnChangeHandler = function(e){
    _setChkObj(fnSetObj(e.target.value))
  }



  return (
    <form onSubmit={fnSubmitHandler}>
      <fieldset>
        <legend>default 속성 활용하기</legend>
        <p>
          <input onChange={fnChangeHandler} value={1} checked={_chkObj[1]} type="radio" name='radio1'/>라디오1
          <input onChange={fnChangeHandler} value={2} checked={_chkObj[2]} type="radio" name='radio1'/>라디오2
        </p>
        <p>
          <input onInput={fnInputHandler} value={_input} type="text" />
        </p>
        <p>
          <button>초기화하기</button>
        </p>
        <p>
          {_input}
        </p>
      </fieldset>
    </form>
  );
};

export default CompForm3;

/* 
const arr = ['홍길동', '아무개']일 때
arr[무조건 숫자를 넣어야함]
arr['홍길동'] ->에러가 난다

const obj = {'사람1':'홍길동', '사람2':'아무개'}
obj['사람1'] obj['문자열']
obj[key값]


*/