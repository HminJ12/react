import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const CompAddList = () => {
  const {_todoArr, _setTodoArr} = useContext(AppContext)
  const navi = useNavigate()
  const fnSubmitHandler = function(e){
    e.preventDefault()
    let id = Date.now() //1000분의 1초 기록 timestamp 출력할 때 필요(배열로 출력할 때)
    let title = document.querySelector(`.title`).value
    let date = document.querySelector(`.date`).value
    let time = document.querySelector(`.time`).value
    let desc = document.querySelector(`.desc`).value
    let obj = {
      id, title, date, time, desc
    } //객체 만들기
    
    /*  let todoArr = [..._todoArr] //배열을 복사한다
    todoArr.push(obj)
    _setTodoArr(todoArr) 이것보다 더 줄일 수 있다*/
    _setTodoArr([..._todoArr, obj]) //새로운 배열로 만들어서 push로 obj를 해서 바꾼다
    alert('일정이 등록되었습니다')
    navi('/') //첫페이지로 넘겨준다, 새로고침하면 안 된다 location.href="/"
    
    /* 
    _todoArr.push(obj)
    _setTodoArr(_todoArr)
    사용 불가 갱신이 일어나지 않는다
    */
  }

  return (
    <>
      <h2>일정추가</h2>
      <form onSubmit={fnSubmitHandler}>
        <p><input className='date' type="date" required/></p>
        <p><input className='time' type="time" required/></p>
        <p><input className='title' type="text" required/></p>
        <p><textarea className='desc' required></textarea></p>
        <button>일정등록</button>
      </form>
    </>
  );
};

export default CompAddList;