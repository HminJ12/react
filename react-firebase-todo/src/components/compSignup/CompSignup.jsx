import React, { useContext, useState } from 'react';
import { auth, fnCreateUser, fnSendEmailVerification, fnSignOut, fnUpdateProfile } from '../../fb/auth';
import { fnUploadFile } from '../../fb/storage';
import { AppContext } from '../../App';

const CompSignup = () => {
  const {
    _showLoader, _setShowLoader,
    _fadeOut, _setFadeOut,
  } = useContext(AppContext)

  const [_email, _setEmail] = useState('')
  const [_password, _setPassword] = useState('')
  const [_nickname, _setNickname] = useState('')
  const [_file, _setFile] = useState('')
  const [_fileLabel, _setFileLabel] = useState('프로필 사진을 업로드해주세요')

  const fnSignupHandler = async (e) => {
    e.preventDefault()
    _setShowLoader(true)
    _setEmail('')
    _setPassword('')
    _setNickname('')
    _setFile('')
    _setFileLabel('프로필 사진을 업로드해주세요')
    await fnCreateUser(_email, _password, _setFadeOut) //등록한다
    /* let outputUrl
    if(_file) {
      let urls = await fnUploadFile(auth.currentUser.uid)
      outputUrl = urls.outputUrl
    }  //업데이트 프로필
    else {
      outputUrl = 'https://firebasestorage.googleapis.com/v0/b/todoapp-95d59.appspot.com/o/common%2Fno-photo.png?alt=media&token=dcdf8dfc-6150-4ded-9db0-42785ca551b1'
    } */
    const {outputUrl} = 
      (_file)
        ? await fnUploadFile(auth.currentUser.uid, _file)
        : {outputUrl : 'https://firebasestorage.googleapis.com/v0/b/todoapp-95d59.appspot.com/o/common%2Fno-photo.png?alt=media&token=dcdf8dfc-6150-4ded-9db0-42785ca551b1'}

    await fnUpdateProfile(_nickname, outputUrl)
    await fnSendEmailVerification()
    await fnSignOut()
    alert('가입하신 이메일 주소로 인증메일을 전송했습니다\n인증 후 다시 로그인 해주세요')
    _setFadeOut(true)
    //onAuthState 이벤트에 의해 로그인 주소로 이동할 것(강제로 할 필요 없음)
  }

  return (
    <section className='section-signup'>
      <h2><img src={require('../../assets/img/register/title-register.png')} alt="" /></h2>
      <form onSubmit={fnSignupHandler}>
        <p className='email-wrap'>
          <input onChange={(e)=>{_setEmail(e.target.value)}} value={_email} type="text" placeholder='사용하실 이메일 주소를 입력하세요' required />
        </p>
        
        <p className='password-wrap'>
          <input onChange={(e)=>{_setPassword(e.target.value)}} value={_password} type="password" placeholder='사용하실 비밀번호를 입력하세요' required />
        </p>

        <p className='nickname-wrap'>
          <input onChange={(e)=>{_setNickname(e.target.value)}} value={_nickname} type="text" placeholder='사용하실 닉네임을 입력하세요' required />
        </p>

        <p className='photo-wrap'>
        <input onChange={(e)=>{
          _setFile(e.target.files[0]);
          (e.target.files[0])&& _setFileLabel(e.target.files[0].name)
        }} id='file' className='hidden' type="file" />
        <label htmlFor="file">{_fileLabel}</label>
        </p>

        <p className='btn-wrap'>
          <button><img src={require('../../assets/img/register/btn-register.png')} alt="" /></button>
        </p>
      </form>
    </section>
  );
};

export default CompSignup;