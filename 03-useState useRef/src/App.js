
import { useRef, useState } from "react";
  Math.floor(Math.random()*10)
let fnGetRandom = () =>Math.floor(Math.random()*10)

function App() {

  const [_num1, _setNum1] = useState(fnGetRandom())
  const [_num2, _setNum2] = useState(fnGetRandom())
  const [_result, _setResult] = useState(' ')
  const [_point, _setPoint] = useState(0)
  const [_bg, _setBg] = useState('none')
  const refInput = useRef()

  /* 
  document.querySelector('form'),addEventListener(`submit`,e=>{
    e.preventDefault()
    alert()
  }) 
  */
  

  function fnSubmit(e){
    e.preventDefault()
    let userNum = parseInt(refInput.current.value)
    if(_num1*_num2 === userNum){
      _setResult('정답')
      _setNum1(fnGetRandom())
      _setNum2(fnGetRandom())
      _setPoint(prev => prev + 1) //lazy initialze 게으른 초기화, 한박자 늦다
      _setBg('none')
    }else{
      _setResult('오답')
      _setBg('red')
      if(_point >= 1){
        _setPoint(prev => prev - 1)
      }

    }

    refInput.current.value = '  '
  }

  return (
    <>
    <h1>구구단연습</h1>
    <form onSubmit={fnSubmit} style={{background:_bg}}>
      <input value={_num1} min="0" max="9" type="number" readOnly/>
      *
      <input value={_num2} min="0" max="9" type="number" readOnly/>
      =
      <input ref={refInput} type="number" min="0" max="99" />
      <button style={{display:'none'}}>결과보기</button>
    </form>
    <p className="output">결과: {_result}, 점수: {_point}점</p>
    </>
  );
}

export default App;
