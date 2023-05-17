import { useCallback, useEffect, useState } from "react";
import CompBtn from "./CompBtn";
import CompOutput from "./CompOutput";
import CompTitle from "./CompTitle";

function App() {
  const [_n, _setN] = useState(0)

  const fnIncrease = useCallback(function(){
    /* 복잡한 함수를 이용해 n을 변경한다는 가정 */
    _setN(p => p + 1)
  },[])  //[]디펜더시를 꼭 달아줘야 한다, React.memo와 같이 사용해야 한다!

  useEffect(()=>{
    console.log('App Update');
  }) //뭔가 바뀔 때마다(state가 변경될 때마다)

  return (
    <>
      <CompTitle/>
      <hr />
      <CompOutput _n={_n}/>
      <hr />
      <CompBtn fnIncrease = {fnIncrease}/>
    </>
  );
}

export default App;
