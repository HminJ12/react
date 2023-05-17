import { createContext, useEffect, useState } from "react";
import CompResult from "./components/CompResult";
import CompUl from "./components/CompUl";
import CompModal from "./components/CompModal";
export const AppContext = createContext()

function App() {
  const liCnt = Math.ceil(Math.random()*3)+1 //state값을 변경하는데 state를 사용하는 것은 안 좋다, 변수를 하나 만들어서 사용한다

  const [_liCnt, _setLiCnt] = useState(liCnt) //배열 갯수 생성 state
  const [_ulKey, _setUlKey] = useState(1) 
  const [_pointArr, _setPointArr] = useState(new Array(liCnt).fill('x'))
  const [_showModal, _setShowModal] = useState(false)

  function fnResetHandler(){
    _setUlKey(p => p * -1)
    _setLiCnt(liCnt)
    _setPointArr(new Array(liCnt).fill('x'))
  }
  
  useEffect(()=>{
    console.log('app update');
    if((_pointArr.filter(v=>v==='o').length === _liCnt)){
      _setShowModal(true)
    }
    
  }) //업데이트 될 때마다

  return (
    <AppContext.Provider value={{_liCnt, _setLiCnt, _pointArr, _setPointArr, fnResetHandler, _setShowModal}}>
      <h1>더하기 문제</h1>
      <CompUl key={_ulKey}/>
      <hr />
      <CompResult/>
      <hr />
      <button onClick={fnResetHandler}>초기화</button>
      {(_showModal)&&<CompModal/>}
    </AppContext.Provider>
  );
} //_setUlKey(p => p*-1) 토글한다

export default App;
