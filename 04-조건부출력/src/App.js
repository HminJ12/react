import { useRef, useState } from "react";

function fnGetRandom () {
  return Math.floor(Math.random()*10)
}

function App() {
  const [_num1, _setNum1] = useState(fnGetRandom ())
  const [_num2, _setNum2] = useState(fnGetRandom ())
  const [_point, _setPoint] = useState(0)
  const [_showGreen, _setShowGreen] = useState(false)
  const [_showRed, _setShowRed] = useState(false)
  const refInput = useRef()

  function fnOnSubmitHandler(e){
    e.preventDefault()
    let userNum = parseInt(refInput.current.value)
    if(_num1 + _num2 === userNum){
      if(_point <= 3){
        _setPoint(p => p + 1)
        _setNum1(fnGetRandom ())
        _setNum2(fnGetRandom ())
      }else{
        _setShowGreen(true)
      } //점수 if문
      
    }else{
      if(_point >= 1){
        _setPoint(p => p - 1)
      }else{
        _setShowRed(true)
      }
    } //정오답 조건문

    refInput.current.value = ' '
  }

  function fnCloseHandler(){
    _setPoint(0)
    _setNum1(fnGetRandom ())
    _setNum2(fnGetRandom ())
    _setShowGreen(false)
    _setShowRed(false)
  }

  return (
    <>
    <h1>더하기연습</h1>
    <form onSubmit={fnOnSubmitHandler}>
      <span>{_num1}</span>
      +
      <span>{_num2}</span>
      =
      <input ref={refInput} type="number" min="0" max="20"/>
      <button style={{display:'none'}}></button>
    </form>
    <p>점수 : {_point} 점</p>
    {
      (_showGreen)&&
      <div className="modal modal-green">
        <p>5점 만점입니다</p>
        <button onClick={fnCloseHandler}>다시시작하기</button>
      </div> //이항연산자
    }
    
    {
      (_showRed)&&
      <div className="modal modal-red">
        <p>빵점입니다</p> 
        <button onClick={fnCloseHandler}>다시시작하기</button>
      </div>
    }

    </>
  );
}

export default App;
