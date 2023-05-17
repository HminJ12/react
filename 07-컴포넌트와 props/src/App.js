import { useState } from "react";
import Sum from "./components/Sum";
import CompModal from "./components/CompModal";



function App() {

  const [_point, _setPoint] = useState(0)
  const [_showModal, _setShowModal] = useState(false)

  const fnModalHandler = function(){
    let point = 0
    let inputs = document.querySelectorAll(`form`)     
    inputs.forEach(v=>{
      let userNum = parseInt(v.querySelector(`.userNum`).value)
      let num1 = parseInt(v.querySelector(`.num1`).innerText)
      let num2 = parseInt(v.querySelector(`.num2`).innerText)
      if(num1 + num2 === userNum) _setPoint(prev => prev + 1) //++point
    })
    //_setPoint(point)
    _setShowModal(true)
  }

  return (
    <>
    <h1>더하기계산</h1>
    <hr />

    <Sum _setPoint={_setPoint} _point={_point}/>
    <hr />

    <Sum _setPoint={_setPoint} _point={_point}/>
    <hr />

    <Sum _setPoint={_setPoint} _point={_point}/>
    <hr />

    <Sum _setPoint={_setPoint} _point={_point}/>
    <hr />

    <Sum _setPoint={_setPoint} _point={_point}/>
    <hr />

    <button onClick={fnModalHandler}>점수확인</button>
    {/* 총점 state는 같이 써야 해서 여기서 만든다 */}

    {
      (_showModal)&&<CompModal _point={_point}/>
    }
    
    </>
  );
}

export default App;
