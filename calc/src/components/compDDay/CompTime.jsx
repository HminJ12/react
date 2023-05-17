import React from 'react';
import { useState } from 'react';
import { fnGetDateInfo } from '../../js/dday';
import { useEffect } from 'react';



const CompTime = () => {
  const [_day, _setDay] = useState()
  const [_year, _setYear] = useState()
  const [_month, _setMonth] = useState()
  const [_date, _setDate] = useState()
  const [_ap, _setAp] = useState()
  const [_hour, _setHour] = useState()
  const [_min, _setMin] = useState()
  const [_sec, _setSec] = useState()

  const fnSetState = function (){
    const { day, year, month, date, ap, hour, min, sec } = fnGetDateInfo(new Date())
    _setDay(day)
    _setYear(year)
    _setMonth(month)
    _setDate(date)
    _setAp(ap)
    _setHour(hour)
    _setMin(min)
    _setSec(sec)
  }

  useEffect(() => {
    fnSetState() //함수로 만든 이유는 두번 사용하기 때문에 만듦
    let intervalID
    intervalID = setInterval(()=>{
      fnSetState()
    },1000) //1초에 한번씩

    return(()=>{
      clearInterval(intervalID)
    }) //cleanUp
  }, []) //화면에 나타날 때 딱 한번, dday 클릭했을 때 그 순간

  return (
    <div className='now'>
      <time>
        <small>{_day}</small>
        <b>{_year}</b>-
        <b>{_month}</b>-
        <b>{_date}</b>
      </time>
      <time>
        <small>{_ap}</small>
        <b>{_hour}</b>:
        <b>{_min}</b>:
        <b>{_sec}</b>
      </time>
    </div>
  );
};

export default CompTime;