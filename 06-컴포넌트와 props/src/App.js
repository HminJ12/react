import { useState } from "react";
import Sum from "./components/Sum";




function App() {

  const [_point, _setPoint] = useState(0)

  return (
    <>
    <h1>더하기계산</h1>
    <hr />

    <Sum _setPoint={_setPoint}/>
    <hr />

    <Sum _setPoint={_setPoint}/>
    <hr />

    <Sum _setPoint={_setPoint}/>
    <hr />

    <Sum _setPoint={_setPoint}/>
    <hr />

    <Sum _setPoint={_setPoint}/>
    <hr />

    총점 : {_point}
    {/* 총점 state는 같이 써야 해서 여기서 만든다 */}
    </>
  );
}

export default App;
