import { useState } from "react";
import CompSum from "./components/CompSum";
import CompModal from "./components/CompModal";
//let arrComp = ['가','나','다','라','마']

function App() {
  const [_arrPoint, _setArrPoint] = useState(new Array(5).fill('x')) //['x','x','x','x','x']
  const [_showModal, _setShowModal] = useState(false)
  const [_arrComp, _setArrComp] = useState(['가','나','다','라','마'])
  return (
    <>
      <h1>더하기연습</h1>
      {
        _arrComp.map((v,idx) => <CompSum _setShowModal={_setShowModal} key={v} idx={idx} _arrPoint={_arrPoint} _setArrPoint={_setArrPoint}/>)
      }

      <p>
        {_arrPoint.filter(v => v==='o').length}점
      </p>
      
      {(_showModal) && <CompModal _setShowModal={_setShowModal} _setArrComp={_setArrComp} _arrComp={_arrComp} _setArrPoint={_setArrPoint}/>}

    </>
  );
}

export default App;
