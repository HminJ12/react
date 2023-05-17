import { useState } from "react";
import { useEffect } from "react";

function fnGetDDay(dday,now){
  let diff = dday - now //남은 시간을 밀리세컨드로 계산
  let remainSec = parseInt(diff / 1000) //남은 시간을 초로 바꾼 거
  let date = Math.floor(remainSec / (24*60*60)) //남은 날짜 구하는 거 24시간을 초로 환산해서 계산
  remainSec = remainSec % (24*60*60) //일로 나누고 남은 나머지 초
  let hour = Math.floor(remainSec / (60*60)) //남은 시간 구하기
  remainSec = remainSec % (60*60) //시간으로 나누고 남은 나머지 초
  let min = Math.floor(remainSec / 60) //남은 분 구하는 거
  let sec = remainSec % 60 //남은 초
  
  return {date, hour, min, sec}
}

function App() {
  /*   
  const day = new Date() 현재
  console.log(day.getTime());
  */
  let timeStamp = Date.now() //지금 1000분의 1초 밀리세컨드로 표시해줌
  const dDayTimeStamp = new Date(2023,3,26).getTime() //강제로 원하는 날짜 적기

  const [_date, _setDate] = useState()
  const [_hour, _setHour] = useState()
  const [_min, _setMin] = useState()
  const [_sec, _setSec] = useState()

  function fnSetDday(){
    const {date, hour, min, sec} = fnGetDDay(dDayTimeStamp,timeStamp)
    _setDate(date)
    _setHour(hour)
    _setMin(min)
    _setSec(sec)
  }


  useEffect(()=>{
    let intervalID
    fnSetDday() //시작하자마자 한번

    intervalID = setInterval(()=>{
      timeStamp = Date.now()
      fnSetDday()
    },1000) //1초에 한번씩 업데이트 시키기
    return (()=>{ //cleanUp
      clearInterval(intervalID)
    })
  },[]) //처음에 앱이 딱 한번 실행
  
  return (
    <>
      <h1>dDay</h1>
      <p>{_date}일:{_hour}시간:{_min}분:{_sec}초</p>
    </>
  );
}

export default App;
