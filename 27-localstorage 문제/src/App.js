import { useState } from "react";

/* 로컬 함수를 만들거임
로컬 값이 있으면 리턴하고 없으면 1을 리턴하는 함수를 말한다
state를 직접 변경하지 않으면 함수를 밖에서 만든다 
공부 다시하기!!*/

const fnArr = function(){

}//fn



function App() {
  const [_n, _setN] = useState(()=>{
    const n = localStorage.getItem('n')
    if(n) {
      return parseInt(n)
    }else {
      localStorage.setItem( 'n', 1 )
      return 1
    }
  })

  const fnIncrease = function(){
    let n = _n
    _setN(++n)
   
    window.localStorage.setItem('n',n)
  }




  return (
    <>
    {_n}
    <hr />
    <button onClick={fnIncrease}>증가</button>
    </>
  );
}

export default App;
