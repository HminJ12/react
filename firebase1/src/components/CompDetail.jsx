import React, { useLayoutEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fnDeleteDoc, fnGetDoc, fnUpdateDoc } from '../fb/db';
import { auth } from '../fb/auth';




const CompDetail = () => {
  const {docid} = useParams()
  const [_title, _setTitle] = useState('')
  const [_date, _setDate] = useState('')
  const [_desc, _setDesc] = useState('')
  const navi = useNavigate()

  const fnGetDocHandler = async () => {
    const doc = await fnGetDoc(auth.currentUser.uid, docid)
    _setDate(doc.date)
    _setTitle(doc.title)
    _setDesc(doc.desc)
  }



  const fnUpdateDocHandler = async (e) => {
    e.preventDefault()
    const result = window.confirm('일정을 수정하시겠습니까?')
    if(!result) return 
    const data = {
      date : _date,
      title : _title,
      desc : _desc,
    }
    await fnUpdateDoc(auth.currentUser.uid, docid, data)
    alert('일정이 수정되었습니다. 목록으로 이동합니다')
    navi('/')
  }

  const fnDeleteDocHandler = async (e) =>{
    e.preventDefault()
    const result = window.confirm('일정을 삭제하시겠습니까?')
    if(!result) return 
    await fnDeleteDoc(auth.currentUser.uid, docid) 
    alert('일정이 삭제되었습니다. 목록으로 이동합니다')
    navi('/')
  }

  useLayoutEffect(()=>{
    fnGetDocHandler()
  },[])

  return (
    <section>
      <h3>상세보기</h3>
      <form>
        <p>일자 : <input onChange={(e)=>{_setDate(e.target.value)}} value={_date} type="date" /></p>
        <p>일정명 : <input onChange={(e)=>{_setTitle(e.target.value)}} value={_title} type="text" /></p>
        <p>설명 : <textarea onChange={(e)=>{_setDesc(e.target.value)}} value={_desc} ></textarea></p>
        <p>
          <button onClick={fnUpdateDocHandler}>수정하기</button>
          <button onClick={fnDeleteDocHandler}>삭제하기</button>
          <Link to='/'>목록으로</Link>
          
        </p>
      </form>
    </section>
  );
};

export default CompDetail;