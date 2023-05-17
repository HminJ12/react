import React, { useContext } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';

const CompDetail = () => {
  const {_todoArr, _setTodoArr} = useContext(AppContext)
  const params = useParams() //주소 뒤에 찍어보내는 거
  const {todoID} = params //params.id를 구조분해(다양한 값을 받아야 하기 때문에 구조분해를 하는 거다 App.js에서 설정한 이름 가져오기)

  const obj = _todoArr.find(v => v.id === parseInt(todoID))
  //배열의 객체 중 v.id가 파라미터로 받은 id와 동일한 객체 find
  const {title, date, time, desc} = obj
  const navi = useNavigate()

  const fnDelHandler = function(){
    _setTodoArr([..._todoArr].filter(v=> parseInt(todoID) !== v.id))
    //[..._todoArr]스프레드 연산자(전개 연산자) todoID와 v.id와 같지 않은 걸로 새배열을 만든다, 삭제하기
    navi('/')
    //원래 페이지로 돌아가기
  } //삭제하기 함수

  const fnEditHandler = function(){
    const todoArr = [..._todoArr] //배열을 복사하고
    const idx = todoArr.findIndex(v=> parseInt(todoID) === v.id)//수정하고 싶은 애가 몇 번째인지 알아내야 한다 
    todoArr[idx].title = document.querySelector(`.title`).value
    todoArr[idx].date = document.querySelector(`.date`).value
    todoArr[idx].time = document.querySelector(`.time`).value
    todoArr[idx].desc= document.querySelector(`.desc`).value
    _setTodoArr(todoArr)
    navi('/')
  } //수정하기 함수

  return (
    <div>
      <h2>세부일정내용</h2>
    {/* <p>{title}</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{desc}</p> 
      출력만 할 경우*/}
      <p><input className='title' type='text' defaultValue={title}/></p>
      <p><input className='date' type='date' defaultValue={date}/></p>
      <p><input className='time' type='time' defaultValue={time}/></p>
      <p><textarea className='desc' defaultValue={desc}></textarea></p> 
      {/* value를 default value로 바꾸면 state 수정이 불가능하다 지금은 상관없다*/}
      <button onClick={fnEditHandler}>수정하기</button>
      <button onClick={fnDelHandler}>삭제하기</button>
      <NavLink to="/">목록</NavLink>

    </div>
  );
};

export default CompDetail;