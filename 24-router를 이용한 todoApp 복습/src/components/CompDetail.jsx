import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CompDetail = () => {
  const {_orgArr, _setOrgArr, _todoArr, _setTodoArr} = useContext(AppContext)
  const id = parseInt(useParams().id) //주소에서 id를 가져온다 ->객체가 나온다 -> .id id만 가져온다 ->숫자로 바꾼다
  const {title, date, time, desc} = _todoArr.find(v => id === v.id) //구조분해 디스트럭트
  const navi = useNavigate()


  const fnDelHandler = function(){
    const arr = [..._orgArr].filter(v => v.id !== id)
    _setOrgArr(arr) //원본 배열로 새로
    _setTodoArr(arr) //다른 애들로 새로운 배열을 만든다
    navi('/')
  }

  const fnEditHandler = function(){
    //const arrCopy = [..._todoArr] 얕은 복사
    const arrCopy = _orgArr.map(v=>{return {...v}}) //디카피 깊은 복사  
    const idx = arrCopy.findIndex(v=> v.id === id) //숫자가 나온다
    arrCopy[idx].title = document.querySelector(`input[type=text]`).value
    arrCopy[idx].date = document.querySelector(`input[type=date]`).value
    arrCopy[idx].time = document.querySelector(`input[type=time]`).value
    arrCopy[idx].desc = document.querySelector(`textarea`).value
    _setOrgArr(arrCopy)
    _setTodoArr(arrCopy)
    navi('/')
  } //배열을 수정하는 게 목적 몇 번째 배열 수정, 셸로우 카피



  return (
    <main>
      <h2>일정 세부 사항</h2>
      <p>일정명 : <input type="text" defaultValue={title} /> </p>
      <p>날짜 : <input type="date" defaultValue={date} /> </p>
      <p>시간 : <input type="time" defaultValue={time} /> </p>
      <p>내용 : <textarea defaultValue={desc}></textarea></p>
      <hr />
      <button onClick={fnEditHandler}>수정</button>
      <button onClick={fnDelHandler}>삭제</button>
      <Link to="/">목록으로</Link>
    </main>
  );
};

export default CompDetail;