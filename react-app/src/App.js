import { useEffect } from "react";
import { useState } from "react";

function fnGetDDay(dday,now){
  let diff = dday - now //남은 시간을 밀리세컨드로 계산
  let remainSec = parseInt(diff / 1000) //남은 시간을 초로 바꾼 거

  let year = Math.floor(remainSec / (24*60*60*365))
  remainSec = remainSec % (24*60*60*365)
  let month = Math.floor(remainSec / (24*60*60*30))
  remainSec = remainSec % (24*60*60*30)
  let date = Math.floor(remainSec / (24*60*60)) //남은 날짜 구하는 거 24시간을 초로 환산해서 계산
  remainSec = remainSec % (24*60*60) //일로 나누고 남은 나머지 초
  let hour = Math.floor(remainSec / (60*60)) //남은 시간 구하기
  remainSec = remainSec % (60*60) //시간으로 나누고 남은 나머지 초
  let min = Math.floor(remainSec / 60) //남은 분 구하는 거
  let sec = remainSec % 60 //남은 초
  
  return {year, month, date, hour, min, sec}
}

function App() {
  const [_year, _setYear] = useState()
  const [_month, _setMonth] = useState()
  const [_date, _setDate] = useState()
  const [_hour, _setHour] = useState()
  const [_min, _setMin] = useState()
  const [_sec, _setSec] = useState()

  let timeStamp = Date.now()
  const dDayTimeStamp = new Date(2023,5,20).getTime()

  function fnSetDday(){
    const {year, month, date, hour, min, sec} = fnGetDDay(dDayTimeStamp,timeStamp)
    _setYear(year)
    _setMonth(month)
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
      <p>
        2023년 6월 20일까지 <br />
        {_year}년, {_month}개월, {_month}일, {_hour}시간, {_min}분, {_sec}초가 남았습니다.
      </p>
    </>
  );
}

export default App;
