import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fnGetDoc } from '../../fb/db';
import { auth } from '../../fb/auth';


const CompDetailOutput = () => {
  const { id } = useParams() //주소에 찍힌 문서의 id
  const [_docData, _setDocData] = useState()
  const [_date, _setDate] = useState('')
  const [_desc, _setDesc] = useState('')
  const [_time, _setTime] = useState('')
  const [_title, _setTitle] = useState('')
  const [_file, _setFile] = useState('')
  const [_fileLabel, _setFileLabel] = useState('이미지를 업로드하세요')
  const [_orgUrl, _setOrgUrl] = useState('')
  const [_outputUrl, _setOutputUrl] = useState('')
  const [_storageUrl, _setStorageUrl] = useState('')

  const fnGetDocHandler = async () => {
    const docData = await fnGetDoc(auth.currentUser.uid, id)
    const { title, time, date, desc, orgUrl, outputUrl, storageUrl } = docData
    _setDate(date); _setDesc(desc); _setTime(time); _setTitle(title); _setOrgUrl(orgUrl);
    _setOutputUrl(outputUrl); _setStorageUrl(storageUrl)
  } //async 달려고 비동기하려고 만드는 함수이다, useEffect 안에서는 async를 사용할 수 없기 때문에 함수를 만드는 것이다

  useEffect(()=>{
    fnGetDocHandler()
  },[])

  return (
    <>
      <h2><img src={require('../../assets/img/detail/title-detail.png')} alt="" /></h2>
      <form className='scroll-wrap'>
        {_outputUrl && <img className='thumbnail' src={_outputUrl} alt="" />}
        <p className='date-wrap'>
          <input onChange={e => { _setDate(e.target.value) }} value={_date} type="date" />
        </p>

        <p className='time-wrap'>
          <input onChange={e => { _setTime(e.target.value) }} value={_time} type="time" />
        </p>

        <p className='title-wrap'>
          <input onChange={e => { _setTitle(e.target.value) }} value={_title} type="text" />
        </p>

        <p className='desc-wrap'>
          <textarea onChange={e => { _setDesc(e.target.value) }} value={_desc}></textarea>
        </p>

        {
          _orgUrl &&
          <p className='check-wrap'>
            <input id='check' type="checkbox" className='hidden' />
            <label htmlFor="check">
              <img className='img-check' src={require('../../assets/img/detail/delete-check.png')} alt="" />
              <img className='img-checked' src={require('../../assets/img/detail/delete-checked.png')} alt="" />
              {_orgUrl} 삭제하기
            </label>
          </p>
        }

        <p className='photo-wrap'>
          <input onChange={e => {
            _setFile(e.target.files[0]);
            (e.target.files[0]) && _setFileLabel(e.target.files[0].name)
          }} id='file' type="file" className='hidden' accept='image/*' />
          <label htmlFor="file">{_fileLabel}</label>
        </p>
      </form>

      <p className='btn-wrap'>
        <button><img src={require('../../assets/img/detail/btn-update-list.png')} alt="" /></button>
        <button><img src={require('../../assets/img/detail/btn-delete-list.png')} alt="" /></button>
        <Link to='/'><img src={require('../../assets/img/detail/btn-goto-list.png')} alt="" /></Link>
      </p>
    </>
  );
};

export default CompDetailOutput;