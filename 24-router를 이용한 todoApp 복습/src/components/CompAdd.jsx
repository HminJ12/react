import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const CompAdd = () => {
  const {_orgArr, _setOrgArr, _todoArr, _setTodoArr} = useContext(AppContext)
  const navi = useNavigate()
  const fnAddHandler = function(){
    const id = Date.now()
    const title = document.querySelector(`input[type=text]`).value
    const date = document.querySelector(`input[type=date]`).value
    const time = document.querySelector(`input[type=time]`).value
    const desc = document.querySelector(`textarea`).value
    const obj = {id, title, date, time, desc} //객체로 감싼다
    
    _setOrgArr([..._orgArr, obj])  //원본배열
    _setTodoArr([..._orgArr, obj]) //출력
    navi('/')
  }

  return (
    <main>
      <h2>일정추가</h2>
      <p>일정명 : <input type="text" /> </p>
      <p>날짜 : <input type="date" /> </p>
      <p>시간 : <input type="time" /> </p>
      <p>내용 : <textarea></textarea></p>
      <hr />
      <button onClick={fnAddHandler}>추가하기</button>
    </main>
  );
};

export default CompAdd;