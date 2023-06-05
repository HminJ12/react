import React, { useContext, useEffect, useState } from 'react';
import { fnDDayArrInit, fnGetDateInfo, fnTimer } from '../../js/dday';
import { DDayContext } from './CompDDay';



const CompListItem = ({ item }) => {

  const {_ddayArr, _setDdayArr, _ddayOutputArr, _setDdayOutputArr} = useContext(DDayContext)
  const [_remainDays, _setRemainDays] = useState(0)
  const [_remainHours, _setRemainHours] = useState(0)
  const [_remainMinutes, _setRemainMinutes] = useState(0)
  const [_remainSeconds, _setRemainSeconds] = useState(0)

  const [_stroke1,_setStroke1] = useState(300)
  const [_stroke2,_setStroke2] = useState(24)
  const [_stroke3,_setStroke3] = useState(60)
  const [_stroke4,_setStroke4] = useState(60)

  const [_isActive, _setIsActive] = useState('')
  const [_isDeActive, _setIsDeActive] = useState('')


  //item은 props로 내려받은 객체를 구조분해 {id, title, dday}
  const { id, title, dday } = item
  const { day, year, month, date, ap, hour, min, sec, timeStamp } = fnGetDateInfo(dday)

  const fnTimerSetState = function () {
    let { remainDays, remainHours, remainMinutes, remainSecs } = fnTimer(timeStamp)
    if(!remainDays && !remainHours && !remainMinutes && !remainSecs) _setIsDeActive('deactive')
    _setRemainDays(remainDays)
    _setRemainHours(remainHours)
    _setRemainMinutes(remainMinutes)
    _setRemainSeconds(remainSecs)
    _setStroke1(remainDays)
    _setStroke2(remainHours)
    _setStroke3(remainMinutes)
    _setStroke4(remainSecs)
  }

  const fnMouseDownHandler = function(){
    _setIsActive('active')

  }

  const fnDelHandler = function(){
    if(window.confirm('DDay목록을 삭제하시겠습니까?')){
      const ddayArr = _ddayArr.filter(v => v.id !== id)
      _setDdayArr(ddayArr)
      _setDdayOutputArr(ddayArr)
      localStorage.setItem('ddayArrStorage',JSON.stringify(ddayArr)) //_ddayArr로 저장은 불가능하다 set은 다음 화면에 바뀐다는 의미이다
      //삭제하려면 무조건 배열을 바꿔야 한다
      //원본을 복제 .filter , 여기서는 _ddayArr를 filter 하면 이미 새로운 배열이 나오기 때문에 복제를 할 필요가 없다
    }else{
      _setIsActive('')
    }
  }

  useEffect(() => {
    fnTimerSetState()
    let intervalID
    intervalID = setInterval(() => {
      fnTimerSetState()
    }, 1000)
    return (() => {
      clearInterval(intervalID)
    })
  }, [])

  return (
    <li className={_isActive+' '+_isDeActive} onMouseDown={fnMouseDownHandler} onClick={fnDelHandler}>
      <div className='meta'>
        <h3>{title}</h3>
        <p>
          <time className='date'>
            <em>{year}</em>-
            <em>{month}</em>-
            <em>{date}</em>-
            <small>{day}</small>
          </time>
          <time className='time'>
            <small>{ap}</small>
            <em>{hour}</em>:
            <em>{min}</em>:
            <em>{sec}</em>
          </time>
        </p>
      </div>
      <ul className='timer-output'>
        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="300" strokeDasharray="300" strokeDashoffset={_stroke1}/>
            </svg>
            <figcaption>{_remainDays}</figcaption>
          </figure>
          <p>
            <em>day</em>
            <small>0~300</small>
          </p>
        </li>

        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="24" strokeDasharray="24" strokeDashoffset={_stroke2}/>
            </svg>
            <figcaption>{_remainHours}</figcaption>
          </figure>
          <p>
            <em>hour</em>
            <small>0~24</small>
          </p>
        </li>

        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="60" strokeDasharray="60" strokeDashoffset={_stroke3}/>
            </svg>
            <figcaption>{_remainMinutes}</figcaption>
          </figure>
          <p>
            <em>min</em>
            <small>0~60</small>
          </p>
        </li>

        <li>
          <figure>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
              <circle cx="50" cy="50" r="47" pathLength="60" strokeDasharray="60" strokeDashoffset={_stroke4}/>
            </svg>
            <figcaption>{_remainSeconds}</figcaption>
          </figure>
          <p>
            <em>sec</em>
            <small>0~60</small>
          </p>
        </li>
      </ul>
    </li>
  );
};

export default CompListItem;