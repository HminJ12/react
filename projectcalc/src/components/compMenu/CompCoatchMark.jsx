import React, { useState } from 'react';

const CompCoatchMark = ({_setShowCoatch}) => {
  const [_isActive, _setIsActive] = useState('')

  const fnSetLocalCoatch = function(e){
    if(e.target.checked){
      window.localStorage.setItem('localCoatch', ' ') //문자여서 JSON은 하지 않는다
    }else{
      window.localStorage.removeItem('localCoatch') //로컬의 기록을 없애는 거
    }
   
  }

  return (
    <figure onTransitionEnd={()=>{_setShowCoatch(false)}} className={`coatch-mark ${_isActive}`}>
      <img src={require('../../assets/img/coatchmark.png')} alt="" />
      <figcaption>
        <p>
          <input onChange={fnSetLocalCoatch} type="checkbox" /> 코치마크 비활성화
        </p>
        <button onTransitionEnd={(e)=>{e.stopPropagation()}} onClick={()=>{_setIsActive('active')}}>skip</button>
      </figcaption>
    </figure >
  );
};

export default CompCoatchMark;