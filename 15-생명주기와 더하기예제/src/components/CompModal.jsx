import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

const CompModal = () => {
  const {fnResetHandler, _setShowModal} = useContext(AppContext)

  function fnCloseModal(){
    fnResetHandler()
    let modal = document.querySelector(`.modal`)
    modal.classList.remove(`active`)
    modal.addEventListener('transitionend',()=>{
      _setShowModal(false)
    })
  }

  useEffect(()=>{
    let modal = document.querySelector(`.modal`)

    let timeoutID  = setTimeout(()=>{
      modal.classList.add(`active`)
    },1)

    return (()=>{
      clearTimeout(timeoutID)
    })
  },[]) //화면이 나올 때
  return (
    <div className='modal'>
      <p>모달윈도우</p>
      <button onClick={fnCloseModal}>초기화</button>
    </div>
  );
};

export default CompModal;