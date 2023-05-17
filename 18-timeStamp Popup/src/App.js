import { useEffect, useState } from "react";
import CompPopup from "./components/CompPopup";


function App() {
  const [_show, _setShow] = useState(true)
  
  useEffect(()=>{
    if(window.localStorage.getItem('expires')){
      if(Date.now() < parseInt(window.localStorage.getItem('expires'))){ //앱이 실행된 시간으로부터 팝업 유효기간이 지나지 않았더라면 , 접속한 순간
        _setShow(false) //조건문, 팝업 유효기간이 존재한다면 팝업을 숨긴다
      }else{
        _setShow(true) //팝업을 보여준다
        window.localStorage.removeItem('expires')
      }
    }
  },[]) //setShow를 결정해야 한다, 시작할 때 한번

  return (
    <>
      <h1>유효기간 팝업</h1>
      {(_show)&&<CompPopup _setShow={_setShow}/>}
    </>
  );
}

export default App;
