import React, { useContext, useState } from 'react';
import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';

const CompSignin = () => {
  const {_user, _setUser} = useContext(AppContext)

  const [_id, _setId] = useState('')
  const [_pw, _setPw] = useState('')
  const navi = useNavigate()
  const fnSigninHandler = async (e) => {
    e.preventDefault()

    let jsonData = await fetch('https://raw.githubusercontent.com/kjhardcore76/json/main/member.json')
    let jsData = await jsonData.json() //userDb로 접속한 거다
    jsData.forEach(v=>{
      if(v.id===_id && v.pw===_pw){
        _setUser(v)
        localStorage.setItem('localStorageUser',JSON.stringify(v)) //로컬스토리지에 저장
        navi('/')
      } //v를 리턴한다, v는 객체
    }) //forEach는 배열 안 나옴
    
    
  }

  return (
    <form onSubmit={fnSigninHandler}>
      <h3>로그인</h3>
      <p>아이디 <input onChange={(e) => { _setId(e.target.value) }} value={_id} type="text" /></p>
      <p>비번 <input onChange={(e) => { _setPw(e.target.value) }} value={_pw} type="password" /></p>
      <p>
        <button>로그인</button>
      </p>
    </form>
  );
};

export default CompSignin;

/* 
원래 fetch의 기본 문법
//외부에서 주소를 가져와야 해서 fetch를 사용한다
  fetch('https://raw.githubusercontent.com/kjhardcore76/json/main/member.json')
  .then((jsonData)=>{
    return jsonData.json()
  })
  .then((jsData)=>{ //자바스크립트 데이터
    //처리
  }) //오리지널 문법 
  
  요즘은 async와 await을 이용해 fetch 사용함
*/