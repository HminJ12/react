import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const CompAdd = () => {
  const {_orgArr, _setOrgArr, _outputArr, _setOutputArr} = useContext(AppContext)
  const navi = useNavigate()
  const fnSubmitHandler = function(e){
    e.preventDefault()
    const id = Date.now()
    const title = document.querySelector(`input[type=text]`).value
    const date = document.querySelector(`input[type=date]`).value
    const time = document.querySelector(`input[type=time]`).value
    const desc = document.querySelector(`textarea`).value
    const obj = {id, title, date, time, desc}
    const arr = [..._orgArr, obj] //원본배열 카피 후 객체를 push 한다, useState 때문에 이렇게 쓴다 리액트에서만, 완전히 새배열로 만들어야 한다 이뮤터블
    _setOrgArr(arr)
    _setOutputArr(arr)
    //그다음에 localStorage를 세팅한다
    window.localStorage.setItem('todoStorage',JSON.stringify(arr)) //json으로 바꿔서 가져와야 한다(문자로밖에 못 가져오기 때문에)
    navi('/') //location.href f5와 같은 거, 리액트는 새로고침을 안 하기 위해 한다
  }

  return (
    <form onSubmit={fnSubmitHandler}>
      <p>일정명 : <input type="text" required/></p>
      <p>날짜 : <input type="date" required/></p>
      <p>시간 : <input type="time" required/></p>
      <p>세부내용 : <textarea required></textarea></p>
      <hr />
      <button>일정추가하기</button>
    </form>
  );
};

export default CompAdd;