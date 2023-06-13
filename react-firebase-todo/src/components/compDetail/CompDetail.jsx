import { fnGetDoc } from '../../fb/db';
import { auth } from '../../fb/auth';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import CompDetailOutput from './CompDetailOutput';
import CompDetailLoader from './CompDetailLoader';
import { useParams } from 'react-router-dom';

const CompDetail = () => {
  const {_isLogged, _docsArr} = useContext(AppContext)
  const [_docData, _setDocData] = useState(null)
  const {docid} = useParams() //주소에 찍힌 문서의 id

  const fnGetDocHandler = async () => {
    const docData = await fnGetDoc(auth.currentUser.uid, docid)
    _setDocData(docData)
  } //async 달려고 비동기하려고 만드는 함수이다, useEffect 안에서는 async를 사용할 수 없기 때문에 함수를 만드는 것이다

  useEffect(()=>{
    let timeoutID
    if(!_isLogged && !_docsArr){ //비정상적인 경로로 접속했을 경우(새로고침 발생 또는 엉뚱한 주소입력시)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(()=>{
        alert('데이터 수신 중 오류가 발생했습니다\n정상적인 경로로 접속해주세요')
      },100)
    }else{
      fnGetDocHandler()
    }
  },[])
  

  return (
    <section className='section-detail'>
      {
      (_docData)
        ? <CompDetailOutput docData={_docData} docid={docid}/>
        : <CompDetailLoader/>
      }
    </section>
  );
};

export default CompDetail;