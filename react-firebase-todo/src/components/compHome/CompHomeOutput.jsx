import React, { useContext, useEffect, useRef, useState, useTransition } from 'react';
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
  const [isWaiting, startTransition] = useTransition() //최적화 방법
  let isSearchRef = useRef(false)
  


  const fnScrollHandler = (e) => {
    //$(window).scrollTop() -> window.scrollY
    _setScrollTop(e.target.scrollTop) 
  }

  const fnSearchHandler = (e) => {
    _setKeyword(e.target.value);
    startTransition(()=>{
      _setDocsOutputArr(_docsArr.filter(v=>v.data().title.includes(e.target.value)))
    }) //행동을 늦춘다 (만개, 2만개 정도 됐을 때)
  }

  const fnSubmitHandler = (e) => {
    e.preventDefault()
    isSearchRef.current = false
    _setIsActive(false)
    _setKeyword('')
    _setDocsOutputArr([..._docsArr])
  }

  const fnSearchBtnClickHandler = () => {
    _setKeyword('') //검색 양식의 내용을 지운다
    isSearchRef.current = !isSearchRef.current //무한스크롤을 활성화하거나 비활성화한다
    refInput.current.focus() //검색 양식에 커서를 위치시킨다
    _setDocsOutputArr([..._docsArr]) //목록을 원래대로 돌린다
    _setIsActive(c => !c) //검색창을 보여주거나 숨긴다
  }


  useEffect(()=>{
    scrollWrap.current.scrollTo({
      top:_scrollTop, 
      behavior:'smooth'
    })

    let docArrRef = [..._docsArr]
    let nextDocRef = _nextDoc
    
    const observer = new IntersectionObserver(async ([entries])=>{
      if(entries.intersectionRatio > 0 && _docsCnt > docArrRef.length && !isSearchRef.current){ //꼬리가 화면에 들어오는 그 순간
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