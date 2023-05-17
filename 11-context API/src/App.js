import { createContext, useState } from "react";
import CompResult from "./components/CompResult";
import CompUl from "./components/CompUl";

export const AppContext = createContext()

const fnChangePoint = function(arr){
  return arr.filter(v => v==='o').length
}

function App() {
  
  const [_pointArr, _setPointArr] = useState(new Array(3).fill('x'))
  const [_readOnly, _setReadOnly] = useState(false)
  const [_showBtn, _setShowBtn] = useState(false)
  const [_reset, _setReset] = useState(true) //key값으로 사용하려고 토글로 사용해야 한다
  const [_style, _setStyle] = useState('#FFF')

  return (
    <AppContext.Provider value={{
      _pointArr, _setPointArr, fnChangePoint, _setReadOnly, _readOnly, _setShowBtn, _reset, _setStyle, _style
    }}>
      <h1>Context</h1>
      <hr />
      <CompUl/>
      <hr />
      <CompResult/>
      {(_showBtn)&&<button onClick={e=>{_setReset(p => !p);_setReadOnly(false);_setPointArr(new Array(3).fill('x')); _setStyle('#FFF')}}>다시시작하기</button>}
    </AppContext.Provider>
  );
}

export default App;
