import React, { useContext, useRef, useState } from 'react';
import { auth, fnSetPersistence, fnSignInWithPopup, fnSignin, fnsendPasswordResetEmail } from '../../fb/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { AppContext } from '../../App';

const CompSignin = () => {
  const {
    _showLoader, _setShowLoader,
    _fadeOut, _setFadeOut,
  } = useContext(AppContext)
  const [_email, _setEmail] = useState('')
  const [_password, _setPassword] = useState('')
  const [_checked, _setChecked] = useState(false)
  const refInputEmail = useRef()
  
  const fnSigninHandler = async (e) => {
    e.preventDefault()
    _setShowLoader(true)
    //let timeoutID
    //clear는 연속으로 누를 때 사용
    /* setTimeout(() => {
      _setFadeOut(true)
    }, 3000); //1초 후에 사라지는 거 */

    await fnSetPersistence(_checked, _setFadeOut)
    await fnSignin(_email, _password, _setFadeOut)
    if(auth.currentUser.emailVerified || auth.currentUser.email === 'guest@mail.com'){ //인증이 됐다면
      alert(`${auth.currentUser.displayName}님 환영합니다\n일정목록으로 이동합니다`)
      //onAuthState이벤트에서 home으로 이동됨
    }else{
      alert('이메일 인증 후 다시 로그인을 시도해주세요')
      _setEmail('')
      _setPassword('')
    }
    _setFadeOut(true) //정상적인 상황에서
  }

  const fnSignInWithPopupHandler = async () => {
    _setShowLoader(true)
    await fnSignInWithPopup(_setFadeOut)
    alert('구글계정으로 로그인하셨습니다')
    _setFadeOut(true)
  }

  const fnsendPasswordResetEmailHandler = async () => {
    const result = window.confirm('이메일 양식에 이메일 주소를 입력하셨습니까?')
    if(result && _email){
      await fnsendPasswordResetEmail(_email)
      alert('비밀번호 변경 메일을 발송했습니다')
    }else{
      refInputEmail.current.focus()
    }
  }

  return (
    <section className='section-signin'>
      <h2><img src={require('../../assets/img/login/title-sign-in.png')} alt="" /></h2>
      <form onSubmit={fnSigninHandler}>
        <p className='email-wrap'>
          <input onChange={e=>{_setEmail(e.target.value)}} ref={refInputEmail} value={_email} type="email" placeholder='가입하신 이메일 주소를 입력하세요' />
        </p>

        <p className='password-wrap'>
          <input onChange={e=>{_setPassword(e.target.value)}} value={_password} type="password" placeholder='가입하신 비밀번호를 입력하세요' />
        </p>
        
        <p className='btn-wrap'>
          <button><img src={require('../../assets/img/login/btn-login.png')} alt="" /></button>
          <button onClick={fnSignInWithPopupHandler} type='button'><img src={require('../../assets/img/login/btn-google-login.png')} alt="" /></button>
        </p>

        <p className='remember-wrap'>
          <input onChange={e=>{_setChecked(e.target.checked)}} checked={_checked} id='remember' className='hidden' type="checkbox" />
          <label htmlFor="remember">
            <img src={require('../../assets/img/login/remember-check.png')} alt="" />
            <img src={require('../../assets/img/login/remember-checked.png')} alt="" />
          </label>
        </p>

        <p className='password-email-wrap'>
          <button onClick={fnsendPasswordResetEmailHandler} type='button'><img src={require('../../assets/img/login/password-email.png')} alt="" /></button>
        </p>
      </form>
    </section>
  );
};

export default CompSignin;