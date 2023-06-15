import React, { useContext, useRef, useState } from 'react';
import { AppContext } from '../../App';

const CompCoatch = () => {
  const {_coatchShow, _setCoatchShow} = useContext(AppContext)
  const [_checked, _setChecked] = useState()
  const refCoatch = useRef()
  
  const fnCoatchCloseHandler = () => {
    _checked && window.localStorage.setItem('coatchExpires', Date.now() + 24*60*60*1000)
    refCoatch.current.classList.add('deactive')

  } // 24*60*60*1000 -> 하루


  return (
    <div onTransitionEnd={e=>{_setCoatchShow(false)}} ref={refCoatch} className='coatch'>
      <div className="wrap">
        <img className='coatch-img' src={require('../../assets/img/coatch/coatch.png')} alt="" />
        <div className="check-wrap">
          <input onChange={e=>{_setChecked(e.target.checked)}} checked={_checked} type="checkbox" id="chk-show" className='hidden' />
          <label htmlFor="chk-show">
            <img className='check' src={require('../../assets/img/coatch/check.png')} alt="" />
            <img className='checked' src={require('../../assets/img/coatch/checked.png')} alt="" />
          </label>
          <button onClick={fnCoatchCloseHandler}>
            <img src={require('../../assets/img/coatch/close.png')} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompCoatch;