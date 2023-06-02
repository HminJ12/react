import React, { useContext, useState } from 'react';
import { auth, fnCheckEmailVerification, fnSetPersistence, fnSignIn, fnSignInGoogle, fnSignOut } from '../fb/auth';
import { AppContext } from '../App';

const CompSignIn = () => {
  const {navi} = useContext(AppContext)
  const [_email, _setEmail] = useState('')
  const [_password, _setPassword] = useState('')
  const [_checked, _setChecked] = useState(false)

  const fnSignInHandler = async (e) => {
    e.preventDefault()
    await fnSetPersistence(_checked)
    await fnSignIn(_email, _password)
    if(fnCheckEmailVerification()){
      alert(`${auth.currentUser.displayName}님 환영합니다`)
      navi('/') //첫페이지로 이동
    }else{
      await fnSignOut()
      _setEmail('')
      _setPassword('')
      alert('이메일 인증 후 다시 로그인해주세요')
    }
  }

  const fnSignInGoogleHandler = async () => {
    await fnSignInGoogle()
    alert('구글계정으로 로그인 하셨습니다')
    navi('/')
  }

  return (
    <section>
      <h3>로그인</h3>
      <form onSubmit={fnSignInHandler}>
        <p>이메일 : <input onChange={(e)=>{_setEmail(e.target.value)}} value={_email} type="email" required/></p>
        <p>비밀번호 : <input onChange={(e)=>{_setPassword(e.target.value)}} value={_password} type="password" required/></p>
        <p><input type="checkbox" checked={_checked} onChange={()=>{_setChecked(c=>!c)}} />기억하기</p>
        <p><button>로그인</button></p>
      </form>
      <button onClick={fnSignInGoogleHandler}>구글로그인</button>
    </section>
  );
};

export default CompSignIn;