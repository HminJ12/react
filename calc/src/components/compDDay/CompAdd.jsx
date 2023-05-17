import React from 'react';
import { useContext } from 'react';
import { DDayContext } from './CompDDay';

const CompAdd = () => {
  const {_showComp, _setShowComp} = useContext(DDayContext)
  const fnSubmitHandler = function(e){
    e.preventDefault()
    _setShowComp('list') //list 화면으로 전환한다
  }
  return (
    <form onSubmit={fnSubmitHandler} className='dday-add'>
      <p>
        <label htmlFor=""><i className="fa-solid fa-pencil"></i> DDay Title</label>
        <input type="text" placeholder='dday 일정명을 입력해주세요' />
      </p>
      <p>
        <label htmlFor=""><i className="fa-regular fa-calendar"></i> DDay Date</label>
        <input type="date" />
      </p>
      <p>
        <label htmlFor=""><i className="fa-regular fa-clock"></i> DDay Time</label>
        <input type="time" value='00:00' />
      </p>

      <button>추가하기</button>
    </form>
  );
};

export default CompAdd;