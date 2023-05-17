import React from 'react';
import { useContext } from 'react';
import { DDayContext } from './CompDDay';
import CompListItem from './CompListItem';

const CompList = () => {
  const {_showComp, _setShowComp, _ddayArr, _setDdayArr,_ddayOutputArr, _setDdayOutputArr} = useContext(DDayContext)
  return (
    <>
      <article className='dday-list'>
        { /* 배열에 객체가 있을 경우 */
          (_ddayOutputArr.length)? 
          <ul>
            {_ddayOutputArr.map(v=><CompListItem key={v.id} item={v} />)}
          </ul> 
          : 
          <p className='no-msg'>
            "DDAY일정이 존재하지 않습니다"
          </p>
        }
      </article>
      <button onClick={()=>{_setShowComp('add')}} className='btn-add'> 
        <img src={require('../../assets/img/timer-icon-bg.gif')} alt="" /> D-Day 추가하기
      </button>
    </>
  );
};

export default CompList;

//onClick={()=>{_setShowComp('add')}} add화면으로 전환한다 