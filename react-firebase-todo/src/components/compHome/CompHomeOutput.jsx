import React, { useContext, useEffect, useRef, useState } from 'react';
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
    _loadedCnt, _setLoadedCnt,
    _scrollTop, _setScrollTop,
  } = useContext(AppContext)

  const [_isActive, _setIsActive] = useState(false)
  const [_keyword, _setKeyword] = useState('')

  const refScrollTrigger = useRef()
  const scrollWrap = useRef()
  const refInput = useRef()

  const fnScrollHandler = (e) => {
    //$(window).scrollTop() -> window.scrollY
    _setScrollTop(e.target.scrollTop) 
  }

  const fnSearchHandler = (e) => {
    _setKeyword(e.target.value);
    _setDocsOutputArr(_docsArr.filter(v=>v.data().title.includes(e.target.value)))
  }

  const fnSubmitHandler = (e) => {
    e.preventDefault()
    _setIsActive(false)
    _setKeyword('')
    _setDocsOutputArr([..._docsArr])
  }

  const fnSearchBtnClickHandler = () => {
    _setKeyword('')
    refInput.current.focus()
    _setDocsOutputArr([..._docsArr])
    _setIsActive(c => !c)
  }

  useEffect(()=>{
    scrollWrap.current.scrollTo({
      top:_scrollTop, 
      behavior:'smooth'
    })

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
        _setLoadedCnt(c => c+2)
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

      <div ref={scrollWrap} onScroll={fnScrollHandler} className="scroll-wrap">
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

      <form onSubmit={fnSubmitHandler} className={`search-form ${_isActive? 'active': ''}`}>
        <input ref={refInput} onChange={fnSearchHandler} value={_keyword} type="text" placeholder='검색어를 입력하세요'/>
      </form>

      <p className='btn-wrap'>
        <Link to='/add'>
          <img src={require('../../assets/img/list/btn-add-list.png')} alt="" />
        </Link>
        <button onClick={fnSearchBtnClickHandler}>
          <img src={require('../../assets/img/list/search.png')} alt="" />
        </button>
      </p>
    </>
  );
};

export default CompHomeOutput;