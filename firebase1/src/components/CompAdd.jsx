import React, { useContext, useState } from 'react';
import { fnAddDoc } from '../fb/db';
import { auth } from '../fb/auth';
import { AppContext } from '../App';

const CompAdd = () => {
  const {navi} = useContext(AppContext)
  const [_date, _setDate] = useState('')
  const [_title, _setTitle] = useState('')
  const [_desc, _setDesc] = useState('')

  const fnAddDocHandler = async (e) => {
    e.preventDefault()
    let data = {
      date : _date,
      title : _title,
      desc : _desc,
    }
    await fnAddDoc(auth.currentUser.uid, data)
    alert('일정이 추가되었습니다')
    navi('/')
  }

  return (
    <section>
      <h3>일정등록하기</h3>
      <form onSubmit={fnAddDocHandler}>
        <p>일자 : <input onInput={(e)=>{_setDate(e.target.value)}} value={_date} type="date" required /></p>
        <p>제목 : <input onInput={(e)=>{_setTitle(e.target.value)}} value={_title} type="text" required /></p>
        <p>설명 : <textarea onInput={(e)=>{_setDesc(e.target.value)}} value={_desc} required></textarea></p>
        <p><button>일정추가</button></p>
      </form>
    </section>
  );
};

export default CompAdd;