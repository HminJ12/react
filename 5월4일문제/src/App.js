import { useState } from "react";
import Comp from "./Comp";

for(let i = 1; i <= 10; i++){
  _arr.push(i)
}

function App() {
  const [_arr, _setArr] = useState([])  //빈배열 시작
  const fnClickHandler = function(){
    
    
  }
  return (
    <>
      <Comp/>
      <hr />
      <button onClick={fnClickHandler}>추가</button>
    </>
  );
}

export default App;
