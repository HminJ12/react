import React, { useContext, useState } from 'react';
import { auth, fnCreateUser, fnSendEmailVerification, fnSignOut, fnUpdateProfile } from '../fb/auth';
import { AppContext } from '../App';
import { fnUploadFile } from '../fb/storage';



const CompSignUp = () => {
  const {navi} = useContext(AppContext)

  const [_email, _setEmail] = useState('')
  const [_password, _setPassword] = useState('')
  const [_nickName, _setNickName] = useState('')
  const [_file, _setFile] = useState('')

  const fnSignUpHandler = async (e) => {
    e.preventDefault()
    await fnCreateUser(_email, _password)
    let url
    if(_file){
      url = await fnUploadFile(auth.currentUser.uid, _file) //auth.currentUser.uid 사용자의 독립적인 아이디로 폴더를 만든다는 의미
    }else{
      url = 'https://firebasestorage.googleapis.com/v0/b/test-1496b.appspot.com/o/photo%2Fno-img.png?alt=media&token=30e6aae2-dac9-454c-8c12-1945e587011f'
    }
    await fnUpdateProfile(_nickName, url)
    await fnSendEmailVerification()
    await fnSignOut()
    navi('/signin')
    
  } 

  return (
    <section>
      <h3>회원가입</h3>
      <form onSubmit={fnSignUpHandler}>
        <p>이메일 : <input value={_email} onChange={(e)=>{_setEmail(e.target.value)}} type="email" required/></p>
        <p>비번 : <input value={_password} onChange={(e)=>{_setPassword(e.target.value)}} type="password" required/></p>
        <p>닉네임 : <input value={_nickName} onChange={(e)=>{_setNickName(e.target.value)}} type="text" required/></p>
        <p>사진 : <input onChange={(e)=>{_setFile(e.target.files[0])}} type="file" accept='image/*' /></p>
        <button>회원가입</button>
      </form>
    </section>
  );
};

export default CompSignUp;