import { useMemo, useState } from "react";
import CompSub from "./CompSub";
import CompSum from "./CompSum";

function App() {
  const [_n1, _setN1] = useState(1)
  const [_n2, _setN2] = useState(1)

  const fn1 = function(n){
    console.log('fn1이 실행됨');
    let result = n
    for(let i = 1; i < 1000000; i++){
      result += 1
    }
    return result
  }
  let n1 = useMemo(()=>{return fn1(_n1)},[_n1]) //_n1 함수가 변경될 때만 변해라

/* ---------------------------------- */
  const fn2 = function(n){
    console.log('fn2이 실행됨');
    let result = n
    for(let i = 1; i < 1000000; i++){
      result -= 1
    }
    return result
  }
  let n2 = useMemo(()=>{return fn2(_n2)},[_n2])


  return (
    <>
      <CompSum n1={n1} _setN1={_setN1}/>
      <hr />
      <CompSub n2={n2} _setN2={_setN2}/>
    </>
  );
}

export default App;
