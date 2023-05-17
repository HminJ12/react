import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';

const CompDetail = () => {
  const {_orgArr, _setOrgArr, _outputArr, _setOutputArr} = useContext(AppContext)
  const param = useParams() //객체로 나온다
  const id = parseInt(param.id) //구조 분해 const id = param.id 
  const {title, date, time, desc} = _orgArr.find(v => id === v.id) //객체가 나온다 <-이게 목적이다
  const navi = useNavigate()

  const fnRemoveHandler = function(){
    let arr = [..._orgArr] //새로운 배열 만들기 const로 만들면 안 된다
    arr = arr.filter(v=> v.id !== id) 
    _setOrgArr(arr)
    _setOutputArr(arr)
    window.localStorage.setItem('todoStorage', JSON.stringify(arr)) //localStorage도 삭제한다
    navi('/')
  }

  const fnEditHandler = function(){
    const arr = [..._orgArr]
    const idx = arr.findIndex(v=> id === v.id)
    arr[idx].title = document.querySelector('input[type=text]').value 
    arr[idx].date = document.querySelector('input[type=date]').value
    arr[idx].time = document.querySelector('input[type=time]').value
    arr[idx].desc = document.querySelector('textarea').value
    _setOrgArr(arr)
    _setOutputArr(arr)
    window.localStorage.setItem('todoStorage', JSON.stringify(arr))
    navi('/')
  } //배열은 번째를 반드시 알아야 한다


  return (
    <form onSubmit={(e)=>{e.preventDefault()}}>
      <p><input type="text" defaultValue={title}/></p>
      <p><input type="date" defaultValue={date}/></p>
      <p><input type="time" defaultValue={time}/></p>
      <p><textarea defaultValue={desc}></textarea></p>
      <p>
        <button onClick={fnEditHandler}>수정하기</button>
        <button onClick={fnRemoveHandler}>삭제하기</button>
      </p>
    </form>
  );
};

export default CompDetail;

// id를 가져온 거는 id와 일치하는 객체를 뽑아와야 하는 것이 목적이다
//find를 사용해서 객체를 가져온다
// form으로 만든 이유는 수정하기 위해서
// filter 남겨라