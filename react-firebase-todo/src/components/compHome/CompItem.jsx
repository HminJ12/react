import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../../fb/auth';
import { fnDeleteDoc, fnUpdateDoc } from '../../fb/db';
import { AppContext } from '../../App';
import { fnDeleteObject } from '../../fb/storage';

const CompItem = ({docid, data}) => {
  const {
    _setShowLoader, _setFadeOut,
    _docsArr, _setDocsArr,
    _docsOutputArr, _setDocsOutputArr, _loadedCnt,
    fnGetDocsHandler,
  } = useContext(AppContext)

  let {date, time, outputUrl, title, timestamp, storageUrl, completed} = data //timestamp 정렬할 때 사용 
  const navi = useNavigate()
  outputUrl = outputUrl? outputUrl : 'https://firebasestorage.googleapis.com/v0/b/todoapp-95d59.appspot.com/o/common%2Fno-image.jpg?alt=media&token=d5af1c38-c500-4d67-b995-27805425fa5e'
 

  const fnDeleteHandler = async () => {
    if(auth.currentUser.email === 'guest@mail.com'){
      alert('게스트 회원님은 삭제 권한이 부여되지 않았습니다')
      return false
    }
    const result = window.confirm('일정을 삭제하시겠습니까?')
    if(!result) return false

    _setShowLoader(true)
    storageUrl && await fnDeleteObject(storageUrl) //이미지를 먼저 지운다
    await fnDeleteDoc(auth.currentUser.uid, docid)
    alert('일정을 삭제했습니다\n일정목록으로 이동합니다')
    navi('/')
    _setFadeOut(true)
  }

  const fnCompletedHandler = async () => {
    if(auth.currentUser.email === 'guest@mail.com'){
      alert('게스트 회원님은 수정 권한이 부여되지 않았습니다')
      return false
    }

    let question
    if(!completed){ //해당 일정이 미완료 상태이면
      question = '일정을 완료처리 하시겠습니까?'
      completed = true //완료 상태로 변경
    }else{ //완료상태이면
      question = '일정을 복원 하시겠습니까?'
      completed = false //미완료 상태로 변경
    }

    if(!window.confirm(question)) return false
    
    //해당 문서 업데이트
    await fnUpdateDoc(auth.currentUser.uid, docid, {completed})
    fnGetDocsHandler(_loadedCnt)
  }


  return (
    <li className={completed ? 'completed' : ''}>
      <Link to={`/detail/${docid}`}>
        <img className='thumnail' src={outputUrl} alt="" />
        <div className="metabox">
          <p>
            <time className='date'>
              <img src={require('../../assets/img/icons/icon-calendar.png')} alt="" />{date}
            </time>

            <time className='time'>
              <img src={require('../../assets/img/icons/icon-clock.png')} alt="" />{time}
            </time>
          </p>

          <p>
            <em className='title'>
              <img src={require('../../assets/img/icons/icon-pencil.png')} alt="" />{title}
            </em>
          </p>
        </div>
        <img className='more' src={require('../../assets/img/list/more.png')} alt="" />
      </Link>
      <div className="btns">
        <button onClick={fnCompletedHandler}>
          <img className='more' src={require('../../assets/img/list/check.png')} alt="" />
        </button>
        <button onClick={fnDeleteHandler}>
          <img className='more' src={require('../../assets/img/list/delte.png')} alt="" />
        </button>
      </div>
    </li>
  );
};

export default CompItem;