import { useState } from "react";
import CompBtn from "./components/CompBtn";
import CompOutput from "./components/CompOutput";

function App() {

  const [_show, _setShow] = useState(false)
  const [_showBtn, _setShowBtn] = useState(true)


  return (
    <>
      {_show && <CompOutput _setShowBtn={_setShowBtn} _setShow={_setShow}/>}

      <hr />

      {_showBtn&&<CompBtn _setShowBtn={_setShowBtn} _setShow={_setShow}/>}
    </>
  );
}

export default App;
