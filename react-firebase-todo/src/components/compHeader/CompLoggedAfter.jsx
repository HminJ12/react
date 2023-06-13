import React, { useContext } from 'react';
import { auth, fnDeleteUser, fnSignOut } from '../../fb/auth';
import { AppContext } from '../../App';
import { fnDeleteFolder } from '../../fb/storage';
import { fnDeleteCollection } from '../../fb/db';

const CompLoggedAfter = () => {
  const {_setShowLoader, _setFadeOut} = useContext(AppContext)
  const fnSignOutHandler = async () => {
    _setShowLoader(true) //모달 다시 띄어준다
    await fnSignOut()
    alert('로그아웃하였습니다\n로그인페이지로 이동합니다')
    _setFadeOut(true) //opacity 0으로 
  }

  const fnDeleteUserHandler = async () => {
    if(auth.currentUser.email === 'guest@mail.com'){
      alert('게스트 회원님은 탈퇴 권한이 부여되지 않았습니다')
      return false
    }

    const result = window.confirm('회원님과 관련된 모든 정보가 삭제됩니다\n정말 탈퇴하시겠습니까?')
    if(!result) return false
    _setShowLoader(true)
    await fnDeleteFolder(auth.currentUser.uid)
    await fnDeleteCollection(auth.currentUser.uid)
    await fnDeleteUser(_setFadeOut)
    alert('회원에서 탈퇴하셨습니다.\n로그인 페이디로 이동합니다')
    _setFadeOut(true)
  }

  return (
    <div className='logged-after'>
      <p className='user'>
        <img src={auth.currentUser.photoURL} alt="" />
        <span>
          <em>{auth.currentUser.displayName}</em>
          <em>{auth.currentUser.email}</em>
        </span>
      </p>
      <p className='btns'>
        <button onClick={fnSignOutHandler}>
          <img src={require('../../assets/img/header/btn-sign-out.png')} alt="" />
        </button>
        <button onClick={fnDeleteUserHandler}>
          <img src={require('../../assets/img/header/btn-deresgister.png')} alt="" />
        </button>
      </p>
    </div>
  );
};

export default CompLoggedAfter;