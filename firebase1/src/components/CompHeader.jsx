import React, { useContext } from 'react';
import { AppContext } from '../App';
import { auth, fnDeleteUser, fnSignOut } from '../fb/auth';
import { Link } from 'react-router-dom';
import { fnDeleteCollection } from '../fb/db';
import { fnDeleteStorage } from '../fb/storage';

const CompHeader = () => {
  const {navi, _isLogged, _setIsLogged} = useContext(AppContext)

  const fnSignOutHandler = async () => {
    await fnSignOut()
    navi('/signin')
  }

  const fnDeleteUserHandler = async () => {
    const result = window.confirm('회원을 탈퇴하시겠습니까?')
    if(result){
      await fnDeleteCollection(auth.currentUser.uid) //회원이 삭제되기 전에 로그인이 돼 있는 상태에서 삭제해야 한다, 모든 문서 지우고
      await fnDeleteStorage(auth.currentUser.uid) //이미지 삭제하고
      await fnDeleteUser()
      alert('회원에서 탈퇴하셨습니다')
      navi('/signin')
    }
  }

  return (
    <header>
      <h3>firebase</h3>
      {
        (_isLogged) ?
          <div>
            <img style={{width:'50px', height:'50px', objectFit:'cover', objectPosition:'center'}} src={auth.currentUser.photoURL} alt="" />
            <b>{auth.currentUser.displayName}</b>
            <button onClick={fnSignOutHandler}>로그아웃</button>
            <button onClick={fnDeleteUserHandler}>회원탈퇴</button>
          </div>
        :
          <div>
            <Link to='/signin'>로그인</Link> 
            <Link to='/signup'>회원가입</Link> 
          </div>
      }

      <hr />
    </header>
  );
};

export default CompHeader;