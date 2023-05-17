import React from 'react';
import { useContext } from 'react';
import { DDayContext } from './CompDDay';

const CompList = () => {
  const {_showComp, _setShowComp} = useContext(DDayContext)
  return (
    <article className='dday-list'>
      <ul>
      </ul>
      <button onClick={()=>{_setShowComp('add')}} className='btn-add'> 
        <img src={require('../../assets/img/timer-icon-bg.gif')} alt="" /> D-Day 추가하기
      </button>
    </article>
  );
};

export default CompList;

//onClick={()=>{_setShowComp('add')}} add화면으로 전환한다 