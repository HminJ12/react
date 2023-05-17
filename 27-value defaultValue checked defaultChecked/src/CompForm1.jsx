import React, { useEffect, useState } from 'react';

const CompForm1 = () => {
  const [_input, _setInput] = useState('')

  const fnResetHandler = function(e){
    e.preventDefault()
    _setInput('')
    document.querySelector('.form1 input[type=radio]:first-child').checked = true
    document.querySelector('.form1 input[type=text]').value = ''
  }

  const fnInputHandler = function(e){
    _setInput(e.target.value)
  }

  useEffect(()=>{
    document.querySelector(`.form1 input[type=radio]:first-child`).checked = true //바닐라로 사용 가능
  },[])

  return (
    <form className='form1'>
      <fieldset>
        <legend>자바스크립트 문법 활용하기</legend>
        <p>
          <input value="1" type="radio" name='radio1'/>라디오1
          <input value="2" type="radio" name='radio1'/>라디오2
        </p>
        <p>
          <input onInput={fnInputHandler} type="text" />
        </p>
        <p>
          <button onClick={fnResetHandler}>초기화하기</button>
        </p>
        <p>
          {_input}
        </p>
      </fieldset>
    </form>
  );
};

export default CompForm1;

/* 
폼요소의 value속성은 값을 선택할 수 있는 양식에만 적용 가능
폼요소의 value속성을 값을 변경할 수 있는 양식에 적용하면 uncontrolled 값을 못 바꾸는 상태가 된다
폼요소의 checked속성 값을 지정하면 uncontrolled 상태가 됨
그래서 defaultValue를 사용한다
uncontrolled는 사용자가 값을 변경할 수 없는 상태를 말한다

defaultCheck나 defaultValue의 경우 상태 변화를 감지할 수 없음
defaultCheck나 defaultValue의 경우 상태 변화를 감지하려면 key값을 변경해줘야 한다(리랜더링하기 위해서)
*/