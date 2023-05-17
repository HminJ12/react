import { useEffect, useState } from "react";
import CompBtn from "./CompBtn";
import CompOutput from "./CompOutput";
import CompTitle from "./CompTitle";

function App() {
  const [_n, _setN] = useState(0)

  useEffect(()=>{
    console.log('App Update');
  }) //뭔가 바뀔 때마다(state가 변경될 때마다)

  return (
    <>
      <CompTitle/>
      <hr />
      <CompOutput _n={_n}/>
      <hr />
      <CompBtn _setN={_setN}/>
    </>
  );
}

export default App;
