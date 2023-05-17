
import { useRef, useState } from "react";
import './css/style.css'

function App() {

  const [_num1, _setNum1] = useState(0)
  const [_num2, _setNum2] = useState(0)
  const [_cnt, _setCnt] = useState(5)
  const [_showModal, _setShowModal] = useState(false)
  const refInput1 = useRef()
  const refInput2 = useRef()


  const fnBtnHandler = function(e){
    e.preventDefault() 
    const num1 = parseInt(refInput1.current.value)
    const num2 = parseInt(refInput2.current.value)
    _setNum1(num1)
    _setNum2(num2)
    if(_cnt >= 2) _setCnt((prev) => {return prev - 1})
    else _setShowModal(true)
  }


  return (
    <>
      <h1>사칙연산</h1>
      <form>
        <input ref={refInput1} type="number" min="0" max="9"/>
        &nbsp;
        <input ref={refInput2} type="number" min="0" max="9"/>
        &nbsp;
        <button onClick={fnBtnHandler}>결과보기</button>
        &nbsp;
        남은 횟수 : {_cnt}회
      </form>
      <hr />
      <p>
        <b>덧셈</b> &nbsp;
        {_num1} + {_num2} = {_num1 + _num2}
      </p>
      <p>
        <b>뺄셈</b> &nbsp;
        {_num1} - {_num2} = {_num1 - _num2}
      </p>
      <p>
        <b>곱셈</b> &nbsp;
        {_num1} * {_num2} = {_num1 * _num2}
      </p>
      <p>
        <b>나눗셈</b> &nbsp;
        {_num1} / {_num2} = 
        {(_num2 !== 0)?_num1 / _num2 : '0으로는 숫자를 나눌 수 없어요'} 
        {/* 삼항연산자 또는 이항연산자를 사용해야 한다, 지금은 삼항연산자가 필요하다 */}
      </p>

      {
        (_showModal)&&<div className="modal">횟수를 다 사용하셨습니다</div>
      }
    </>
  );
}

export default App;
