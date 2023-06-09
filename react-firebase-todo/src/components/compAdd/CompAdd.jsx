import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../fb/auth';
import { fnUploadFile } from '../../fb/storage';
import { fnAddDoc } from '../../fb/db';
import { AppContext } from '../../App';

const CompAdd = () => {
  const {_setShowLoader, _setFadeOut} = useContext(AppContext)
  const [_date, _setDate] = useState('')
  const [_time, _setTime] = useState('')
  const [_title, _setTitle] = useState('')
  const [_desc, _setDesc] = useState('')
  const [_file, _setFile] = useState('')
  const [_fileLabel, _setFileLabel] = useState('일정 이미지를 업로드하세요')
  const [_validity, _setValidity] = useState(false)
  const navi = useNavigate()
  
  const fnAddDocHandler = async () => {
    if(!_validity){
      alert('시간, 날짜, 일정명은 필수 입력항목입니다')
      return false
    }

    _setShowLoader(true)

    const {outputUrl, storageUrl, orgUrl} = _file
      ? await fnUploadFile(auth.currentUser.uid, _file) 
      : {outputUrl:'', storageUrl:'', orgUrl:''}

    const data = {
      timestamp : Date.now(),
      uid : auth.currentUser.uid, //권한 설정할 때 필요
      title : _title,
      date : _date,
      time : _time,
      desc : _desc,
      outputUrl,
      storageUrl,
      orgUrl
    }

    await fnAddDoc(auth.currentUser.uid, data)
    alert('일정이 등록되었습니다\n목록페이지로 이동합니다')
    _setFadeOut(true)
    navi('/')
  }

  return (
    <section className='section-add'>
      <h2><img src={require('../../assets/img/add/title-add.png')} alt="" /></h2>
      <form 
      onSubmit={e=>{e.preventDefault()}} 
      onChange={e=>{_setValidity(e.currentTarget.checkValidity())}}
      className='scroll-wrap'>
        <p className='date-wrap'>
          <input onChange={(e)=>{_setDate(e.target.value)}} value={_date} type="date" required />
        </p>

        <p className='time-wrap'>
          <input onChange={(e)=>{_setTime(e.target.value)}} value={_time} type="time" required />
        </p>

        <p className='title-wrap'>
          <input onChange={(e)=>{_setTitle(e.target.value)}} value={_title} type="text" placeholder='일정명을 입력하세요' required />
        </p>

        <p className='desc-wrap'>
          <textarea onChange={(e)=>{_setDesc(e.target.value)}} value={_desc} placeholder='일정상세내용을 입력하세요'></textarea>
        </p>

        <p className='photo-wrap'>
          <input onChange={(e)=>{
            _setFile(e.target.files[0]);
            (e.target.files[0]) && _setFileLabel(e.target.files[0].name) //e.target.files[0] && _setFileLabel(e.target.files[0].name) 괄호를 빼거나 위에 ;을 찍어야 한다
          }} id='file' type="file" className='hidden'/>
          <label htmlFor="file">{_fileLabel}</label>
        </p>
      </form>

      <p className='btn-wrap'>
        <button onClick={fnAddDocHandler}><img src={require('../../assets/img/add/btn-add-list.png')} alt="" /></button>
        <Link to='/'><img src={require('../../assets/img/add/btn-backto-list.png')} alt="" /></Link>
      </p>
    </section>
  );
};

export default CompAdd;