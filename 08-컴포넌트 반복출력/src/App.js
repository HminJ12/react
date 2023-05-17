import { useState } from "react";
import CompModal from "./components/CompModal";
import CompSum from "./components/CompSum";

let arrComp = []
for(let i = 0; i < 5; i++){
  arrComp.push(i) //[0,1,2,3,4] 컴포넌트 반복하려고
}

function App() {
  const [_pointArr, _setPointArr] = useState(new Array(5).fill('')) //길이가 5인 빈 배열을 만들겠다 ['','','','','']
  const [_arrComp, _setArrComp] = useState(arrComp)
  const [_showModal, _setShowModal] = useState(false)


  return (
    <>
      <h1>더하기문제</h1>
      <hr />

      {
        _arrComp.map((v,idx) => {
          return <CompSum key={v} idx={idx} _pointArr={_pointArr} _setPointArr={_setPointArr}/>
        })
      } 
      {/* 
      반복문 {}중괄호 안에 최종적으로 변수는 하나만 들어가야 한다, 
      배열을 이용해 반복문을 쓴다 무조건 key를 만들어야 한다
      key값에 i로 쓰면 안 된다, key값에 v 배열을 넣었다
      */}


      <CompModal _pointArr={_pointArr}/> 
      {/* 출력하려고 _pointArr */}
    </>
  );
}

export default App;
