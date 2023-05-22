import React, { useState } from 'react';
import { useContext } from 'react';
import { DDayContext } from './CompDDay';
import CompListItem from './CompListItem';
import CompFilterForm from './CompFilterForm';

const CompList = () => {
  const [_serchText, _setSearchText] = useState('')
  const [_filterActive, _setFilterActive] = useState('')
  const {_showComp, _setShowComp, _ddayArr, _setDdayArr,_ddayOutputArr, _setDdayOutputArr} = useContext(DDayContext)

  const fnFilterHandler = function(e){
    e.currentTarget.classList.toggle('active')
    _setFilterActive(c => (c !== 'active')? 'active':'')
    _setSearchText('')
  }

  return (
    <>
      <article className='dday-list'>
        <button onClick={fnFilterHandler} className='filter-btn'>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </button>

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

        <CompFilterForm _filterActive={_filterActive} _setFilterActive={_setFilterActive} _serchText={_serchText} _setSearchText={_setSearchText}/>
      </article>
      <button onClick={()=>{_setShowComp('add')}} className='btn-add'> 
        <img src={require('../../assets/img/timer-icon-bg.gif')} alt="" /> D-Day 추가하기
      </button>
    </>
  );
};

export default CompList;

//onClick={()=>{_setShowComp('add')}} add화면으로 전환한다 