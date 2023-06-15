import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fnDeleteObject, fnUploadFile } from '../../fb/storage';
import { fnUpdateDoc } from '../../fb/db';
import { auth } from '../../fb/auth';
import { AppContext } from '../../App';



const CompDetailOutput = ({docData, docid}) => {
  let {date, desc, time, title, orgUrl, outputUrl, storageUrl} = docData
  const {_setShowLoader, _setFadeOut, fnGetDocsHandler, _loadedCnt,} = useContext(AppContext)
  const [_date, _setDate] = useState(date)
  const [_desc, _setDesc] = useState(desc)
  const [_time, _setTime] = useState(time)
  const [_title, _setTitle] = useState(title)
  const [_file, _setFile] = useState('')
  const [_fileLabel, _setFileLabel] = useState('이미지를 업로드하세요')
  const [_checked, _setChecked] = useState(false)

  const navi = useNavigate()



  const fnUpdateDocHandler = async () => {

    if(auth.currentUser.email === 'guest@mail.com'){
      alert('게스트 회원님은 수정 권한이 부여되지 않았습니다')
      return false
    } 

    if(_checked){
      await fnDeleteObject(storageUrl)
      orgUrl=''; outputUrl=''; storageUrl=''
    } //파일업로드된 경로가서 지우겠다

    if(_file){ //파일을 업로드할 경우
      if(storageUrl){ //이전 파일을 이미 삭제하지 않았을 경우
        await fnDeleteObject(storageUrl)
      }
      const urls = await fnUploadFile(auth.currentUser.uid, _file)
      orgUrl = urls.orgUrl
      outputUrl = urls.outputUrl
      storageUrl = urls.storageUrl
    }

    const data = {
      date: _date,
      desc: _desc,
      time: _time,
      title: _title,
      orgUrl, //orgUrl: orgUrl
      outputUrl, //outputUrl: outputUrl
      storageUrl, //storageUrl: storageUrl
    } //수정해서 덮으려고
    await fnUpdateDoc(auth.currentUser.uid, docid, data)
    fnGetDocsHandler(_loadedCnt)
    alert('일정이 수정되었습니다\n일정목록으로 이동합니다')
    navi('/')
  } 



  return (
    <>
      <h2><img src={require('../../assets/img/detail/title-detail.png')} alt="" /></h2>
      <form className='scroll-wrap'>
        {outputUrl && <img className='thumbnail' src={outputUrl} alt="" />}
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
          orgUrl &&
          <p className='check-wrap'>
            <input onChange={e=>{_setChecked(e.target.checked)}} checked={_checked} id='check' type="checkbox" className='hidden' />
            <label htmlFor="check">
              <img className='img-check' src={require('../../assets/img/detail/delete-check.png')} alt="" />
              <img className='img-checked' src={require('../../assets/img/detail/delete-checked.png')} alt="" />
              {orgUrl} 삭제하기
            </label>
          </p>
        }

        <p className='photo-wrap'>
          <input onChange={e => {
            _setFile(e.target.files[0]);
            (e.target.files[0]) ? _setFileLabel(e.target.files[0].name) : _setFileLabel('일정 이미지를 업로드하세요')
          }} id='file' type="file" className='hidden' accept='image/*' />
          <label htmlFor="file">{_fileLabel}</label>
        </p>
      </form>

      <p className='btn-wrap'>
        <button onClick={fnUpdateDocHandler}><img src={require('../../assets/img/detail/btn-edit-list.png')} alt="" /></button>
        <Link to='/'><img src={require('../../assets/img/detail/btn-backto-list.png')} alt="" /></Link>
      </p>
    </>
  );
};

export default CompDetailOutput;