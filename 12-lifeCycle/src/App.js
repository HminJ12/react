import { useEffect, useState } from "react";
import CompTitle from "./CompTitle";
import CompOutput from "./CompOutput";
import Compbtn from "./Compbtn";
import CompInterval from "./CompInterval";

console.log(`App outside`);

function App() {
  console.log(`App inside 업데이트 시작`);
  const [_n, _setN] = useState(0)
  const [_show, _setShow] = useState(true)

  useEffect(()=>{
    console.log(`App inside 업데이트 완료`);
  })
  useEffect(()=>{
    document.querySelector(`.btn`).addEventListener(`click`,e=>{
      alert()
    })

  },[])

  return (
    <>
      <CompTitle/>
      <button className="btn">useEffect event binding</button>
      <hr />
      <CompOutput _n={_n}/>
      <Compbtn _setN={_setN}/>
      <hr />
      {_show && <CompInterval/>}
      <button onClick={e=>{_setShow(prev=>!prev)}}>인터벌토글</button>
    </>
  );
}

export default App;
