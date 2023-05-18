import React, { useState } from 'react';
import { useContext } from 'react';
import { DDayContext } from './CompDDay';



const CompAdd = () => {
  const [_title,_setTitle] = useState('')
  const [_date,_setDate] = useState('')
  const [_time,_setTime] = useState('00:00')

  const {_showComp, _setShowComp, _ddayArr, _setDdayArr,  _ddayOutputArr, _setDdayOutputArr, } = useContext(DDayContext)

  const fnSubmitHandler = function(e){
    e.preventDefault()
    let dday = new Date(`${_date}T${_time}`) //사용자가 입력한 yyyy-mm-ddT00:00양식
    let ddayStamp = parseInt(dday.getTime() / 1000)
    let nowStamp = parseInt(Date.now() / 1000)


    if(ddayStamp < nowStamp){
      alert('과거 시점은 DDay로 설정하실 수 없습니다')
    }else if((ddayStamp - nowStamp)/(60*60*24) > 300){
      alert('300일 이후 시점은 DDay로 설정하실 수 없습니다')
    }
    
    if(ddayStamp < nowStamp || (ddayStamp - nowStamp)/(60*60*24) > 300){
      _setDate('')
      _setTime('00:00')
      return false
    }

    let ddayObj = {
      id : Date.now(),
      title : _title,
      dday : `${_date}T${_time}`, //글자만 넣어서 날짜로 변경
    }

    const ddayArr = [ddayObj,..._ddayArr]
    _setDdayArr(ddayArr)
    _setDdayOutputArr(ddayArr)
    localStorage.setItem('ddayArrStorage', JSON.stringify(ddayArr))
    _setShowComp('list') //list 화면으로 전환한다(문제가 없을 때 조건부로)
  }

  const fnChangeHandler = function(e){
    if(e.target.type === 'text'){
      _setTitle(e.target.value)
    }else if(e.target.type === 'date'){
      _setDate(e.target.value)
    }else{
      _setTime(e.target.value)
    }
  }

  return (
    <form onSubmit={fnSubmitHandler} className='dday-add'>
      <p>
        <label htmlFor="input-id1"><i className="fa-solid fa-pencil"></i> DDay Title</label>
        <input id='input-id1' required onChange={fnChangeHandler} type="text" placeholder='dday 일정명을 입력해주세요' value={_title}/>
      </p>
      <p>
        <label htmlFor="input-id2"><i className="fa-regular fa-calendar"></i> DDay Date</label>
        <input id='input-id2' required onChange={fnChangeHandler} type="date" value={_date}/>
      </p>
      <p>
        <label htmlFor="input-id3"><i className="fa-regular fa-clock"></i> DDay Time</label>
        <input id='input-id3' required onChange={fnChangeHandler} type="time" value={_time} />
      </p>

      <button>추가하기</button>
      <i onClick={()=>{_setShowComp('list')}} className="fa-solid fa-arrow-left"></i>
    </form>
  );
};

export default CompAdd;