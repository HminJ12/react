import React, { useContext, useEffect, useRef } from 'react';
import CompItem from './CompItem';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { fnGetDocs } from '../../fb/db';
import { auth } from '../../fb/auth';

const CompHomeOutput = () => {
  const {
    _docsCnt, _setDocsCnt,
    _docsArr, _setDocsArr,
    _docsOutputArr, _setDocsOutputArr,
    _nextDoc, _setNextDoc,
  } = useContext(AppContext)

  const refScrollTrigger = useRef()

  useEffect(()=>{
    let docArrRef = [..._docsArr]
    let nextDocRef = _nextDoc
    
    const observer = new IntersectionObserver(async ([entries])=>{
      if(entries.intersectionRatio > 0 && _docsCnt > docArrRef.length){ //꼬리가 화면에 들어오는 그 순간
        /* document.querySelector('.list-container').insertAdjacentHTML('beforeend','<li>추가된 li<br><br></li>') */
        const {docsArr, nextDoc} = await fnGetDocs(auth.currentUser.uid, 2, nextDocRef)
        docArrRef = [...docArrRef, ...docsArr] //docArrRef + docsArr
        _setDocsArr([...docArrRef])
        _setDocsOutputArr([...docArrRef])
        _setNextDoc(nextDoc)
        nextDocRef = nextDoc
      }
    }) //옵저버로 할 일, 1개일 때 배열로 받고 아니면 forEach로 해야 한다
    observer.observe(refScrollTrigger.current) //관찰하겠다

    return(()=>{
      observer.disconnect() //옵저버 제거, 오류가 발생할 수 있기 때문에 권장사항
    })
  },[])

  return (
    <>
      <h2><img src={require('../../assets/img/list/title-list.png')} alt="" /></h2>

      <div className="scroll-wrap">
        {
          _docsOutputArr.length 
            ?
            <ul className='list-container'>
              {
                _docsOutputArr.map(v=><CompItem key={v.data().timestamp} docid={v.id} data={v.data()}/>)
              }
            </ul>
            :
            <img className='no-list' src={require('../../assets/img/list/alert-no-list.png')} alt="" />
        }
        <div ref={refScrollTrigger} className="scroll-trigger"></div>
      </div>

      <p className='add-btn-wrap'>
        <Link to='/add'>
          <img src={require('../../assets/img/list/btn-add-new-list.png')} alt="" />
        </Link>
      </p>
    </>
  );
};

export default CompHomeOutput;