import { createContext, useEffect, useState } from 'react';
import CompClock from './components/CompClock';
import './css/style.css';

let time = new Date()  //현재시각

export const AppContext = createContext()

function App() {
  const [_hour, _setHour] = useState(time.getHours())
  const [_min, _setMin] = useState(time.getMinutes())
  const [_sec, _setSec] = useState(time.getSeconds())
  const [_year, _setYear] = useState(time.getFullYear())
  const [_mon, _setMon] = useState(time.getMonth())
  const [_date, _setDate] = useState(time.getDate())
  const [_day, _setDay] = useState(time.getDay()) //0~6, 배열로 만들기 [일,월,화,,,]


  useEffect(()=>{
    setInterval(function(){
      time = new Date()
      _setHour(time.getHours())
      _setMin(time.getMinutes())
      _setSec(time.getSeconds())
    },1000)
  },[]) //앱 구동될 때 한번, 초기값만 호출이 가능하다

  return (
    <AppContext.Provider value={{_hour, _min, _sec, _year, _mon, _date, _day}}>
      <h1>리액트 시계</h1>
      <CompClock/>
    </AppContext.Provider>
  );
}

export default App;
