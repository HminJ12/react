import { createContext, useEffect, useRef, useState } from "react";
import CompBtn from "./components/CompBtn";
import CompOutput from "./components/CompOutput";
import CompInput from "./components/CompInput";

export const AppContext = createContext()

function App() {
  const [_sec, _setSec] = useState('--')
  const [_disabled, _setDisabled] = useState(true)
  const [_read, _setRead] = useState(false)
  const refInput = useRef()
  let intervalID = useRef()

  //화면이 업데이트될 때마다(화면이 변할 때마다)
  useEffect(()=>{
    if(_sec === 0) {
      _setDisabled(false)
      clearInterval(intervalID.current)
      _setRead(false)
      refInput.current.value = ''
    }
  })

  return (
  <AppContext.Provider value={{_sec, _setSec, _disabled, _setDisabled, intervalID, _read, _setRead, refInput}}>
      <h1>타이머(LifeCycle & setInterval)</h1>
      <hr />
      <CompOutput/>
      <hr />
      <CompInput/>
      <hr />
      <CompBtn/>
    </AppContext.Provider>
  );
}

export default App;
